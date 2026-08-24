import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./db";

// In-memory token bucket rate limiter for development fallback
class MemoryRateLimiter {
  private hits: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const timestamps = this.hits.get(identifier) || [];
    const validTimestamps = timestamps.filter(time => now - time < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: now + this.windowMs,
      };
    }

    validTimestamps.push(now);
    this.hits.set(identifier, validTimestamps);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - validTimestamps.length,
      reset: now + this.windowMs,
    };
  }
}

const memoryLimiter = new MemoryRateLimiter(5, 60 * 1000); // 5 requests per minute

const upstashLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: true,
      prefix: "@portfolio/ratelimit",
    })
  : null;

export async function checkRateLimit(identifier: string) {
  if (upstashLimiter) {
    try {
      const res = await upstashLimiter.limit(identifier);
      return {
        success: res.success,
        limit: res.limit,
        remaining: res.remaining,
        reset: res.reset,
      };
    } catch (err) {
      console.warn("Upstash rate limiter error, falling back to memory:", err);
    }
  }

  return await memoryLimiter.limit(identifier);
}
