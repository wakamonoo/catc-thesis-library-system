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

    const { thesisId } = await request.json();

    if (typeof thesisId !== "string" || !thesisId.trim()) {
      return Response.json(
        { success: false, message: "Please provide a valid Thesis ID." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB);
    const result = await db.collection("theses").deleteOne({
      thesisId: thesisId.trim(),
    });

    if (!result.deletedCount) {
      return Response.json(
        { success: false, message: "Thesis not found." },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: "Thesis deleted successfully.",
    });
  } catch (err) {
    console.error("Failed to delete thesis:", err);
    return Response.json(
      { success: false, message: "Failed to delete thesis." },
      { status: 500 },
    );
  }
}
