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
          _id: 0,
          thesisId: 1,
          title: 1,
          authors: 1,
          educationLevel: 1,
          academicYear: 1,
          program: 1,
          keywords: 1,
          createdAt: 1,
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

    return Response.json({
      success: true,
      thesis,
    });
  } catch (err) {
    console.error("Failed to fetch thesis:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch thesis.",
      },
      { status: 500 },
    );
  }
}
