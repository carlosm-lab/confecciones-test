"use client";

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

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Wrapper — contiene los anillos de pulso y el botón */}
      <div className="relative flex items-center justify-center">
        {/* Anillo expansivo 1 — pulso rápido */}
        {isActive && (
          <span
            className="bell-ring-1 pointer-events-none absolute size-10 rounded-full"
            aria-hidden="true"
          />
        )}
        {/* Anillo expansivo 2 — pulso con delay */}
        {isActive && (
          <span
            className="bell-ring-2 pointer-events-none absolute size-10 rounded-full"
            aria-hidden="true"
          />
        )}

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
            "relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors",
            isActive
              ? "border-red-400 bg-red-50 text-red-600 shadow-[0_0_0_2px_rgba(239,68,68,0.2),0_2px_10px_rgba(239,68,68,0.3)]"
              : "border-primary/10 text-primary bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12)] hover:-translate-y-0.5"
          )}
        >
          <span
            className={cn(
              "material-symbols-outlined text-[22px]",
              isActive && "bell-icon-wiggle"
            )}
            aria-hidden="true"
            style={{
              fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            notifications
          </span>

          {/* Badge rojo */}
          {isActive && (
            <span className="absolute -top-1.5 -right-1.5 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white ring-2 ring-white">
              1
            </span>
          )}
        </button>
      </div>

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
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[18px] text-red-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  notifications
                </span>
                <p className="text-sm font-semibold text-gray-800">
                  Tienes favoritos guardados
                </p>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">
                Para sincronizar y guardar tus favoritos en todos tus
                dispositivos, inicia sesión o crea una cuenta gratuita.
              </p>
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
