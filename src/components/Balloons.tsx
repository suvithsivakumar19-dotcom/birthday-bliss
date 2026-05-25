const COLORS = ["#f9a8d4", "#fbbf24", "#fb7185", "#a78bfa", "#60a5fa", "#fcd34d"];

export function Balloons() {
  const pieces = Array.from({ length: 12 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = (i * 83) % 100;
        const delay = (i * 1.3) % 8;
        const duration = 12 + (i % 5) * 2;
        const color = COLORS[i % COLORS.length];
        const size = 32 + (i % 4) * 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: "-20vh",
              animation: `rise ${duration}s linear ${delay}s infinite`,
            }}
          >
            <div
              style={{
                width: size,
                height: size * 1.2,
                background: color,
                borderRadius: "50%",
                boxShadow: `inset -6px -10px 18px rgba(0,0,0,0.18), 0 0 24px ${color}55`,
                opacity: 0.7,
              }}
            />
            <div
              style={{
                width: 1,
                height: 60,
                margin: "0 auto",
                background: "rgba(255,255,255,0.3)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
