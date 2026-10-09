interface FloatingHeartsProps {
  variant?: "drift" | "burst";
  count?: number;
}

export function FloatingHearts({ variant = "drift", count = 12 }: FloatingHeartsProps) {
  return (
    <div className={`hearts hearts-${variant}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="heart" />
      ))}
    </div>
  );
}
