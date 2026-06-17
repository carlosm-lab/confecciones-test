"use client";
import { useState, useEffect } from "react";

/**
 * Retarda la actualización de un valor hasta que hayan pasado
 * `delay` milisegundos sin que cambie. Útil para búsquedas.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
