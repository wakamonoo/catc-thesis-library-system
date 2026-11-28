export function isSchoolNetwork(request) {
  const allowedIPs = process.env.ALLOWED_SCHOOL_IPS?.split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);

  if (!allowedIPs?.length) {
    return false;
  }

  const clientIP = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  if (!clientIP) {
    return false;
  }

  return allowedIPs.includes(clientIP);
}
