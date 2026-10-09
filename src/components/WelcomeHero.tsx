import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { HeartIcon } from "./icons";
import { SafeImage } from "./SafeImage";

interface WelcomeHeroProps {
  onOpen: () => void;
}

type BookStage = "closed" | "open" | "away" | "next";

const OPEN_MS = 1700;
const HOLD_MS = 5000;
const FADE_MS = 900;

export function WelcomeHero({ onOpen }: WelcomeHeroProps) {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<BookStage>("closed");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const openBook = () => {
    if (stage !== "closed") return;
    setStage("open");
    const openMs = reduced ? 0 : OPEN_MS;
    const fadeMs = reduced ? 280 : FADE_MS;
    timers.current.push(window.setTimeout(() => setStage("away"), openMs + HOLD_MS));
    timers.current.push(window.setTimeout(() => setStage("next"), openMs + HOLD_MS + fadeMs));
  };

  const continueOn = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
    onOpen();
  };

  if (stage === "next") {
    return (
      <section className="hero stage book-hero">
        <div className="book-next">
          <p className="eyebrow">A little further</p>
          <h1>The first page was only the beginning.</h1>
          <button className="cta cta-pulse" onClick={continueOn}>
            Open your next surprise
            <HeartIcon />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="hero stage book-hero">
      <div className={`book-scene ${stage !== "closed" ? "is-open" : ""} ${reduced ? "is-still" : ""} ${stage === "away" ? "is-away" : ""}`}>
        <div className="book">
          <div className="page-stack" aria-hidden="true" />
          <article className="page page-right">
            <p className="eyebrow">11 October</p>
            <h1>
              Happy Birthday,
              <span>Dhruv</span>
            </h1>
            <p className="lede">
              Today isn't just another birthday...
              <br />
              it's 24 hours of little pieces of us.
            </p>
            <p className="signature">Made with love by Naisu</p>
          </article>
          <div
            className="turning-cover"
            role="button"
            tabIndex={stage === "closed" ? 0 : -1}
            aria-disabled={stage !== "closed"}
            aria-label="Open the book"
            onClick={openBook}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openBook();
              }
            }}
          >
            <span className="face face-front">
              <span className="cover-spine" aria-hidden="true" />
              <p className="eyebrow">11 October</p>
              <h1>For my love</h1>
              <HeartIcon />
              <p className="cover-hint">Open the book</p>
            </span>
            <span className="face face-back">
              <SafeImage
                src="/photos/image.png"
                alt="Dhruv smiling by the sea"
                className="page-photo"
                priority
                objectPosition="center 42%"
              />
            </span>
            <span className="cover-board" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
