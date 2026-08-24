import { Redis } from "@upstash/redis";
import { StatsData } from "@/types";

// In-memory ephemeral fallback store (used during local development or when Redis is not configured)
const memoryStore: {
  totalViews: number;
  projectLikes: Record<string, number>;
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }>;
} = {
  totalViews: 0,
  projectLikes: {},
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
 * Retrieve current visitor stats.
 * Uses Upstash Redis if available, otherwise returns local in-memory counts.
 */
export async function getStats(): Promise<StatsData> {
  if (redis) {
    try {
      const totalViews = (await redis.get<number>("portfolio:views")) ?? 0;
      const projectLikes = (await redis.hgetall<Record<string, number>>("portfolio:likes")) ?? {};
      return {
        totalViews,
        projectLikes: projectLikes || {},
        storage: "redis",
      };
    } catch (err) {
      console.warn("[db] Redis fetch failed, falling back to memory store:", err);
    }
  }

  return {
    totalViews: memoryStore.totalViews,
    projectLikes: memoryStore.projectLikes,
    storage: "memory",
  };
}

/**
 * Increment total page views.
 */
export async function incrementViews(): Promise<{ totalViews: number; storage: "redis" | "memory" }> {
  if (redis) {
    try {
      const totalViews = await redis.incr("portfolio:views");
      return { totalViews, storage: "redis" };
    } catch (err) {
      console.warn("[db] Redis view increment failed, falling back to memory:", err);
    }
  }

  memoryStore.totalViews += 1;
  return { totalViews: memoryStore.totalViews, storage: "memory" };
}

/**
 * Increment a specific project like or reaction count.
 */
export async function incrementProjectLike(projectId: string): Promise<{ likes: number; storage: "redis" | "memory" }> {
  if (redis) {
    try {
      const likes = await redis.hincrby("portfolio:likes", projectId, 1);
      return { likes, storage: "redis" };
    } catch (err) {
      console.warn("[db] Redis like increment failed, falling back to memory:", err);
    }
  }

  memoryStore.projectLikes[projectId] = (memoryStore.projectLikes[projectId] || 0) + 1;
  return { likes: memoryStore.projectLikes[projectId], storage: "memory" };
}

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
