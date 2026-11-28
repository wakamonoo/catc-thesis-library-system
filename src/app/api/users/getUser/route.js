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

    const user = await db
      .collection("users")
      .findOne({ uid: firebaseUser.uid });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    return Response.json({ success: true, account: user });
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return Response.json(
      { success: false, message: "Failed to fetch user." },
      { status: 500 },
    );
  }
}
