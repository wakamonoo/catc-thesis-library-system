import clientPromise from "@/lib/mongodb/config";
import { createHmac, timingSafeEqual } from "crypto";

function verifyAccessToken(token, thesisId) {
  try {
    if (!token || !process.env.OTP_SECRET) return false;

    const [payload, signature] = token.split(".");

    if (!payload || !signature) return false;

    const expectedSignature = createHmac("sha256", process.env.OTP_SECRET)
      .update(payload)
      .digest("hex");

    const submitted = Buffer.from(signature, "hex");
    const expected = Buffer.from(expectedSignature, "hex");

    if (
      submitted.length !== expected.length ||
      !timingSafeEqual(submitted, expected)
    ) {
      return false;
    }

    const data = JSON.parse(Buffer.from(payload, "base64url").toString());

    return (
      data.thesisId === thesisId &&
      typeof data.uid === "string" &&
      data.exp > Date.now()
    );
  } catch {
    return false;
  }
}

export async function GET(request, { params }) {
  try {
    const { thesisId } = await params;

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const thesis = await db.collection("theses").findOne(
      { thesisId },
      {
        projection: {
          "document.pages": 1,
          "document.previewPages": 1,
          "document.totalPages": 1,
        },
      },
    );

    if (!thesis) {
      return Response.json(
        {
          success: false,
          message: "Thesis not found.",
        },
        {
          status: 404,
        },
      );
    }

    const pages = thesis.document?.pages || [];
    const previewPages = thesis.document?.previewPages || 0;

    const token = request.headers.get("X-Thesis-Access-Token");
    const hasAccess = verifyAccessToken(token, thesisId);

    const visiblePages = pages.map(
      ({ pageNumber, previewUrl, clearUrl, blurred }) => ({
        pageNumber,
        previewUrl,
        blurred,
        ...(hasAccess ? { clearUrl } : {}),
      }),
    );

    return Response.json(
      {
        success: true,
        totalPages: thesis.document?.totalPages || pages.length,
        previewPages,
        pages: visiblePages,
        hasAccess,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (err) {
    console.error("Failed to retrieve thesis pages:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to retrieve thesis pages.",
      },
      { status: 500 },
    );
  }
}
