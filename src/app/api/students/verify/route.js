import clientPromise from "@/lib/mongodb/config.js";

export async function POST(request) {
  try {
    const { studentId, email } = await request.json();

    if (
      typeof studentId !== "string" ||
      typeof email !== "string" ||
      !studentId.trim() ||
      !email.trim()
    ) {
      return Response.json(
        {
          success: false,
          message: "Student ID and email are required.",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const student = await db.collection("students").findOne({
      studentId: studentId.trim(),
      email: email.trim().toLowerCase(),
    });

    if (!student) {
      return Response.json(
        {
          success: false,
          message: "Student ID and email do not match our records.",
        },
        { status: 400 },
      );
    }

    if (student.status === "Suspended") {
      return Response.json(
        {
          success: false,
          message: "This student account is suspended.",
        },
        { status: 403 },
      );
    }

    if (student.status !== "Not Registered") {
      return Response.json(
        {
          success: false,
          message: "This student is already registered.",
        },
        { status: 409 },
      );
    }

    return Response.json({
      success: true,
      message: "Student verified successfully",
    });
  } catch (err) {
    console.error("Student verification error:", err);
    return Response.json(
      {
        success: false,
        message: "Failed to verify student.",
      },
      { status: 500 },
    );
  }
}
