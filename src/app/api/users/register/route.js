import { adminAuth } from "@/lib/firebase/admin.js";
import clientPromise from "@/lib/mongodb/config.js";

export async function POST(request) {
  let users;
  let insertedUserId;

  try {
    const { token, studentId, name } = await request.json();

    if (
      typeof token !== "string" ||
      typeof studentId !== "string" ||
      typeof name !== "string" ||
      !studentId.trim() ||
      !name.trim()
    ) {
      return Response.json(
        { success: false, message: "Student information is required." },
        { status: 400 },
      );
    }

    const { uid, email } = await adminAuth.verifyIdToken(token);

    if (!email) {
      return Response.json(
        { success: false, message: "The account has no email address." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB);
    users = db.collection("users");
    const normalizedStudentId = studentId.trim();
    const student = await db.collection("students").findOne({
      studentId: normalizedStudentId,
    });

    if (
      !student ||
      typeof student.email !== "string" ||
      student.email.trim().toLowerCase() !== email.trim().toLowerCase()
    ) {
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
        { success: false, message: "This student account is suspended." },
        { status: 403 },
      );
    }

    const existingUser = await users.findOne({ uid });

    if (existingUser) {
      if (existingUser.studentId !== normalizedStudentId) {
        return Response.json(
          { success: false, message: "This account is linked to another student." },
          { status: 409 },
        );
      }

      if (student.status === "Active") {
        return Response.json({ success: true, message: "Student signed up" });
      }
    } else {
      if (student.status !== "Not Registered") {
        return Response.json(
          { success: false, message: "This student is already registered." },
          { status: 409 },
        );
      }

      const linkedStudentUser = await users.findOne({
        studentId: normalizedStudentId,
      });

      if (linkedStudentUser) {
        return Response.json(
          {
            success: false,
            message: "This student is already linked to an account.",
          },
          { status: 409 },
        );
      }

      const result = await users.insertOne({
        uid,
        name: name.trim(),
        studentId: normalizedStudentId,
        email: email.trim().toLowerCase(),
      });
      insertedUserId = result.insertedId;
    }

    const activation = await db.collection("students").updateOne(
      { studentId: normalizedStudentId, status: "Not Registered" },
      { $set: { status: "Active" } },
    );

    if (activation.modifiedCount !== 1) {
      if (insertedUserId) {
        await users.deleteOne({ _id: insertedUserId });
        insertedUserId = null;
      }

      return Response.json(
        { success: false, message: "This student is not eligible to register." },
        { status: 409 },
      );
    }

    return Response.json({ success: true, message: "Student registered" });
  } catch (err) {
    if (insertedUserId && users) {
      try {
        await users.deleteOne({ _id: insertedUserId });
      } catch (cleanupError) {
        console.error("Failed to clean up student account link:", cleanupError);
      }
    }

    console.error("Failed to register student", err);
    return Response.json(
      { success: false, message: "Failed to register student" },
      { status: 500 },
    );
  }
}
