/**
 * Change the date here if you ever need to.
 * The clock follows India time (Asia/Kolkata), even if the phone is somewhere else.
 *
 * To preview a moment while you are building, set devTimeOverride to an ISO time, for example:
 * "2026-10-11T00:30:00+05:30"
 * Leave it null so Dhruv gets the real clock.
 */
export const birthdayConfig = {
  name: "Dhruv",
  creatorName: "Naisu",
  timezone: "Asia/Kolkata",
  birthdayDate: "2026-10-11",
  totalCards: 24,
  /** Leave null on the live site. A test time here would unlock cards for everyone. */
  devTimeOverride: null as string | null,
  /** Set to "/music/birthday.mp3" after you add that file to public/music. */
  soundtrack: null as string | null,
};

export type BirthdayConfig = typeof birthdayConfig;
