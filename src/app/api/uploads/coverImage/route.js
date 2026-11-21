import cloudinary from "@/lib/cloudinary/config.js";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          message: "No file provided",
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

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "CATC Thesis Library System/Cover Image Uploades",
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
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Failed to upload cover image", err);
    return Response.json(
      {
        success: false,
        message: "Failed to upload cover image",
      },
      { status: 500 },
    );
  }
}
