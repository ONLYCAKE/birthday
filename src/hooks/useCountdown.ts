import { useEffect, useState } from "react";
import { getNow, splitDuration } from "../utils/birthdayTime";
import type { ClockParts } from "../types/birthday";

export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => getNow().getTime());

  useEffect(() => {
    const id = window.setInterval(() => setNow(getNow().getTime()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}

export function getRemaining(now: number, target: number | null): number {
  if (target === null) return 0;
  return Math.max(0, target - now);
}

export function useCountdown(target: number | null, now: number): ClockParts & { remaining: number } {
  const remaining = getRemaining(now, target);
  return { remaining, ...splitDuration(remaining) };
}
