import cloudinary from "@/lib/cloudinary/config";
import clientPromise from "@/lib/mongodb/config.js";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const {
      title,
      authors,
      program,
      educationLevel,
      academicYear,
      keywords,
      coverImage,
      document,
    } = await request.json();

    if (
      !title.trim() ||
      !Array.isArray(authors) ||
      !authors.length ||
      !program ||
      !educationLevel ||
      !academicYear.trim() ||
      !Array.isArray(keywords) ||
      !keywords.length ||
      !coverImage ||
      !document.publicId ||
      !Array.isArray(document.pages) ||
      !document?.totalPages
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

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const newThesis = {
      thesisId: `thesis-${uuidv4()}`,
      title: title.trim(),
      authors: authors.map((author) => author.trim()).filter(Boolean),
      program: program.trim(),
      educationLevel: educationLevel.trim(),
      academicYear: academicYear.trim(),
      keywords: keywords.map((keyword) => keyword.trim()).filter(Boolean),
      coverImage,
      document: {
        publicId: document.publicId,
        format: "pdf",
        bytes: document.bytes,
        originalFileName: document.originalFileName,
        totalPages: document.totalPages,
        previewPages: document.previewPages,
        pages: document.pages,
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

    return Response.json(
      {
        success: false,
        message: "Failed to add thesis.",
      },
      { status: 500 },
    );
  }
}
