const COLORS = ["#f9a8d4", "#fbbf24", "#fb7185", "#fde68a", "#f472b6", "#fcd34d"];

export function Confetti() {
  const pieces = Array.from({ length: 60 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 4;
        const color = COLORS[i % COLORS.length];
        const size = 6 + Math.random() * 8;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "-10vh",
              width: size,
              height: size * 1.6,
              background: color,
              animation: `fall ${duration}s linear ${delay}s infinite`,
              borderRadius: "2px",
            }}
          />
        );
      })}
    </div>
  );
}
