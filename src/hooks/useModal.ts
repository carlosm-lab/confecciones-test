"use client";
import { useRef, useEffect } from "react";

interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Hook genérico para modales. Maneja:
 * - Tecla ESC para cerrar
 * - Ref del contenedor del modal
 */
export function useModal({ isOpen, onClose }: UseModalOptions) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return { modalRef };
}
