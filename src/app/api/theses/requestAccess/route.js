import adminAuth from "@/lib/firebase/admin.js";
import clientPromise from "@/lib/mongodb/config.js";
import { createHmac, randomInt } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function hashOTP(otp) {
  return createHmac("sha256", process.env.OTP_SECRET).update(otp).digest("hex");
}

export async function POST(request) {
  try {
    const { thesisId } = await request.json();

    if (
      !process.env.RESEND_API_KEY ||
      !process.env.OTP_SECRET ||
      !process.env.RESEND_FROM_EMAIL
    ) {
      throw new Error("OTP email configuration is missing.");
    }

    const authorization = request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return Response.json(
        {
          success: false,
          message: "Please sign in first.",
        },
        { status: 401 },
      );
    }

    let user;

    try {
      user = await adminAuth.verifyIdToken(authorization.slice(7));
    } catch {
      return Response.json(
        {
          success: false,
          message: "Invalid authentication.",
        },
        { status: 401 },
      );
    }

    if (!user.email) {
      return Response.json(
        {
          success: false,
          message: "Your account has no email address.",
        },
        { status: 400 },
      );
    }

    if (!thesisId || typeof thesisId !== "string") {
      return Response.json(
        {
          success: false,
          message: "Invalid thesis.",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const thesis = await db
      .collection("theses")
      .findOne({ thesisId }, { projection: { thesisId: 1, title: 1 } });

    if (!thesis) {
      return Response.json(
        {
          success: false,
          message: "Thesis not found.",
        },
        { status: 404 },
      );
    }

    const existingOTP = await db.collection("thesisOTPs").findOne({
      uid: user.uid,
      thesisId,
    });

    const now = new Date();

    if (existingOTP?.lastSentAt) {
      const elapsed =
        now.getTime() - new Date(existingOTP.lastSentAt).getTime();

      if (elapsed < 60 * 1000) {
        const remaining = Math.ceil((60000 - elapsed) / 1000);

        return Response.json(
          {
            success: false,
            message: `Please wait ${remaining} seconds before requesting another code.`,
          },
          { status: 429 },
        );
      }
    }

    const otp = randomInt(100000, 1000000).toString();

    await await db.collection("thesisOTPs").updateOne(
      { uid: user.uid, thesisId },
      {
        $set: {
          uid: user.uid,
          thesisId,
          email: user.email,
          otpHash: hashOTP(otp),
          attempts: 0,
          lastSentAt: now,
          expiresAt: new Date(now.getTime() + 5 * 60 * 1000),
        },
      },
      { upsert: true },
    );

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: user.email,
      subject: "Your CATC Thesis Library verification code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 24px; color: #252421;">
          <h2>Verify your thesis access</h2>
          <p>You requested access to:</p>
          <p><strong>${String(thesis.title || "Thesis document").replace(/[&<>"']/g, "")}</strong></p>
          <div style="padding: 20px; background: #f4f1e9; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${otp}</span>
          </div>
          <p>This code expires in 5 minutes.</p>
          <p>If you did not request this code, you can ignore this email.</p>
          <p style="font-size: 12px; color: #777;">CATC Thesis Library</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      await await db.collection("thesisOTPs").deleteOne({
        uid: user.uid,
        thesisId,
      });

      return Response.json(
        { success: false, message: "Unable to send verification email." },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (err) {
    console.error("OTP request error:", err);

    return Response.json(
      { success: false, message: "Failed to request verification code." },
      { status: 500 },
    );
  }
}
