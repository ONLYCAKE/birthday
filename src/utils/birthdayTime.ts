import { birthdayConfig, type BirthdayConfig } from "../config/birthdayConfig";
import type { ClockParts, UnlockSnapshot } from "../types/birthday";

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const realOrigin = Date.now();

export function getNow(): Date {
  const override = birthdayConfig.devTimeOverride;
  if (!override) return new Date();
  const stamp = Date.parse(override);
  if (Number.isNaN(stamp)) return new Date();
  return new Date(stamp + (Date.now() - realOrigin));
}

export function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const map: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") map[part.type] = part.value;
  }

  let hour = Number(map.hour);
  if (hour === 24) hour = 0;

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour,
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

export function toDateKey(parts: ZonedParts): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
}

function timezoneOffsetMs(date: Date, timeZone: string): number {
  const parts = getZonedParts(date, timeZone);
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUtc - date.getTime();
}

export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string,
): Date {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  const firstOffset = timezoneOffsetMs(new Date(utcGuess), timeZone);
  const utc = utcGuess - firstOffset;
  const secondOffset = timezoneOffsetMs(new Date(utc), timeZone);
  return new Date(utcGuess - secondOffset);
}

function isDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/**
 * Cards follow the hour labels: card 1 at 12:00 AM, card 7 at 6:00 AM, card 24 at 11:00 PM.
 * At 5:59 AM, cards 1–6 are open. At 6:00 AM, card 7 opens.
 */
export function getUnlockSnapshot(currentDate: Date, config: BirthdayConfig = birthdayConfig): UnlockSnapshot {
  const now = currentDate.getTime();
  if (!isDateKey(config.birthdayDate)) {
    return { status: "unconfigured", unlockedCount: 0, nextUnlockAt: null, dateKey: "", now };
  }

  const parts = getZonedParts(currentDate, config.timezone);
  const dateKey = toDateKey(parts);
  const [year, month, day] = config.birthdayDate.split("-").map(Number);

  if (dateKey < config.birthdayDate) {
    return {
      status: "before",
      unlockedCount: 0,
      nextUnlockAt: zonedTimeToUtc(year, month, day, 0, 0, 0, config.timezone).getTime(),
      dateKey,
      now,
    };
  }

  if (dateKey > config.birthdayDate) {
    return {
      status: "after",
      unlockedCount: config.totalCards,
      nextUnlockAt: null,
      dateKey,
      now,
    };
  }

  const unlockedCount = Math.min(config.totalCards, parts.hour + 1);
  const nextUnlockAt =
    parts.hour >= config.totalCards - 1
      ? null
      : zonedTimeToUtc(parts.year, parts.month, parts.day, parts.hour + 1, 0, 0, config.timezone).getTime();

  return { status: "during", unlockedCount, nextUnlockAt, dateKey, now };
}

export function getUnlockedCardCount(currentDate: Date, config: BirthdayConfig = birthdayConfig): number {
  return getUnlockSnapshot(currentDate, config).unlockedCount;
}

export function splitDuration(ms: number): ClockParts {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function formatShortRemaining(ms: number): string {
  const { days, hours, minutes, seconds } = splitDuration(ms);
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export function padTime(value: number): string {
  return String(value).padStart(2, "0");
}
