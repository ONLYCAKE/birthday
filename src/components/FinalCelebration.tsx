import { useEffect, useRef, useState } from "react";
import type { BirthdayCard } from "../types/birthday";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { FloatingHearts } from "./FloatingHearts";
import { SafeImage } from "./SafeImage";

interface FinalCelebrationProps {
  card: BirthdayCard;
  onReplay: () => void;
  onClose: () => void;
}

export function FinalCelebration({ card, onReplay, onClose }: FinalCelebrationProps) {
  const reduced = usePrefersReducedMotion();
  const onCloseRef = useRef(onClose);
  const [count, setCount] = useState(reduced ? card.message.length : 0);
  const done = count >= card.message.length;
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    let current = 0;
    const id = window.setInterval(() => {
      current += 2;
      setCount(Math.min(current, card.message.length));
      if (current >= card.message.length) window.clearInterval(id);
    }, 12);
    return () => window.clearInterval(id);
  }, [card.message, reduced]);

  return (
    <div className="finale" role="dialog" aria-modal="true" aria-labelledby="finale-title">
      <div className="starfield" aria-hidden="true" />
      {!reduced && <div className="confetti" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</div>}
      <FloatingHearts variant="burst" count={12} />

      <div className="finale-spread">
        <div className="split-media finale-visual">
          <SafeImage
            src={card.image}
            alt={card.imageAlt ?? "Dhruv and Naisargi"}
            className="card-photo"
            priority
            objectPosition={card.objectPosition}
          />
          <span className="split-veil" aria-hidden="true" />
          <span className="split-index" aria-hidden="true">
            {String(card.id).padStart(2, "0")}
          </span>
        </div>
        <div className="finale-inner">
          <p className="finale-heart" aria-hidden="true">♥</p>
          <p className="card-time">{card.timeLabel}</p>
          <h2 id="finale-title">{card.title}</h2>
          <p className="finale-letter">
            {card.message.slice(0, count)}
            {!done && <span className="caret" aria-hidden="true" />}
          </p>
          {!done && (
            <button type="button" className="text-button" onClick={() => setCount(card.message.length)}>
              Show the rest
            </button>
          )}
          {done && (
            <div className="finale-close">
              <p className="finale-wish">Happy Birthday, Dhruv</p>
              <p className="signature">
                Made with all my heart,
                <br />
                Naisu
              </p>
              <button type="button" className="cta cta-pulse" onClick={onReplay}>
                Play it again
              </button>
              <button type="button" className="text-button" onClick={onClose}>
                Back to your hours
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
