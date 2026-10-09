import { birthdayConfig } from "../config/birthdayConfig";

interface ProgressBarProps {
  unlocked: number;
}

export function ProgressBar({ unlocked }: ProgressBarProps) {
  const total = birthdayConfig.totalCards;
  const width = `${(unlocked / total) * 100}%`;

  return (
    <div className="progress">
      <p>
        {unlocked} / {total} surprises unlocked
      </p>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={unlocked}
        aria-label="Surprises unlocked"
      >
        <span style={{ width }} />
      </div>
      <div className="progress-dots" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => {
          const on = index < unlocked;
          const current = unlocked > 0 && index === unlocked - 1 && unlocked < total;
          return <span key={index} className={on ? (current ? "is-on is-current" : "is-on") : ""} />;
        })}
      </div>
    </div>
  );
}
