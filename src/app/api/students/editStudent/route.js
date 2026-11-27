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

    const { studentId, newStudentId, name, email, program } =
      await request.json();

    if (
      typeof studentId !== "string" ||
      typeof newStudentId !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof program !== "string" ||
      !studentId.trim() ||
      !newStudentId.trim() ||
      !name.trim() ||
      !email.trim() ||
      !program.trim()
    ) {
      return Response.json(
        { success: false, message: "Please complete all student fields." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);
    const students = db.collection("students");
    const currentStudentId = studentId.trim();
    const updatedStudentId = newStudentId.trim();
    const student = await students.findOne({ studentId: currentStudentId });

    if (!student) {
      return Response.json(
        { success: false, message: "Student not found." },
        { status: 404 },
      );
    }

    if (updatedStudentId !== currentStudentId) {
      const existingStudent = await students.findOne({
        studentId: updatedStudentId,
      });

      if (existingStudent) {
        return Response.json(
          {
            success: false,
            message: "A student with this Student ID already exists.",
          },
          { status: 409 },
        );
      }
    }

    const updatedFields = {
      studentId: updatedStudentId,
      name: name.trim(),
      email: email.trim(),
      program: program.trim(),
    };

    await students.updateOne(
      { studentId: currentStudentId },
      { $set: updatedFields },
    );

    await db.collection("users").updateMany(
      { studentId: currentStudentId },
      {
        $set: {
          studentId: updatedStudentId,
          name: updatedFields.name,
        },
      },
    );

    return Response.json({
      success: true,
      message: "Student updated successfully.",
      updatedStudent: updatedFields,
    });
  } catch (err) {
    console.error("Failed to edit student:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to edit student.",
      },
      { status: 500 },
    );
  }
}
