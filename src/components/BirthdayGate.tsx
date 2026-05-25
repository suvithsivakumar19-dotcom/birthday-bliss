import { useEffect, useState } from "react";
import { Lock, Cake, Sparkles } from "lucide-react";

const CORRECT = "2006-05-26";
const KEY = "birthday-unlocked";

export function BirthdayGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  if (unlocked) return <>{children}</>;

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (date === CORRECT) {
      localStorage.setItem(KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero px-6">
      {/* floating candles */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-30"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              animation: `float ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            {i % 3 === 0 ? "🕯️" : i % 3 === 1 ? "🎂" : "✨"}
          </span>
        ))}
      </div>

      <form
        onSubmit={tryUnlock}
        className={`relative z-10 w-full max-w-md rounded-3xl border border-accent/30 bg-card/60 p-10 text-center shadow-glow backdrop-blur-2xl ${
          shake ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
      >
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-rose shadow-glow">
          <Cake className="size-10 text-primary-foreground" />
        </div>

        <p className="font-script text-3xl text-accent">a little secret</p>
        <h1 className="mt-1 font-display text-4xl font-bold">
          <span className="text-gradient">Enter the magic date</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This celebration only opens for the right birthday.
        </p>

        <div className="mt-8 space-y-3 text-left">
          <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Lock className="size-3" /> Birthday (DD-MM-YYYY)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setError(false);
            }}
            required
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-lg text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
          />
          {error && (
            <p className="text-sm text-destructive">
              That's not the one. Try again ✨
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-rose px-6 py-3 font-display text-lg text-primary-foreground shadow-glow transition hover:scale-[1.02]"
        >
          <Sparkles className="size-5" /> Unlock the surprise
        </button>

        <p className="mt-6 text-xs text-muted-foreground">
          Hint: a day in May, 2006 🌸
        </p>
      </form>
    </main>
  );
}
