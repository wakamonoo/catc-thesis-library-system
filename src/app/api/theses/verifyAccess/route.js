import { createHmac, timingSafeEqual } from "crypto";
import clientPromise from "@/lib/mongodb/config.js";
import adminAuth from "@/lib/firebase/admin.js";

function hashOTP(otp) {
  return createHmac("sha256", process.env.OTP_SECRET).update(otp).digest("hex");
}

function createAccessToken(uid, thesisId) {
  const payload = Buffer.from(
    JSON.stringify({
      uid,
      thesisId,
      exp: Date.now() + 30 * 60 * 1000,
    }),
  ).toString("base64url");

  const signature = createHmac("sha256", process.env.OTP_SECRET)
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export async function POST(request) {
  try {
    const { thesisId, otp } = await request.json();

    const authorization = request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return Response.json(
        { success: false, message: "Please sign in first." },
        { status: 401 },
      );
    }

    let user;

    try {
      user = await adminAuth.verifyIdToken(authorization.slice(7));
    } catch {
      return Response.json(
        { success: false, message: "Invalid authentication." },
        { status: 401 },
      );
    }

    if (
      typeof thesisId !== "string" ||
      typeof otp !== "string" ||
      !/^\d{6}$/.test(otp)
    ) {
      return Response.json(
        { success: false, message: "Invalid verification details." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const record = await db.collection("thesisOTPs").findOne({
      uid: user.uid,
      thesisId,
    });

    if (!record) {
      return Response.json(
        {
          success: false,
          message: "No verification code found. Please request a new one.",
        },
        { status: 404 },
      );
    }

    if (new Date() > new Date(record.expiresAt)) {
      await db.collection("thesisOTPs").deleteOne({ _id: record._id });

      return Response.json(
        {
          success: false,
          message:
            "Your verification code has expired. Please request a new one.",
        },
        { status: 400 },
      );
    }

    if (record.attempts >= 5) {
      await db.collection("thesisOTPs").deleteOne({ _id: record._id });

      return Response.json(
        {
          success: false,
          message: "Too many incorrect attempts. Please request a new code.",
        },
        { status: 429 },
      );
    }

    const submittedHash = Buffer.from(hashOTP(otp), "hex");
    const storedHash = Buffer.from(record.otpHash, "hex");

    const isValid =
      submittedHash.length === storedHash.length &&
      timingSafeEqual(submittedHash, storedHash);

    if (!isValid) {
      const attempts = record.attempts + 1;

      if (attempts >= 5) {
        await db.collection("thesisOTPs").deleteOne({ _id: record._id });

        return Response.json(
          {
            success: false,
            message: "Too many incorrect attempts. Please request a new code.",
          },
          { status: 429 },
        );
      }

      await db
        .collection("thesisOTPs")
        .updateOne({ _id: record._id }, { $set: { attempts } });

      return Response.json(
        {
          success: false,
          message: `Incorrect code. ${5 - attempts} attempts remaining.`,
        },
        { status: 400 },
      );
    }

    await db.collection("thesisOTPs").deleteOne({ _id: record._id });

    const accessToken = createAccessToken(user.uid, thesisId);

    return Response.json({
      success: true,
      message: "Thesis access verified successfully.",
      accessToken,
    });
  } catch (err) {
    console.error("OTP verification error:", err);

    return Response.json(
      { success: false, message: "Failed to verify your code." },
      { status: 500 },
    );
  }
}
