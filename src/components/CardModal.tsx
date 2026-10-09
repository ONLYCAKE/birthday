import { useEffect, useRef, useState } from "react";
import type { BirthdayCard } from "../types/birthday";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { CloseIcon } from "./icons";
import { SafeImage } from "./SafeImage";
import { FloatingHearts } from "./FloatingHearts";

interface CardModalProps {
  card: BirthdayCard;
  onClose: () => void;
}

export function CardModal({ card, onClose }: CardModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const reduced = usePrefersReducedMotion();
  const [showReveal, setShowReveal] = useState(!card.reveal || reduced);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    if (!card.reveal || reduced) return;
    const timer = window.setTimeout(() => setShowReveal(true), 1100);
    return () => window.clearTimeout(timer);
  }, [card.reveal, reduced]);

  const paragraphs = card.message.split(/\n{2,}/);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-card modal-split tone-${card.tone}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="open-card-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close this surprise">
          <CloseIcon />
        </button>
        <div className="split-media">
          <SafeImage
            src={card.image}
            alt={card.imageAlt ?? ""}
            className="card-photo"
            priority
            objectPosition={card.objectPosition}
          />
          <span className="split-veil" aria-hidden="true" />
          <span className="split-index" aria-hidden="true">
            {String(card.id).padStart(2, "0")}
          </span>
          <FloatingHearts variant="burst" count={7} />
        </div>
        <div className="split-copy modal-copy">
          <p className="card-time">{card.timeLabel}</p>
          <h2 id="open-card-title">{card.title}</h2>
          {card.caption && <p className="caption">{card.caption}</p>}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="message" style={{ animationDelay: `${0.12 + index * 0.06}s` }}>
              {paragraph}
            </p>
          ))}
          {card.reveal && showReveal && <p className="reveal">{card.reveal}</p>}
          <p className="card-footer" aria-hidden="true">
            ♥ ✦ ♥
          </p>
        </div>
      </div>
    </div>
  );
}
