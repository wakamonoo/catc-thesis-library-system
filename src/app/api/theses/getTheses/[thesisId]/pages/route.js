import clientPromise from "@/lib/mongodb/config";
import { createHmac, timingSafeEqual } from "crypto";
import adminAuth from "@/lib/firebase/admin.js";
import { getLinkedStudent } from "@/lib/students/getLinkedStudent.js";

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

    if (
      data.thesisId !== thesisId ||
      typeof data.uid !== "string" ||
      data.exp <= Date.now()
    ) {
      return null;
    }

    return data;
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
    const access = verifyAccessToken(token, thesisId);
    const authorization = request.headers.get("Authorization");
    let hasAccess = false;

    if (access && authorization?.startsWith("Bearer ")) {
      try {
        const user = await adminAuth.verifyIdToken(
          authorization.slice(7),
          true,
        );
        const student = await getLinkedStudent(db, user.uid);
        hasAccess = user.uid === access.uid && student?.status === "Active";
      } catch {
        hasAccess = false;
      }
    }

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
