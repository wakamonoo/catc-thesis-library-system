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

    const { studentId } = await request.json();

    if (typeof studentId !== "string" || !studentId.trim()) {
      return Response.json(
        { success: false, message: "Please provide a valid Student ID." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB);
    const students = db.collection("students");
    const normalizedStudentId = studentId.trim();
    const student = await students.findOne({
      studentId: normalizedStudentId,
    });

    if (!student) {
      return Response.json(
        { success: false, message: "Student not found." },
        { status: 404 },
      );
    }

    if (student.status !== "Active") {
      return Response.json(
        { success: false, message: "Only active students can be suspended." },
        { status: 409 },
      );
    }

    const update = await students.updateOne(
      { studentId: normalizedStudentId, status: "Active" },
      { $set: { status: "Suspended" } },
    );

    if (update.modifiedCount !== 1) {
      return Response.json(
        { success: false, message: "Student status has changed. Refresh and try again." },
        { status: 409 },
      );
    }

    return Response.json({
      success: true,
      message: "Student suspended successfully.",
      updatedStudent: { ...student, status: "Suspended" },
    });
  } catch (err) {
    console.error("Failed to suspend student:", err);
    return Response.json(
      { success: false, message: "Failed to suspend student." },
      { status: 500 },
    );
  }
}
