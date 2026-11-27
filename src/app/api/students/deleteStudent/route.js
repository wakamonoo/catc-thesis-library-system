import clientPromise from "@/lib/mongodb/config.js";
import { adminAuth } from "@/lib/firebase/admin.js";
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

    const { studentId } = await request.json();

    if (typeof studentId !== "string" || !studentId.trim()) {
      return Response.json(
        { success: false, message: "Please provide a valid Student ID." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);
    const normalizedStudentId = studentId.trim();
    const student = await db
      .collection("students")
      .findOne({ studentId: normalizedStudentId });

    if (!student) {
      return Response.json(
        { success: false, message: "Student not found." },
        { status: 404 },
      );
    }

    const linkedUser = await db.collection("users").findOne({
      studentId: normalizedStudentId,
    });

    if (linkedUser?.uid) {
      try {
        await adminAuth.deleteUser(linkedUser.uid);
      } catch (err) {
        if (err.code !== "auth/user-not-found") {
          throw err;
        }
      }
    }

    if (linkedUser?.uid) {
      await db.collection("thesisOTPs").deleteMany({
        uid: linkedUser.uid,
      });
    }

    if (linkedUser) {
      await db.collection("users").deleteOne({ _id: linkedUser._id });
    }
    await db.collection("students").deleteOne({
      studentId: normalizedStudentId,
    });

    return Response.json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (err) {
    console.error("Failed to delete student:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to delete student.",
      },
      { status: 500 },
    );
  }
}
