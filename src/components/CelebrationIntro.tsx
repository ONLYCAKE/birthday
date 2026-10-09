import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const lines = [
  { text: "Wait...", kind: "soft" },
  { text: "There's something I made for you.", kind: "soft" },
  { text: "Not one wish.", kind: "beat" },
  { text: "Not one message.", kind: "beat" },
  { text: "Not one memory.", kind: "beat" },
  { text: "24 of them.", kind: "big" },
  { text: "One for every hour of your birthday.", kind: "last" },
];

interface CelebrationIntroProps {
  onComplete: () => void;
}

export function CelebrationIntro({ onComplete }: CelebrationIntroProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const finished = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    if (reduced || index >= lines.length - 1) return;
    const delay = index < 2 ? 2000 : 1650;
    const timer = window.setTimeout(() => setIndex((current) => current + 1), delay);
    return () => window.clearTimeout(timer);
  }, [index, reduced]);

  useEffect(() => {
    if (reduced || index < lines.length - 1) return;
    const timer = window.setTimeout(finish, 3800);
    return () => window.clearTimeout(timer);
  }, [finish, index, reduced]);

  const line = lines[index];
  const atEnd = reduced || index === lines.length - 1;

  return (
    <section className="intro stage">
      {reduced ? (
        <div className="intro-stack">
          {lines.map((item) => (
            <p key={item.text} className={`intro-line ${item.kind}`}>
              {item.text}
            </p>
          ))}
        </div>
      ) : (
        <p key={line.text} className={`intro-line ${line.kind}`}>
          {line.kind === "last" ? <TypedLine text={line.text} /> : line.text}
        </p>
      )}

      <div className="intro-dots" aria-hidden="true">
        {lines.map((item, dot) => (
          <span key={item.text} className={dot <= index ? "is-on" : ""} />
        ))}
      </div>

      <button className={atEnd ? "cta" : "text-button"} onClick={finish}>
        {atEnd ? "Open the hours" : "Continue"}
      </button>
    </section>
  );
}

function TypedLine({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= text.length) window.clearInterval(id);
    }, 36);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <>
      {text.slice(0, count)}
      <span className="caret" aria-hidden="true" />
    </>
  );
}
