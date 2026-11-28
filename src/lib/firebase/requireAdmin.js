import adminAuth from "@/lib/firebase/admin.js";
import clientPromise from "../mongodb/config";

export async function requireAdmin(request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return { authorized: false, status: 401 };
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const admin = await db.collection("admins").findOne({
      uid: decoded.uid,
    });

    if (!admin) {
      return { authorized: false, status: 403 };
    }

    return {
      authorized: true,
      uid: decoded.uid,
    };
  } catch (error) {
    console.error("Require admin error:", error);

    return { authorized: false, status: 401 };
  }
}
