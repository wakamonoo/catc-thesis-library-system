import adminAuth from "@/lib/firebase/admin.js";
import clientPromise from "@/lib/mongodb/config.js";

export async function GET(request) {
  const authorization = request.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return Response.json(
      { success: false, message: "Please sign in first." },
      { status: 401 },
    );
  }

  let firebaseUser;

  try {
    firebaseUser = await adminAuth.verifyIdToken(authorization.slice(7), true);
  } catch {
    return Response.json(
      { success: false, message: "Invalid authentication." },
      { status: 401 },
    );
  }

  try {
    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const admin = await db
      .collection("admins")
      .findOne({ uid: firebaseUser.uid });

    if (!admin) {
      return Response.json(
        { success: false, message: "Administrator not found." },
        { status: 404 },
      );
    }

    return Response.json({ success: true, account: admin });
  } catch (err) {
    console.error("Failed to fetch administrator:", err);
    return Response.json(
      { success: false, message: "Failed to fetch administrator." },
      { status: 500 },
    );
  }
}
