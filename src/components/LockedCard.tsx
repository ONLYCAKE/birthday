import { LockIcon } from "./icons";

interface LockedCardProps {
  timeLabel: string;
  countdown?: string;
}

export function LockedCard({ timeLabel, countdown }: LockedCardProps) {
  return (
    <article className="card card-locked" aria-disabled="true" aria-label={`${timeLabel} is still locked`}>
      <p className="card-time">{timeLabel}</p>
      <div className="lock-wrap">
        <LockIcon />
      </div>
      <p className="card-lock-copy">Opens at {timeLabel}</p>
      {countdown && <p className="card-countdown">Next surprise in {countdown}</p>}
    </article>
  );
}
