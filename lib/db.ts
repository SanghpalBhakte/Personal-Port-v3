import { Redis } from "@upstash/redis";
import { StatsData } from "@/types";

// In-memory fallback store for local development or when Redis credentials are not set
const memoryStore: {
  stats: StatsData;
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }>;
} = {
  stats: {
    views: 128,
    likes: 42,
    projectViews: {
      "clarity-desk": 54,
      "sweep": 38,
      "rivet": 24,
      "janai-tours": 12,
    },
  },
  contacts: [],
};

// Initialize Upstash Redis if env variables are available
const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

export const redis = hasRedis
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export async function getStats(): Promise<StatsData> {
  if (redis) {
    try {
      const views = (await redis.get<number>("portfolio:views")) ?? 0;
      const likes = (await redis.get<number>("portfolio:likes")) ?? 0;
      const projectViews = (await redis.hgetall<Record<string, number>>("portfolio:project_views")) ?? {};
      return { views, likes, projectViews };
    } catch (err) {
      console.warn("Failed to fetch stats from Redis, using memory store fallback:", err);
    }
  }
  return memoryStore.stats;
}

export async function incrementViews(): Promise<number> {
  if (redis) {
    try {
      return await redis.incr("portfolio:views");
    } catch (err) {
      console.warn("Failed to increment views on Redis:", err);
    }
  }
  memoryStore.stats.views += 1;
  return memoryStore.stats.views;
}

export async function incrementLikes(): Promise<number> {
  if (redis) {
    try {
      return await redis.incr("portfolio:likes");
    } catch (err) {
      console.warn("Failed to increment likes on Redis:", err);
    }
  }
  memoryStore.stats.likes += 1;
  return memoryStore.stats.likes;
}

export async function saveContactSubmission(submission: {
  name: string;
  email: string;
  message: string;
}): Promise<{ id: string; timestamp: string }> {
  const id = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const timestamp = new Date().toISOString();
  const entry = { id, ...submission, timestamp };

  if (redis) {
    try {
      await redis.lpush("portfolio:contacts", JSON.stringify(entry));
    } catch (err) {
      console.warn("Failed to save contact to Redis, storing in memory:", err);
      memoryStore.contacts.push(entry);
    }
  } else {
    memoryStore.contacts.push(entry);
  }

  return { id, timestamp };
}
