"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface HeroImageCarouselProps {
  sizes: string;
  priority?: boolean;
}

const IMAGES = [
  "/images/uniformes/portada.webp",
  "/images/uniformes/001.png",
  "/images/uniformes/002.png",
  "/images/uniformes/003.png",
  "/images/uniformes/004.png",
  "/images/uniformes/005.png",
];

const INTERVAL_MS = 2000;

export function HeroImageCarousel({
  sizes,
  priority = false,
}: HeroImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex((idx + IMAGES.length) % IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative h-full w-full">
      {/* ── Imágenes ────────────────────────────────── */}
      {IMAGES.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={src}
            fill
            alt="Scrubs médicos a la medida confeccionados en San Miguel El Salvador por Confecciones Liss"
            className="rounded-xl object-cover object-center"
            sizes={sizes}
            priority={priority || idx === 0}
          />
        </div>
      ))}

      {/* ── Flecha Izquierda ────────────────────────── */}
      <button
        onClick={goPrev}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Imagen anterior"
        className="absolute top-1/2 left-2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition hover:scale-110 hover:bg-white active:scale-95"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-gray-700"
        >
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Flecha Derecha ──────────────────────────── */}
      <button
        onClick={goNext}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Imagen siguiente"
        className="absolute top-1/2 right-2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition hover:scale-110 hover:bg-white active:scale-95"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-gray-700"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Indicadores de puntos + línea activa ────── */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label={`Ir a imagen ${idx + 1}`}
            className={`block rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "h-1.5 w-6 bg-white shadow-sm"
                : "h-1.5 w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
