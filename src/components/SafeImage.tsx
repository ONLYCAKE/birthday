import { useState } from "react";

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}

export function SafeImage({ src, alt, className, priority = false, objectPosition }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`photo-fallback ${className ?? ""}`} role="img" aria-label={alt}>
        <span>D & N</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}
