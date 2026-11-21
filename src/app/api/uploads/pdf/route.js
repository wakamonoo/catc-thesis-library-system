import cloudinary from "@/lib/cloudinary/config.js";

const PREVIEW_PAGES = 2;

function getPageTransformations(totalPages) {
  return Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;

    const transformations = [`pg_${page}`];

    if (page > PREVIEW_PAGES) {
      transformations.push("e_blur:1000");
    }

    transformations.push("w_1200,c_limit", "f_jpg");

    return transformations.join("/");
  });
}

export async function POST(request) {
  let publicId;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          message: "no file provided",
        },
        { status: 400 },
      );
    }

    if (file.size > 50 * 1024 * 1024) {
      return Response.json(
        {
          success: false,
          message: "File size cannot exceed 50mb",
        },
        { status: 400 },
      );
    }

    if (
      file.type !== "application/pdf" ||
      !file.name.toLocaleLowerCase().endsWith(".pdf")
    ) {
      return Response.json(
        {
          success: false,
          message: "Only PDF files are allowed",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.subarray(0, 5).toString() !== "%PDF-") {
      return Response.json(
        {
          success: false,
          message: "Invalid PDF Document",
        },
        { status: 400 },
      );
    }

    const uploaded = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "CATC Thesis Library System/PDF Uploads",
          resource_type: "image",
          type: "authenticated",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(buffer);
    });

    publicId = uploaded.public_id;

    let totalPages = uploaded.pages;

    if (!totalPages) {
      const resource = await cloudinary.api.resource(publicId, {
        resource_type: "image",
        type: "authenticated",
      });

      totalPages = resource.pages;
    }

    if (!totalPages || totalPages < 1) {
      throw new Error("Unable to determine page count.");
    }

    const eager = getPageTransformations(totalPages);

    const processed = await cloudinary.uploader.explicit(publicId, {
      resource_type: "image",
      type: "authenticated",
      eager,
    });

    if (!processed.eager || processed.eager.length !== totalPages) {
      throw new Error("Not all PDF pages were generated");
    }

    const pages = processed.eager.map((page, index) => ({
      pageNumber: index + 1,
      url: page.secure_url,
      blurred: index + 1 > PREVIEW_PAGES,
    }));

    return Response.json({
      success: true,
      document: {
        publicId,
        format: "pdf",
        bytes: uploaded.bytes,
        originalFileName: file.name,
        totalPages,
        previewPages: PREVIEW_PAGES,
        pages,
      },
    });
  } catch (err) {
    console.error("failed upload", err);

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
          type: "authenticated",
        });
      } catch (cleanupError) {
        console.error("Failed to delete uploaded PDF:", cleanupError);
      }
    }

    return Response.json(
      {
        success: false,
        message: "failed upload",
      },
      { status: 500 },
    );
  }
}
