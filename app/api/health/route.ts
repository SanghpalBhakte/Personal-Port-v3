import { NextResponse } from "next/server";
import { HealthResponse } from "@/types";

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const hasRedis = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  const hasResend = Boolean(process.env.RESEND_API_KEY);

  return NextResponse.json({
    status: "ok",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    service: "sanghpal-bhakte-portfolio",
    environment: process.env.NODE_ENV || "development",
    features: {
      redis: hasRedis,
      resend: hasResend,
    },
  });
}
