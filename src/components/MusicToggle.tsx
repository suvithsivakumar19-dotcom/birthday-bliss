import { useEffect, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// gentle public-domain music box loop
const SRC = "https://cdn.pixabay.com/audio/2022/10/30/audio_347eea2d29.mp3";

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.35;
    setAudio(a);
    return () => {
      a.pause();
    };
  }, []);

  const toggle = () => {
    if (!audio) return;
    if (on) {
      audio.pause();
      setOn(false);
    } else {
      audio.play().catch(() => {});
      setOn(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute music" : "Play birthday music"}
      className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full border border-accent/40 bg-card/70 text-accent shadow-glow backdrop-blur-xl transition hover:scale-110"
    >
      {on ? <Music className="size-5 animate-shimmer" /> : <VolumeX className="size-5" />}
    </button>
  );
}
