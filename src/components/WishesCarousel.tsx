import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const WISHES = [
  "May this year unfold like a love letter written by the universe — full of surprise, softness, and breathtaking pages you never saw coming.",
  "Wishing you a year where your laughter echoes louder than your worries, and every dream you whisper finds its way home to you.",
  "May the candles you blow out tonight light a thousand new paths, each one leading somewhere extraordinary.",
  "Here's to becoming softer where it matters, fiercer where it counts, and freer everywhere in between.",
  "May you be loved the way you love — generously, fearlessly, and without conditions.",
  "Wishing you slow mornings, golden hours, songs that feel like home, and people who feel like sunlight.",
  "May every chapter ahead be bolder than the last, written in ink that refuses to fade.",
];

export function WishesCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % WISHES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto max-w-3xl">
      <Quote className="absolute -left-2 -top-6 size-12 text-accent/30 md:-left-8 md:size-16" />
      <div className="min-h-[10rem] md:min-h-[8rem]">
        {WISHES.map((w, idx) => (
          <p
            key={idx}
            className={`absolute inset-0 font-display text-xl leading-relaxed text-foreground/90 transition-all duration-1000 md:text-2xl ${
              idx === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {w}
          </p>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {WISHES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-accent" : "w-1.5 bg-border"
            }`}
            aria-label={`Wish ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
