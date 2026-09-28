"use client";

import { useSoundContext } from "@/context/sound-context";
import { Button } from "@/components/ui/button";
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs";

export default function SoundSwitch() {
  const { soundOn, toggleSound } = useSoundContext();

  return (
    <Button
      type="button"
      variant="chrome"
      size="icon"
      className="fixed bottom-20 right-5 h-12 w-12 shadow-2xl"
      aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
      onClick={toggleSound}
    >
      {soundOn ? <BsVolumeUp aria-hidden /> : <BsVolumeMute aria-hidden />}
    </Button>
  );
}
