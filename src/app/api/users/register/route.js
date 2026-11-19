import { adminAuth } from "@/lib/firebase/admin.js";
import clientPromise from "@/lib/mongodb/config.js";

export async function POST(request) {
  try {
    const { token, studentId, name } = await request.json();

    const decoded = await adminAuth.verifyIdToken(token);
    const { uid, email } = decoded;

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const existingUser = await db.collection("users").findOne({ uid });

    if (existingUser) {
      return Response.json({
        success: true,
        message: "Student signed up",
      });
    }

    await db.collection("users").updateOne(
      { uid },
      {
        $setOnInsert: {
          uid,
          name,
          studentId,
          email,
        },
      },
      { upsert: true },
    );

    return Response.json({
      success: true,
      message: "Student registered",
    });
  } catch (err) {
    console.error("Failed to register student", err);
    return Response.json(
      {
        success: false,
        message: "Failed to register student",
      },
      { status: 500 },
    );
  }
}
