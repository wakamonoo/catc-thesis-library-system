import cloudinary from "@/lib/cloudinary/config.js";

function getPageTransformations(totalPages) {
  return Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;

    return [`pg_${page}`, "w_1200,c_limit", "f_jpg"].join("/");
  });
}

function getBlurredPageTransformations(totalPages, previewPages) {
  return Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    const transformations = [`pg_${page}`];

    if (!previewPages.includes(page)) {
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
    const previewPagesInput = formData.get("previewPages");

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

    const requestedPreviewPages = previewPagesInput
      ? previewPagesInput
          .split(",")
          .map((page) => Number(page.trim()))
          .filter((page) => Number.isInteger(page) && page > 0)
      : [1, 2];

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

    const previewPages = [
      ...new Set(requestedPreviewPages.filter((page) => page <= totalPages)),
    ];

    const clearEager = getPageTransformations(totalPages);
    const blurredEager = getBlurredPageTransformations(
      totalPages,
      previewPages,
    );

    const [clearProcessed, blurredProcessed] = await Promise.all([
      cloudinary.uploader.explicit(publicId, {
        resource_type: "image",
        type: "authenticated",
        eager: clearEager,
      }),

      cloudinary.uploader.explicit(publicId, {
        resource_type: "image",
        type: "authenticated",
        eager: blurredEager,
      }),
    ]);

    if (
      !clearProcessed.eager ||
      !blurredProcessed.eager ||
      clearProcessed.eager.length !== totalPages ||
      blurredProcessed.eager.length !== totalPages
    ) {
      throw new Error("Not all PDF pages were generated");
    }

    const pages = clearProcessed.eager.map((page, index) => {
      const blurred = !previewPages.includes(index + 1);

      return {
        pageNumber: index + 1,
        previewUrl: blurred
          ? blurredProcessed.eager[index].secure_url
          : page.secure_url,
        clearUrl: page.secure_url,
        blurred,
      };
    });

    return Response.json({
      success: true,
      document: {
        publicId,
        format: "pdf",
        bytes: uploaded.bytes,
        originalFileName: file.name,
        totalPages,
        previewPages: previewPages,
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
