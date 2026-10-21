"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ServiceImageProps {
  src: string;
  alt: string;
}

export function ServiceImage({ src, alt }: ServiceImageProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isIntersecting) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsIntersecting(true), 150);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isIntersecting]);

  return (
    <div
      ref={containerRef}
      className="bg-primary/5 relative h-44 w-full sm:h-48"
    >
      {isIntersecting ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <div className="bg-primary/5 h-full w-full" />
      )}
    </div>
  );
}
