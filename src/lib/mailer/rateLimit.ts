import {
  RATE_LIMIT_PER_MINUTE,
  RATE_LIMIT_PER_HOUR,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_HOUR_MS,
} from "./constants";

// In-memory store — replace with Upstash Redis for Vercel/edge
const store = new Map<string, { count: number; windowStart: number }>();

function cleanup() {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now - val.windowStart > RATE_LIMIT_HOUR_MS * 2) store.delete(key);
  }
}

export type RateLimitResult =
  | { limited: false }
  | { limited: true; message: string };

export function checkRateLimit(ip: string): RateLimitResult {
  cleanup();

  const now = Date.now();
  const minuteKey = `rl:email:${ip}:m:${Math.floor(now / RATE_LIMIT_WINDOW_MS)}`;
  const hourKey = `rl:email:${ip}:h:${Math.floor(now / RATE_LIMIT_HOUR_MS)}`;

  const minute = store.get(minuteKey);
  if (minute && minute.count >= RATE_LIMIT_PER_MINUTE) {
    return {
      limited: true,
      message: "Too many requests. Please try again in a minute.",
    };
  }

  const hour = store.get(hourKey);
  if (hour && hour.count >= RATE_LIMIT_PER_HOUR) {
    return {
      limited: true,
      message: "Too many requests. Please try again later.",
    };
  }

  store.set(minuteKey, { count: (minute?.count ?? 0) + 1, windowStart: now });
  store.set(hourKey, { count: (hour?.count ?? 0) + 1, windowStart: now });

  return { limited: false };
}
