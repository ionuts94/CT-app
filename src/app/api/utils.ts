import { NextRequest } from "next/server";

export const extractClientIp = (req: NextRequest) => {
  const xff = req.headers.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";

  return {
    ip,
    userAgent
  };
};