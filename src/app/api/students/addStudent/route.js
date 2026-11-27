import clientPromise from "@/lib/mongodb/config.js";
import { requireAdmin } from "@/lib/firebase/requireAdmin.js";

export async function POST(request) {
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

    const { studentId, name, email, program } = await request.json();

    if (
      typeof studentId !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof program !== "string" ||
      !studentId.trim() ||
      !name.trim() ||
      !email.trim() ||
      !program.trim()
    ) {
      return Response.json(
        {
          success: false,
          message: "Please provide all required student information.",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);
    const normalizedStudentId = studentId.trim();

    const existingStudent = await db
      .collection("students")
      .findOne({ studentId: normalizedStudentId });

    if (existingStudent) {
      return Response.json(
        {
          success: false,
          message: "A student with this Student ID already exists.",
        },
        { status: 409 },
      );
    }

    const newStudent = {
      studentId: normalizedStudentId,
      name: name.trim(),
      email: email.trim(),
      program: program.trim(),
      status: "Not Registered",
      createdAt: new Date(),
    };

    await db.collection("students").insertOne(newStudent);

    return Response.json({
      success: true,
      message: "Student added successfully",
      newStudent,
    });
  } catch (err) {
    console.error("Failed to add student:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to add student.",
      },
      { status: 500 },
    );
  }
}
