import cloudinary from "@/lib/cloudinary/config.js";

export async function POST(request) {
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

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "CATC Thesis Library System/PDF Uploads",
          resource_type: "raw",
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

    return Response.json({
      success: true,
      document: {
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
        originalFilename: file.name,
      },
    });
  } catch (err) {
    console.error("failed upload", err);
    return Response.json(
      {
        success: false,
        message: "failed upload",
      },
      { status: 500 },
    );
  }
}
