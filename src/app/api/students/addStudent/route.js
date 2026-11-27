import cloudinary from "@/lib/cloudinary/config";
import clientPromise from "@/lib/mongodb/config.js";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { studentId, name, program } = await request.json();

    if (!studentId.trim() || !name.trim() || !program) {
      return Response.json(
        {
          success: false,
          message: "Please provide all required thesis information.",
        },
        {
          status: 400,
        },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const newStudent = {
      studentId: studentId.trim(),
      name: name.trim(),
      program: program.trim(),
      status: "Not Registered",
      createdAt: new Date(),
    };

    await db.collection("students").insertOne(newStudent);

    return Response.json({
      success: true,
      message: "Student added succesfully",
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
