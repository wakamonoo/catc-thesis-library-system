import clientPromise from "@/lib/mongodb/config.js";
import { requireAdmin } from "@/lib/firebase/requireAdmin.js";

export async function GET(request) {
  try {
    const access = await requireAdmin(request);

    if (!access.authorized) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: access.status },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const result = await db
      .collection("students")
      .find()
      .sort({ studentId: -1 })
      .toArray();

    return Response.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("Failed to fetch students:", err);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch students.",
      },
      { status: 500 },
    );
  }
}
