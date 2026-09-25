import { Redis } from "@upstash/redis";

// In-memory ephemeral fallback store (used during local development or when Redis is not configured)
const memoryStore: {
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }>;
} = {
  contacts: [],
};

// Check if Upstash Redis credentials are provided
const hasRedisCredentials = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

export const redis = hasRedisCredentials
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Save contact submission into persistent storage or memory log.
 */
export async function saveContactSubmission(submission: {
  name: string;
  email: string;
  message: string;
}): Promise<{ id: string; timestamp: string; storage: "redis" | "memory" }> {
  const id = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const timestamp = new Date().toISOString();
  const record = { id, ...submission, timestamp };

  if (redis) {
    try {
      await redis.lpush("portfolio:contacts", JSON.stringify(record));
      return { id, timestamp, storage: "redis" };
    } catch (err) {
      console.warn("[db] Redis contact save failed, falling back to memory:", err);
    }
  }

  memoryStore.contacts.push(record);
  return { id, timestamp, storage: "memory" };
}
