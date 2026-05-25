import { useEffect, useState } from "react";

const BIRTHDAY_ISO = "2006-05-26T00:00:00";

function calcAge() {
  const birth = new Date(BIRTHDAY_ISO);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--;
  return years;
}

function nextBirthday() {
  const now = new Date();
  const y = now.getFullYear();
  const thisYear = new Date(y, 4, 26, 0, 0, 0);
  return thisYear > now ? thisYear : new Date(y + 1, 4, 26, 0, 0, 0);
}

export function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = nextBirthday().getTime() - Date.now();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const age = calcAge();
  const items = [
    { label: "Days", value: time.d },
    { label: "Hours", value: time.h },
    { label: "Minutes", value: time.m },
    { label: "Seconds", value: time.s },
  ];

  return (
    <div className="space-y-6">
      <p className="text-center font-script text-3xl text-accent">
        Born on 26 · 05 · 2006 · turning {age + 1} next
      </p>
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-2xl border border-border bg-card/40 p-4 text-center backdrop-blur-xl md:p-6"
          >
            <div className="text-gradient text-3xl font-bold md:text-5xl">
              {String(it.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
