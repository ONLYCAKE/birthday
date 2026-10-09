export type CardLayout = "photo" | "letter" | "night" | "finale";

export type CardTone = "gold" | "rose" | "wine";

export interface BirthdayCard {
  id: number;
  hour: number;
  timeLabel: string;
  title: string;
  message: string;
  reveal?: string;
  caption?: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  layout: CardLayout;
  tone: CardTone;
}

export type ExperiencePhase = "login" | "hero" | "intro" | "timeline";

export type BirthdayStatus = "before" | "during" | "after" | "unconfigured";

export interface UnlockSnapshot {
  status: BirthdayStatus;
  unlockedCount: number;
  nextUnlockAt: number | null;
  dateKey: string;
  now: number;
}

export interface ClockParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SecretQuestion {
  id: string;
  prompt: string;
  answer: string;
}
