export async function getLinkedStudent(db, uid) {
  const linkedUser = await db
    .collection("users")
    .findOne({ uid }, { projection: { studentId: 1 } });

  if (!linkedUser?.studentId) return null;

  return db.collection("students").findOne({
    studentId: linkedUser.studentId,
  });
}
