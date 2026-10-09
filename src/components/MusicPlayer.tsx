import { useEffect, useRef, useState } from "react";
import { birthdayConfig } from "../config/birthdayConfig";
import { NoteIcon } from "./icons";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(Boolean(birthdayConfig.soundtrack));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  if (!available) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.55;
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    audio.pause();
    setPlaying(false);
  };

  return (
    <div className="music">
      <audio
        ref={audioRef}
        src={birthdayConfig.soundtrack ?? undefined}
        preload="none"
        onEnded={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      <button type="button" className="music-button" onClick={toggle} aria-pressed={playing} aria-label={playing ? "Pause the soundtrack" : "Play the soundtrack"}>
        <NoteIcon />
        <span>{playing ? "Pause" : "A little soundtrack for your day"}</span>
      </button>
    </div>
  );
}
