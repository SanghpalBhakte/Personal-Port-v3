import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./db";

// In-memory sliding window rate limiter used when Redis is not available
class MemorySlidingWindowLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 5, windowMs = 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];
    const validTimestamps = timestamps.filter((time) => now - time < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: now + this.windowMs,
      };
    }

    validTimestamps.push(now);
    this.requests.set(identifier, validTimestamps);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - validTimestamps.length,
      reset: now + this.windowMs,
    };
  }
}

const memoryLimiter = new MemorySlidingWindowLimiter(5, 60 * 1000); // 5 requests per 60 seconds

const upstashLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: false,
      prefix: "@portfolio/ratelimit",
    })
  : null;

export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  strategy: "upstash" | "memory";
}> {
  if (upstashLimiter) {
    try {
      const res = await upstashLimiter.limit(identifier);
      return {
        success: res.success,
        limit: res.limit,
        remaining: res.remaining,
        reset: res.reset,
        strategy: "upstash",
      };
    } catch (err) {
      console.warn("[rate-limit] Upstash rate limit error, falling back to memory:", err);
    }
  }

  const memoryRes = await memoryLimiter.limit(identifier);
  return {
    ...memoryRes,
    strategy: "memory",
  };
}
