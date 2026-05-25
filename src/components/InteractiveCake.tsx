import { useState } from "react";
import { Flame, RotateCcw } from "lucide-react";

export function InteractiveCake() {
  const [candles, setCandles] = useState<boolean[]>(Array(8).fill(true));
  const allOut = candles.every((c) => !c);

  const blowAll = () => setCandles(candles.map(() => false));
  const toggle = (i: number) =>
    setCandles((c) => c.map((v, idx) => (idx === i ? false : v)));
  const reset = () => setCandles(Array(8).fill(true));

  return (
    <div className="relative mx-auto max-w-md text-center">
      {/* candles row */}
      <div className="relative mx-auto flex h-28 items-end justify-center gap-3">
        {candles.map((lit, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            aria-label={`Candle ${i + 1}`}
            className="group relative flex flex-col items-center"
          >
            {lit && (
              <span
                className="mb-0.5 block size-3 rounded-full bg-accent shadow-[0_0_14px_6px_oklch(0.85_0.14_80_/_0.7)] animate-flicker"
              />
            )}
            <span
              className={`block h-14 w-2 rounded-sm transition-colors ${
                i % 2 === 0 ? "bg-rose" : "bg-gold"
              } ${lit ? "" : "opacity-60"}`}
            />
          </button>
        ))}
      </div>

      {/* cake tiers */}
      <div className="relative">
        <div className="mx-auto h-6 w-72 rounded-t-md bg-gradient-gold shadow-soft" />
        <div className="mx-auto h-20 w-80 bg-gradient-rose shadow-glow relative overflow-hidden">
          {/* drip */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-accent/60 to-transparent" />
          <div className="absolute inset-x-0 top-3 flex justify-around">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="block h-6 w-3 rounded-b-full bg-accent/70" />
            ))}
          </div>
        </div>
        <div className="mx-auto h-3 w-96 rounded-b-2xl bg-card/80 shadow-soft" />
        <div className="mx-auto mt-1 h-2 w-[26rem] rounded-full bg-card/40" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {!allOut ? (
          <button
            onClick={blowAll}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-6 py-3 font-display text-base text-primary-foreground shadow-glow transition hover:scale-105"
          >
            <Flame className="size-4" /> Blow out the candles
          </button>
        ) : (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-card/60 px-6 py-3 font-display text-base text-accent backdrop-blur-xl transition hover:scale-105"
          >
            <RotateCcw className="size-4" /> Light them again
          </button>
        )}
      </div>

      {allOut && (
        <p className="mt-6 font-script text-3xl text-accent animate-fade-in">
          Your wish is on its way ✨
        </p>
      )}
    </div>
  );
}
