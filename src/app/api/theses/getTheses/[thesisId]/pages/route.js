import clientPromise from "@/lib/mongodb/config";

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
          document: 1,
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

    return Response.json(
      {
        success: true,
        totalPages: thesis.totalPages,
        previewPages: thesis.document.previewPages,
        pages: thesis.document.pages,
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
