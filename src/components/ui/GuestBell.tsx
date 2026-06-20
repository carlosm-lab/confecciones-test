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
      {/* Bell button */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={
          isActive
            ? "Tienes 1 notificación sin leer"
            : "Centro de notificaciones"
        }
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "relative flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all",
          isActive
            ? "border-blue-200 bg-blue-50 text-blue-600 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.25),0_1px_4px_-1px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-2px_rgba(59,130,246,0.35)]"
            : "border-primary/10 text-primary bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
        )}
      >
        {/* Anillo de pulso ping — solo cuando hay notificación */}
        {isActive && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-blue-400/30"
            aria-hidden="true"
          />
        )}

        <span
          className="material-symbols-outlined relative z-10 text-[22px]"
          aria-hidden="true"
          style={{
            fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          notifications
        </span>

        {/* Badge de cantidad */}
        {isActive && (
          <span
            className="absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] animate-[bounceIn_0.3s_ease-out] items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-black tracking-tight text-white ring-2 ring-white"
            aria-hidden="true"
          >
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
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[18px] text-blue-600"
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
                className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold tracking-wide text-white transition hover:opacity-90 active:scale-[0.98]"
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  aria-hidden="true"
                >
                  login
                </span>
                Iniciar sesión · Sincronizar entre dispositivos
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
