import adminAuth from "@/lib/firebase/admin.js";
import clientPromise from "@/lib/mongodb/config.js";
import { getLinkedStudent } from "@/lib/students/getLinkedStudent.js";

export async function GET(request) {
  const authorization = request.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return Response.json(
      { success: false, message: "Please sign in first." },
      { status: 401 },
    );
  }

  let user;

  try {
    user = await adminAuth.verifyIdToken(authorization.slice(7), true);
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
    const student = await getLinkedStudent(db, user.uid);

    if (!student) {
      return Response.json(
        { success: false, message: "Student account not found." },
        { status: 403 },
      );
    }

    if (student.status !== "Active") {
      return Response.json(
        { success: false, message: "This student account is not active." },
        { status: 403 },
      );
    }

    return Response.json({ success: true, status: student.status });
  } catch (err) {
    console.error("Failed to check student status:", err);
    return Response.json(
      { success: false, message: "Failed to check student status." },
      { status: 500 },
    );
  }
}
