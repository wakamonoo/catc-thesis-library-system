import clientPromise from "@/lib/mongodb/config.js";
import { requireAdmin } from "@/lib/firebase/requireAdmin.js";
import { v4 as uuidv4 } from "uuid";
import adminAuth from "@/lib/firebase/admin";

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

    const { name, email } = await request.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      !name.trim() ||
      !email.trim()
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

    const normalizedEmail = email.trim().toLowerCase();

    const existingAdmin = await db
      .collection("admins")
      .findOne({ email: normalizedEmail });

    if (existingAdmin) {
      return Response.json(
        {
          success: false,
          message: "An admin with this email already exists.",
        },
        { status: 409 },
      );
    }

    const firebaseUser = await adminAuth.createUser({
      email: normalizedEmail,
      displayName: name.trim(),
    });

    const newAdmin = {
      uid: firebaseUser.uid,
      adminId: `admin-${uuidv4()}`,
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date(),
    };

    await db.collection("admins").insertOne(newAdmin);

    return Response.json({
      success: true,
      message: "Admin added successfully",
      newAdmin,
    });
  } catch (err) {
    console.error("Failed to add admin:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to add admin.",
      },
      { status: 500 },
    );
  }
}
