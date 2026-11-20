import cloudinary from "@/lib/cloudinary/config";
import clientPromise from "@/lib/mongodb/config.js";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  let publicId;

  try {
    const { title, authors, program, keywords, document } =
      await request.json();

    if (
      !title.trim() ||
      !Array.isArray(authors) ||
      !authors.length ||
      !program ||
      !Array.isArray(keywords) ||
      !keywords.length ||
      !document?.publicId
    ) {
      return Response.json(
        {
          success: false,
          message: "Please provide all required thesis information.",
        },
        {
          status: 400,
        },
      );
    }

    publicId = document.publicId;

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const newThesis = {
      thesisId: `thesis-${uuidv4()}`,
      title: title.trim(),
      authors: authors.map((author) => author.trim()).filter(Boolean),
      program: program.trim(),
      keywords: keywords.map((keyword) => keyword.trim()).filter(Boolean),
      document: {
        publicId: document.publicId,
        format: "pdf",
        bytes: document.bytes,
        originalFilename: document.originalFilename,
      },
      createdAt: new Date(),
    };

    if (!newThesis.authors.length || !newThesis.keywords.length) {
      return Response.json(
        {
          success: false,
          message: "Authors and keywords cannot be empty.",
        },
        {
          status: 400,
        },
      );
    }

    await db.collection("theses").insertOne(newThesis);

    return Response.json({
      success: true,
      message: "Thesis added succesfully",
      newThesis,
    });
  } catch (err) {
    console.error("Failed to add thesis.", err);

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
          type: "authenticated",
        });
      } catch (err) {
        console.error("Failed to delete uploaded PDF:", cleanupError);
      }
    }

    return Response.json(
      {
        success: false,
        message: "Failed to add thesis.",
      },
      { status: 500 },
    );
  }
}
