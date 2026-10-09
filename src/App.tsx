import { useState } from "react";
import { CelebrationIntro } from "./components/CelebrationIntro";
import { CursorSparkle, ParticleBackground } from "./components/ParticleBackground";
import { MusicPlayer } from "./components/MusicPlayer";
import { SecretLogin } from "./components/SecretLogin";
import { SurpriseTimeline } from "./components/SurpriseTimeline";
import { WelcomeHero } from "./components/WelcomeHero";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { ExperiencePhase } from "./types/birthday";
import { readStorage, storageKeys } from "./utils/storage";

function initialPhase(): ExperiencePhase {
  if (readStorage<boolean>(storageKeys.auth, false) !== true) return "login";
  if (readStorage<boolean>(storageKeys.introSeen, false) === true) return "timeline";
  return "hero";
}

export function App() {
  const [, setAuthed] = useLocalStorage<boolean>(storageKeys.auth, false);
  const [, setIntroSeen] = useLocalStorage<boolean>(storageKeys.introSeen, false);
  const [phase, setPhase] = useState<ExperiencePhase>(initialPhase);

  return (
    <div className="app">
      <ParticleBackground />
      <CursorSparkle />
      {phase !== "login" && phase !== "intro" && <SideOrnaments />}
      <main className="shell screen" key={phase}>
        {phase === "login" && (
          <SecretLogin
            onComplete={() => {
              setAuthed(true);
              setPhase("hero");
            }}
          />
        )}
        {phase === "hero" && <WelcomeHero onOpen={() => setPhase("intro")} />}
        {phase === "intro" && (
          <CelebrationIntro
            onComplete={() => {
              setIntroSeen(true);
              setPhase("timeline");
            }}
          />
        )}
        {phase === "timeline" && <SurpriseTimeline />}
      </main>
      {phase !== "login" && <MusicPlayer />}
    </div>
  );
}

function SideOrnaments() {
  return (
    <>
      <p className="ornament ornament-left" aria-hidden="true">
        Eleven October
      </p>
      <p className="ornament ornament-right" aria-hidden="true">
        For Dhruv
      </p>
    </>
  );
}
