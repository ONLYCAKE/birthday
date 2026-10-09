import { useEffect, useMemo, useRef, useState } from "react";
import { birthdayCards } from "../data/birthdayCards";
import { useBirthdayUnlock } from "../hooks/useBirthdayUnlock";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { storageKeys } from "../utils/storage";
import { formatShortRemaining } from "../utils/birthdayTime";
import type { BirthdayCard as CardData } from "../types/birthday";
import { BirthdayCard } from "./BirthdayCard";
import { CardModal } from "./CardModal";
import { Countdown } from "./Countdown";
import { FinalCelebration } from "./FinalCelebration";
import { HeartIcon, LockIcon } from "./icons";
import { ProgressBar } from "./ProgressBar";

export function SurpriseTimeline() {
  const clock = useBirthdayUnlock();
  const reduced = usePrefersReducedMotion();
  const [openedIds, setOpenedIds] = useLocalStorage<number[]>(storageKeys.opened, []);
  const [active, setActive] = useState<CardData | null>(null);
  const [finaleOpen, setFinaleOpen] = useState(false);
  const [finaleKey, setFinaleKey] = useState(0);
  const [toastCount, setToastCount] = useState<number | null>(null);
  const [secretClicks, setSecretClicks] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);
  const [psOpen, setPsOpen] = useState(false);
  const previous = useRef<number | null>(null);

  const opened = useMemo(() => {
    const list = Array.isArray(openedIds) ? openedIds : [];
    return new Set(list.filter((id) => Number.isInteger(id)));
  }, [openedIds]);

  useEffect(() => {
    if (clock.status === "unconfigured") return;
    if (previous.current === null) {
      previous.current = clock.unlockedCount;
      return;
    }
    if (clock.unlockedCount > previous.current) {
      const count = clock.unlockedCount;
      previous.current = count;
      setToastCount(count);
      document.getElementById(`hour-${count}`)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
    }
  }, [clock.status, clock.unlockedCount, reduced]);

  useEffect(() => {
    if (toastCount === null) return;
    const timer = window.setTimeout(() => setToastCount(null), 4600);
    return () => window.clearTimeout(timer);
  }, [toastCount]);

  const openCard = (card: CardData) => {
    if (clock.status === "before" || card.id > clock.unlockedCount) return;
    setOpenedIds((current) => {
      const list = Array.isArray(current) ? current : [];
      return list.includes(card.id) ? list : [...list, card.id];
    });
    if (card.id === 24) {
      setFinaleKey((key) => key + 1);
      setFinaleOpen(true);
      return;
    }
    setActive(card);
  };

  const countdown = clock.nextUnlockAt === null ? undefined : formatShortRemaining(clock.nextUnlockAt - clock.now);
  const featuredId = [...birthdayCards].reverse().find((card) => card.id <= clock.unlockedCount && !opened.has(card.id))?.id;
  const finaleCard = birthdayCards[23];
  const allOpened = opened.size >= 24 && clock.unlockedCount >= 24;

  return (
    <section className="timeline stage">
      <header className="timeline-head">
        <p className="eyebrow">For Dhruv</p>
        <h1>
          {clock.status === "before" ? (
            "Not yet, love."
          ) : (
            <>
              Twenty-four
              <br />
              little pieces
            </>
          )}
        </h1>
        <Countdown status={clock.status} target={clock.nextUnlockAt} now={clock.now} unlockedCount={clock.unlockedCount} />
        <ProgressBar unlocked={clock.status === "before" ? 0 : clock.unlockedCount} />
        {allOpened && <p className="all-opened">You opened every hour.</p>}
      </header>

      <div className="card-list">
        {birthdayCards.map((card) => {
          const unlocked = clock.status !== "before" && card.id <= clock.unlockedCount;
          const isNext = !unlocked && card.id === clock.unlockedCount + 1;
          return (
            <BirthdayCard
              key={card.id}
              card={card}
              unlocked={unlocked}
              opened={unlocked && opened.has(card.id)}
              featured={card.id === featuredId}
              countdown={isNext ? countdown : undefined}
              onOpen={openCard}
            />
          );
        })}
      </div>

      <footer className="timeline-foot">
        <button
          type="button"
          className="secret-heart"
          aria-label="A tiny heart"
          onClick={() => {
            const next = secretClicks + 1;
            setSecretClicks(next);
            if (next >= 3) setSecretOpen(true);
          }}
        >
          <HeartIcon />
        </button>
        {secretOpen && <p className="secret-note">Okay okay... you found the secret ❤️</p>}
        <button type="button" className="ps-dot" aria-label="A small hidden note" onClick={() => setPsOpen(true)} />
        {psOpen && <p className="secret-note">PS: You were supposed to discover this later 😌</p>}
        <p className="signature">Made with love by Naisu</p>
      </footer>

      {toastCount !== null && (
        <div className={`toast ${toastCount === 1 ? "toast-midnight" : ""}`} role="status">
          {toastCount === 1 && <span className="midnight-glow" aria-hidden="true" />}
          <LockIcon />
          {toastCount === 1 ? (
            <>
              <p className="toast-time">12:00 AM</p>
              <p>Your first surprise is here</p>
            </>
          ) : (
            <p>New surprise unlocked</p>
          )}
        </div>
      )}

      {active && <CardModal card={active} onClose={() => setActive(null)} />}
      {finaleOpen && (
        <FinalCelebration
          key={finaleKey}
          card={finaleCard}
          onReplay={() => setFinaleKey((key) => key + 1)}
          onClose={() => setFinaleOpen(false)}
        />
      )}
    </section>
  );
}
