"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useSound from "use-sound";
import { interactionSprite, type SoundCue } from "@/lib/interaction-sprite";

type PlayerApi = {
  play: (options?: { id?: string }) => void;
  stop: (id?: string) => void;
};

type SoundContextType = {
  soundOn: boolean;
  toggleSound: () => void;
  playCue: (cue: SoundCue) => void;
};

const SOUND_STORAGE_KEY = "sound";

const SoundContext = createContext<SoundContextType | null>(null);

function SoundPlayer({
  onReady,
}: {
  onReady: (api: PlayerApi | null) => void;
}) {
  const [play, { stop }] = useSound("/sounds/interactions.mp3", {
    sprite: interactionSprite,
    interrupt: true,
    volume: 0.35,
  });

  useEffect(() => {
    onReady({ play, stop });
    return () => onReady(null);
  }, [onReady, play, stop]);

  return null;
}

export default function SoundContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [soundOn, setSoundOn] = useState(false);
  const playerRef = useRef<PlayerApi | null>(null);
  const registerPlayer = useCallback((api: PlayerApi | null) => {
    playerRef.current = api;
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
      if (stored === "on") {
        setSoundOn(true);
      }
    } catch {
      // A blocked store leaves sound off, which is the default.
    }
  }, []);

  const toggleSound = () => {
    if (soundOn) {
      try {
        playerRef.current?.stop();
      } catch {
        // Stopping a cue must not block the control.
      }
      try {
        window.localStorage.setItem(SOUND_STORAGE_KEY, "off");
      } catch {
        // The control still turns sound off when the store is blocked.
      }
      setSoundOn(false);
      return;
    }

    try {
      window.localStorage.setItem(SOUND_STORAGE_KEY, "on");
    } catch {
      // The control still turns sound on when the store is blocked.
    }
    setSoundOn(true);
  };

  const playCue = (cue: SoundCue) => {
    if (!soundOn) return;

    try {
      playerRef.current?.play({ id: cue });
    } catch {
      // A missing or blocked cue must not break the interaction.
    }
  };

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound, playCue }}>
      {soundOn ? <SoundPlayer onReady={registerPlayer} /> : null}
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);

  if (context === null) {
    throw new Error(
      "useSoundContext must be used within a SoundContextProvider",
    );
  }

  return context;
}
