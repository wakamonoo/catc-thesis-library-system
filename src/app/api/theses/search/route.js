import clientPromise from "@/lib/mongodb/config.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(request) {
  try {
    const params = new URL(request.url).searchParams;
    const query = params.get("query")?.trim() || "";
    const program = params.get("program")?.trim() || "";
    const educationLevel = params.get("educationLevel")?.trim() || "";

    if (!query) {
      return Response.json({ success: true, total: 0, result: [] });
    }

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);
    
    const searchPattern = new RegExp(escapeRegex(query), "i");
    const clauses = [
      {
        $or: [
          { title: searchPattern },
          { authors: searchPattern },
          { keywords: searchPattern },
        ],
      },
    ];

    if (program) clauses.push({ program });
    if (educationLevel) clauses.push({ educationLevel });

    const result = await db
      .collection("theses")
      .find(
        { $and: clauses },
        {
          projection: {
            _id: 0,
            thesisId: 1,
            title: 1,
            authors: 1,
            program: 1,
            educationLevel: 1,
            coverImage: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, total: result.length, result });
  } catch (err) {
    console.error("Failed to search theses", err);

    return Response.json(
      { success: false, message: "Failed to search theses." },
      { status: 500 },
    );
  }
}
