import { birthdayConfig } from "../config/birthdayConfig";
import { useCountdown } from "../hooks/useCountdown";
import { padTime } from "../utils/birthdayTime";
import type { BirthdayStatus } from "../types/birthday";

interface CountdownProps {
  status: BirthdayStatus;
  target: number | null;
  now: number;
  unlockedCount: number;
}

export function Countdown({ status, target, now, unlockedCount }: CountdownProps) {
  const clock = useCountdown(target, now);
  const done = status === "after" || (status === "during" && unlockedCount >= birthdayConfig.totalCards);

  if (status === "unconfigured") {
    return (
      <section className="clock">
        <h2>The birthday date still needs to be set.</h2>
      </section>
    );
  }

  if (done) {
    return (
      <section className="clock clock-done">
        <h2>All 24 surprises are yours</h2>
      </section>
    );
  }

  const before = status === "before";

  return (
    <section className="clock">
      <h2>{before ? "Your 24-hour birthday journey begins in..." : "Your next surprise unlocks in"}</h2>
      <div className="clock-row">
        {before && <ClockCell value={clock.days} label="days" />}
        <ClockCell value={padTime(clock.hours)} label="hours" />
        <ClockCell value={padTime(clock.minutes)} label="min" />
        <ClockCell value={padTime(clock.seconds)} label="sec" />
      </div>
      {before && <p className="clock-note">Don't peek too early</p>}
    </section>
  );
}

function ClockCell({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="clock-cell">
      <span className="clock-num">{value}</span>
      <span className="clock-label">{label}</span>
    </div>
  );
}
