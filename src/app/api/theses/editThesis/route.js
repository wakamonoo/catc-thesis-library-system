import clientPromise from "@/lib/mongodb/config.js";
import { requireAdmin } from "@/lib/firebase/requireAdmin.js";

export async function POST(request) {
  try {
    const access = await requireAdmin(request);

    if (!access.authorized) {
      return Response.json(
        { success: false, message: "Unauthorized." },
        { status: access.status },
      );
    }

    const {
      thesisId,
      title,
      authors,
      program,
      educationLevel,
      academicYear,
      keywords,
    } = await request.json();

    if (
      typeof thesisId !== "string" ||
      typeof title !== "string" ||
      !Array.isArray(authors) ||
      typeof program !== "string" ||
      typeof educationLevel !== "string" ||
      typeof academicYear !== "string" ||
      !Array.isArray(keywords) ||
      !thesisId.trim() ||
      !title.trim() ||
      !authors.length ||
      !program.trim() ||
      !educationLevel.trim() ||
      !academicYear.trim() ||
      !keywords.length
    ) {
      return Response.json(
        { success: false, message: "Please complete all thesis fields." },
        { status: 400 },
      );
    }

    const updatedThesis = {
      title: title.trim(),
      authors: authors.map((author) => author.trim()).filter(Boolean),
      program: program.trim(),
      educationLevel: educationLevel.trim(),
      academicYear: academicYear.trim(),
      keywords: keywords.map((keyword) => keyword.trim()).filter(Boolean),
    };

    if (!updatedThesis.authors.length || !updatedThesis.keywords.length) {
      return Response.json(
        { success: false, message: "Authors and keywords cannot be empty." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB);
    const theses = db.collection("theses");
    const currentThesis = await theses.findOne({ thesisId: thesisId.trim() });

    if (!currentThesis) {
      return Response.json(
        { success: false, message: "Thesis not found." },
        { status: 404 },
      );
    }

    await theses.updateOne(
      { thesisId: thesisId.trim() },
      { $set: updatedThesis },
    );

    return Response.json({
      success: true,
      message: "Thesis updated successfully.",
      updatedThesis,
    });
  } catch (err) {
    console.error("Failed to edit thesis:", err);
    return Response.json(
      { success: false, message: "Failed to edit thesis." },
      { status: 500 },
    );
  }
}
