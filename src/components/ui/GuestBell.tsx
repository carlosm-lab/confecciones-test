"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  useNotifications,
  type AppNotification,
} from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// ── Helpers ────────────────────────────────────────────────────

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (diff < 60_000) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${days} día${days > 1 ? "s" : ""}`;
}

type IconConfig = {
  icon: string;
  iconColor: string;
  iconBg: string;
  iconRing: string;
  dotColor: string;
};

const NOTIF_CONFIG: Record<AppNotification["type"], IconConfig> = {
  push_permission: {
    icon: "notifications_active",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconRing: "ring-violet-200",
    dotColor: "bg-violet-500",
  },
  favorites_hint: {
    icon: "favorite",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
    iconRing: "ring-pink-200",
    dotColor: "bg-pink-500",
  },
  cart_hint: {
    icon: "shopping_cart",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconRing: "ring-blue-200",
    dotColor: "bg-blue-500",
  },
  auth_hint: {
    icon: "person",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-50",
    iconRing: "ring-slate-200",
    dotColor: "bg-slate-500",
  },
  new_product: {
    icon: "new_releases",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconRing: "ring-emerald-200",
    dotColor: "bg-emerald-500",
  },
  new_offer: {
    icon: "local_offer",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconRing: "ring-amber-200",
    dotColor: "bg-amber-500",
  },
  manual: {
    icon: "campaign",
    iconColor: "text-primary",
    iconBg: "bg-primary/5",
    iconRing: "ring-primary/20",
    dotColor: "bg-primary",
  },
  info: {
    icon: "info",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    iconRing: "ring-sky-200",
    dotColor: "bg-sky-500",
  },
};

// ── NotificationBell ───────────────────────────────────────────

export function GuestBell() {
  const {
    notifications,
    unreadCount,
    markRead,
    markAllHintsRead,
    pushPermissionStatus,
    subscribeToPush,
    pushPromptDismissed,
  } = useNotifications();
  const { showAuthModal } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Cerrar con click fuera
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Tipos que solo se marcan como leídos en acciones específicas (login, ver oferta)
  const HINT_TYPES: AppNotification["type"][] = [
    "push_permission",
    "favorites_hint",
    "cart_hint",
    "auth_hint",
  ];

  const handleNotifClick = (notif: AppNotification) => {
    const isHint = HINT_TYPES.includes(notif.type);
    // Las hints solo se marcan leídas al hacer login, no al hacer click
    if (!isHint && !notif.read) markRead(notif.id);
    if (notif.target_url) {
      router.push(notif.target_url);
      setIsOpen(false);
    }
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    showAuthModal("generic");
  };

  const handleSubscribePush = async () => {
    setIsSubscribing(true);
    await subscribeToPush();
    setIsSubscribing(false);
  };

  if (!mounted) return null;

  const isActive = unreadCount > 0;

  // ── Notificaciones filtradas (sin tipos que no aplican si logueado) ──
  const visibleNotifs = notifications;

  // ── Mostrar footer de auth solo si hay hint no leída ──────────
  const hasAuthHint = notifications.some(
    (n) =>
      (n.type === "cart_hint" ||
        n.type === "favorites_hint" ||
        n.type === "auth_hint") &&
      !n.read
  );

  // ── Mostrar CTA de push si hay push_permission no leída ───────
  const hasPushHint = notifications.some(
    (n) => n.type === "push_permission" && !n.read
  );

  // ── Modal via Portal ───────────────────────────────────────────
  const modal = isOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-start justify-end"
          role="dialog"
          aria-label="Centro de notificaciones"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className={cn(
              "relative z-10 mt-14 mr-4 flex w-full max-w-[360px] flex-col",
              "rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.22),0_8px_32px_-8px_rgba(0,0,0,0.12)]",
              "animate-in fade-in slide-in-from-top-3 duration-200",
              "overflow-hidden"
            )}
            style={{ maxHeight: "min(600px, calc(100vh - 80px))" }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  aria-hidden="true"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  notifications
                </span>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Notificaciones
                  </h2>
                  {unreadCount > 0 && (
                    <p className="text-[11px] text-slate-400">
                      {unreadCount} sin leer
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Cerrar notificaciones"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-hidden overflow-y-auto overscroll-contain">
              {visibleNotifs.length === 0 ? (
                <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <span
                      className="material-symbols-outlined text-[28px] text-slate-400"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      notifications_none
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-700">
                      Sin notificaciones
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Te avisaremos cuando haya nuevos productos, ofertas o
                      actualizaciones.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {visibleNotifs.map((notif) => {
                    const cfg = NOTIF_CONFIG[notif.type] ?? NOTIF_CONFIG.info;
                    return (
                      <li key={notif.id}>
                        <button
                          type="button"
                          onClick={() => handleNotifClick(notif)}
                          className={cn(
                            "relative w-full px-5 py-4 text-left transition-colors hover:bg-slate-50/80",
                            !notif.read && "bg-blue-50/40"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Ícono */}
                            <div
                              className={cn(
                                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
                                cfg.iconBg,
                                cfg.iconRing
                              )}
                            >
                              <span
                                className={cn(
                                  "material-symbols-outlined text-[18px]",
                                  cfg.iconColor
                                )}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                                aria-hidden="true"
                              >
                                {cfg.icon}
                              </span>
                            </div>

                            {/* Contenido */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p
                                  className={cn(
                                    "text-xs leading-snug font-semibold",
                                    notif.read
                                      ? "text-slate-500"
                                      : "text-slate-900"
                                  )}
                                >
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <span
                                    className={cn(
                                      "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                                      cfg.dotColor
                                    )}
                                    aria-label="No leído"
                                  />
                                )}
                              </div>
                              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                                {notif.message}
                              </p>
                              <p className="mt-1.5 text-[10px] font-medium text-slate-300">
                                {timeAgo(notif.created_at)}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer — Web Push CTA */}
            {hasPushHint &&
              pushPermissionStatus !== "granted" &&
              pushPermissionStatus !== "denied" && (
                <div className="shrink-0 border-t border-slate-100 p-3">
                  <button
                    onClick={handleSubscribePush}
                    disabled={isSubscribing}
                    className="btn-gradient flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      aria-hidden="true"
                    >
                      {isSubscribing
                        ? "hourglass_empty"
                        : "notifications_active"}
                    </span>
                    {isSubscribing
                      ? "Activando..."
                      : "Activar alertas exclusivas"}
                  </button>
                </div>
              )}

            {/* Footer — Login CTA para hints de carrito/favoritos */}
            {hasAuthHint && !hasPushHint && (
              <div className="shrink-0 border-t border-slate-100 p-3">
                <button
                  onClick={handleLoginClick}
                  className="btn-gradient flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]"
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
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* ── Trigger ───────────────────────────────────────────── */}
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
            : "Centro de notificaciones"
        }
        onClick={handleOpen}
        className="border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
      >
        {/* Pulso */}
        {isActive && (
          <span
            className="bg-primary/20 absolute inset-0 animate-ping rounded-full"
            aria-hidden="true"
          />
        )}

        <span
          className="material-symbols-outlined relative z-10 text-[22px]"
          aria-hidden="true"
          style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
        >
          notifications
        </span>

        {/* Badge */}
        {isActive && (
          <span
            className="bg-primary absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] animate-[bounceIn_0.3s_ease-out] items-center justify-center rounded-full px-1 text-[9px] font-black tracking-tight text-white ring-2 ring-white"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {modal}
    </>
  );
}
