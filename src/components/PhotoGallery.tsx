import { useEffect, useRef, useState } from "react";
import { Upload, X, ImagePlus } from "lucide-react";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";

interface Photo {
  id: string;
  url: string;
  caption: string;
}

const STORAGE_KEY = "birthday-photos-v1";

const DEFAULTS: Photo[] = [
  { id: "p1", url: gallery1, caption: "A gorgeous reflection ✨" },
  { id: "p2", url: gallery2, caption: "Saree days are the best days 🌸" },
  { id: "p3", url: gallery3, caption: "Posing with love ❤️" },
  { id: "p4", url: gallery4, caption: "Together is my favorite place 🌿" },
  { id: "p5", url: gallery5, caption: "Creating beautiful memories together 💫" },
  { id: "p6", url: "", caption: "Tap to add another special moment..." },
];

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>(DEFAULTS);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Photo[];
        // Merge saved data with DEFAULTS. If the saved photo has a base64 custom url (starts with "data:"), keep it.
        // Otherwise, use our preloaded template default.
        setPhotos(
          DEFAULTS.map((def) => {
            const matchingSaved = parsed.find((p) => p.id === def.id);
            if (matchingSaved && matchingSaved.url.startsWith("data:")) {
              return matchingSaved;
            }
            return def;
          })
        );
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(photos)); } catch {}
  }, [photos]);

  const handleFile = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, url } : p)));
    };
    reader.readAsDataURL(file);
  };

  const clear = (id: string) =>
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, url: "" } : p)));

  const updateCaption = (id: string, caption: string) =>
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)));

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {photos.map((p, i) => (
        <div
          key={p.id}
          className={`group relative overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur-xl shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow ${
            i % 3 === 1 ? "md:translate-y-8" : ""
          }`}
        >
          <div className="aspect-[3/4] w-full">
            {p.url ? (
              <img src={p.url} alt={p.caption} className="h-full w-full object-cover" />
            ) : (
              <button
                onClick={() => fileInputs.current[p.id]?.click()}
                className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary/30 to-muted/30 text-muted-foreground transition-colors hover:text-accent"
              >
                <ImagePlus className="size-10" />
                <span className="text-sm">Tap to add photo</span>
              </button>
            )}
          </div>

          <input
            ref={(el) => { fileInputs.current[p.id] = el; }}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(p.id, f);
              e.target.value = "";
            }}
          />

          {p.url && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => fileInputs.current[p.id]?.click()}
                  className="rounded-full bg-background/80 p-2 backdrop-blur hover:bg-accent hover:text-accent-foreground"
                  aria-label="Replace"
                >
                  <Upload className="size-4" />
                </button>
                <button
                  onClick={() => clear(p.id)}
                  className="rounded-full bg-background/80 p-2 backdrop-blur hover:bg-destructive hover:text-destructive-foreground"
                  aria-label="Remove"
                >
                  <X className="size-4" />
                </button>
              </div>
            </>
          )}

          <input
            value={p.caption}
            onChange={(e) => updateCaption(p.id, e.target.value)}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent px-4 py-3 text-center font-script text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Caption..."
          />
        </div>
      ))}
    </div>
  );
}
