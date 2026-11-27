import clientPromise from "@/lib/mongodb/config.js";

export async function GET(request) {
  try {
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
