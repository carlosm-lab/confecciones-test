"use client";

/**
 * GuestBell
 * ─────────────────────────────────────────────────────────────
 * Campana de notificaciones visible SOLO para usuarios guest.
 *
 * Estados:
 * - Inactiva: ícono estático sin badge, sin animación
 * - Activa: pulso continuo + badge "1" + panel al hacer clic
 *
 * Panel activo muestra:
 * - Mensaje de sincronización
 * - Botón "Iniciar sesión"
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from "react";
import { useGuestNotification } from "@/context/GuestNotificationContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function GuestBell() {
  const { isActive } = useGuestNotification();
  const { showAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Cerrar panel al hacer clic fuera
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLoginClick = () => {
    setIsOpen(false);
    showAuthModal("generic");
  };

  // Evitar hidratación mismatch
  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={
          isActive
            ? "Notificaciones — tienes favoritos guardados"
            : "Notificaciones"
        }
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]",
          isActive && "bell-active"
        )}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          aria-hidden="true"
          style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
        >
          notifications
        </span>

        {/* Badge — solo visible cuando activa */}
        {isActive && (
          <span className="bg-tertiary absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black text-white ring-2 ring-white">
            1
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Panel de notificaciones"
          className="border-primary/10 animate-in fade-in slide-in-from-top-2 absolute top-12 right-0 z-50 w-72 rounded-2xl border bg-white/95 p-4 shadow-[0_10px_25px_-5px_rgba(20,48,103,0.15),0_8px_16px_-6px_rgba(20,48,103,0.1)] backdrop-blur-md duration-200"
        >
          {isActive ? (
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  notifications
                </span>
                <p className="text-sm font-semibold text-gray-800">
                  Tienes favoritos guardados
                </p>
              </div>

              {/* Message */}
              <p className="text-xs leading-relaxed text-gray-500">
                Para sincronizar y guardar tus favoritos en todos tus
                dispositivos, inicia sesión o crea una cuenta gratuita.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={handleLoginClick}
                className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  aria-hidden="true"
                >
                  login
                </span>
                Iniciar sesión
              </button>
            </div>
          ) : (
            <p className="py-2 text-center text-sm text-gray-400">
              Sin notificaciones nuevas
            </p>
          )}
        </div>
      )}
    </div>
  );
}
