import { useEffect, useRef, useState } from "react";
import { secretQuestions } from "../data/questions";
import { answersMatch } from "../utils/answers";
import { FloatingHearts } from "./FloatingHearts";

interface SecretLoginProps {
  onComplete: () => void;
}

export function SecretLogin({ onComplete }: SecretLoginProps) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [right, setRight] = useState(false);
  const [finale, setFinale] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | null>(null);
  const question = secretQuestions[index];

  useEffect(() => {
    inputRef.current?.focus();
  }, [index, shakeKey]);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const submit = () => {
    if (right || finale) return;
    if (!answersMatch(value, question.answer)) {
      setWrong(true);
      setShakeKey((key) => key + 1);
      return;
    }

    setWrong(false);
    setRight(true);

    if (index < secretQuestions.length - 1) {
      timer.current = window.setTimeout(() => {
        setIndex((current) => current + 1);
        setValue("");
        setRight(false);
      }, 780);
      return;
    }

    timer.current = window.setTimeout(() => {
      setFinale(true);
      timer.current = window.setTimeout(onComplete, 1800);
    }, 520);
  };

  if (finale) {
    return (
      <section className="login stage">
        <FloatingHearts variant="burst" count={10} />
        <div className="login-finale">
          <p className="eyebrow">Okay...</p>
          <h1>you belong here</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="login stage">
      <p className="eyebrow">A private door</p>
      <h1>
        Before you
        <br />
        enter...
      </h1>
      <p className="login-lead">Prove that you know your place in my heart</p>

      <form
        key={shakeKey}
        className={`glass login-card ${wrong ? "is-shaking" : ""} ${right ? "is-right" : ""}`}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="secret-answer">{question.prompt}</label>
        <input
          ref={inputRef}
          id="secret-answer"
          name="secret-answer"
          type="text"
          value={value}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Your answer"
          aria-invalid={wrong}
          onChange={(event) => {
            setValue(event.target.value);
            if (wrong) setWrong(false);
          }}
        />
        <button type="submit" className="cta">
          This is me
        </button>
        <p className="login-feedback" role="status" aria-live="polite">
          {wrong ? "Umm... think again 😌❤️" : right ? "That's you." : ""}
        </p>
      </form>
    </section>
  );
}
