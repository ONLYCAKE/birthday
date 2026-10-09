import type { BirthdayCard as BirthdayCardData } from "../types/birthday";
import { HeartIcon } from "./icons";
import { LockedCard } from "./LockedCard";
import { SafeImage } from "./SafeImage";

interface BirthdayCardProps {
  card: BirthdayCardData;
  unlocked: boolean;
  opened: boolean;
  featured: boolean;
  countdown?: string;
  onOpen: (card: BirthdayCardData) => void;
}

export function BirthdayCard({ card, unlocked, opened, featured, countdown, onOpen }: BirthdayCardProps) {
  if (!unlocked) {
    return (
      <div id={`hour-${card.id}`}>
        <LockedCard timeLabel={card.timeLabel} countdown={countdown} />
      </div>
    );
  }

  const ready = !opened;
  const paragraphs = card.message.split(/\n{2,}/);

  return (
    <button
      id={`hour-${card.id}`}
      type="button"
      className={`card card-split card-${card.layout} tone-${card.tone} ${opened ? "card-opened" : "card-ready"} ${featured ? "is-featured" : ""}`}
      onClick={() => onOpen(card)}
      aria-label={opened ? `Read ${card.title}, ${card.timeLabel}` : `Open your ${card.timeLabel} surprise`}
    >
      <div className="split-media">
        <div className={`split-frame ${ready ? "split-cover" : ""}`}>
          {opened && (
            <SafeImage
              src={card.image}
              alt={card.imageAlt ?? ""}
              className="card-photo"
              priority={card.id <= 3}
              objectPosition={card.objectPosition}
            />
          )}
          <span className="split-veil" aria-hidden="true" />
          <span className="split-index" aria-hidden="true">
            {String(card.id).padStart(2, "0")}
          </span>
        </div>
      </div>

      {opened ? (
        <div className="split-copy">
          <p className="card-time">{card.timeLabel}</p>
          <div className="card-writing">
            <h3>{card.title}</h3>
            {card.caption && <p className="card-caption">{card.caption}</p>}
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="card-message" style={{ animationDelay: `${0.08 + index * 0.05}s` }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="split-copy split-invite">
          <p className="card-time">{card.timeLabel}</p>
          <span className="now-badge">Now open</span>
          <div className="seal">
            <HeartIcon />
            <p>{card.layout === "finale" ? "The last one" : "Open"}</p>
          </div>
          {featured && <p className="ready-line">Your next little surprise is ready</p>}
        </div>
      )}
    </button>
  );
}
