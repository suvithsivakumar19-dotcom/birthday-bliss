import { createFileRoute } from "@tanstack/react-router";
import { Cake, Heart, Sparkles, Gift } from "lucide-react";
import heroBg from "@/assets/birthday-hero.jpg";
import cakeImg from "@/assets/birthday-cake.jpg";
import { Confetti } from "@/components/Confetti";
import { Countdown } from "@/components/Countdown";
import { WishesCarousel } from "@/components/WishesCarousel";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BirthdayGate } from "@/components/BirthdayGate";
import { InteractiveCake } from "@/components/InteractiveCake";
import { MusicToggle } from "@/components/MusicToggle";
import { Balloons } from "@/components/Balloons";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday — 26.05.2006" },
      { name: "description", content: "A heartfelt birthday celebration: countdowns, wishes, and a memory gallery." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@500;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
});

const SHORT_WISHES = [
  { icon: Sparkles, text: "Shine endlessly" },
  { icon: Heart, text: "Be deeply loved" },
  { icon: Gift, text: "Receive every joy" },
  { icon: Cake, text: "Taste the sweetness" },
];

function Index() {
  return (
    <BirthdayGate>
      <BirthdayPage />
    </BirthdayGate>
  );
}

function BirthdayPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero">
      <Confetti />
      <Balloons />
      <MusicToggle />
      {/* floating cakes & candles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 md:text-3xl"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `float ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            {["🎂", "🕯️", "🎈", "✨", "🌸"][i % 5]}
          </span>
        ))}
      </div>

      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center justify-center px-6 py-20">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/40 px-4 py-2 text-sm text-accent backdrop-blur-xl">
            <Sparkles className="size-4 animate-shimmer" />
            <span className="tracking-widest uppercase">A special day</span>
          </div>

          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">
            <span className="block text-gradient">Happy</span>
            <span className="block font-script text-7xl md:text-9xl">Birthday</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Today the universe pauses to celebrate the moment you arrived —
            <span className="text-accent"> the 26th of May, 2006</span>. A day the world
            became a little brighter, a little softer, a little more alive.
          </p>

          <div className="mx-auto mt-14 max-w-3xl">
            <Countdown />
          </div>
        </div>
      </section>

      {/* WISHES PARA */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-script text-3xl text-accent">a wish for you</p>
          <h2 className="mt-2 text-4xl font-bold md:text-6xl">
            <span className="text-gradient">Every candle, a promise.</span>
          </h2>
          <p className="mt-10 font-display text-xl leading-relaxed text-foreground/85 md:text-2xl md:leading-relaxed">
            On this day eighteen years and a handful of seasons ago, the world held its
            breath and made room for you. Since then, you've been writing a story stitched
            in courage and quiet kindness, in stubborn dreams and softer second chances.
            May this new year bring you mornings that feel like beginnings, evenings that
            feel like belonging, and a thousand small miracles dressed up as ordinary days.
            May you be brave enough to want more, gentle enough to hold less, and wild
            enough to chase whatever it is that makes your heart feel awake. Happy
            birthday — the universe is so glad you're here.
          </p>
        </div>
      </section>

      {/* WISH CHIPS */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {SHORT_WISHES.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="group rounded-2xl border border-border bg-card/40 p-6 text-center backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
            >
              <Icon className="mx-auto size-8 text-accent transition-transform group-hover:scale-110" />
              <p className="mt-3 font-display text-lg">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAROUSEL OF WISHES */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="font-script text-3xl text-accent">seven little prayers</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">
              <span className="text-gradient">For the year ahead</span>
            </h2>
          </div>
          <WishesCarousel />
        </div>
      </section>

      {/* CAKE IMAGE BREAK */}
      <section className="relative px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row">
          <div className="relative shrink-0">
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-rose blur-3xl opacity-40" />
            <img
              src={cakeImg}
              alt="Birthday cake"
              width={400}
              height={400}
              loading="lazy"
              className="size-64 rounded-3xl object-cover shadow-glow md:size-80"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-script text-5xl text-accent md:text-6xl">Make a wish</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Close your eyes. Hold it in your chest. The kind of wish only you know the
              shape of. Now blow — and let the smoke carry it somewhere the stars can read it.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CAKE */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-script text-3xl text-accent">your turn</p>
          <h2 className="mt-2 text-4xl font-bold md:text-5xl">
            <span className="text-gradient">Blow out the candles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Click a candle to put it out one by one — or blow them all at once.
          </p>
          <div className="mt-14">
            <InteractiveCake />
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="font-script text-3xl text-accent">your memories</p>
            <h2 className="mt-2 text-4xl font-bold md:text-6xl">
              <span className="text-gradient">A scrapbook of you</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Tap any frame to add a photo. Your images stay private — saved right in your
              browser. Captions are yours to write.
            </p>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="font-script text-3xl text-gradient">with all my love</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Happy Birthday · 26 May 2006
        </p>
      </footer>
    </main>
  );
}
