"use client";

/**
 * GuestNotificationContext
 * ─────────────────────────────────────────────────────────────
 * Maneja el estado de la campana de notificaciones para usuarios
 * guest (no autenticados).
 *
 * LÓGICA:
 * - Se activa cuando un guest agrega un artículo a favoritos
 * - Persiste en localStorage para sobrevivir recargas de página
 * - Se desactiva silenciosamente cuando el usuario inicia sesión
 * - Usuarios autenticados nunca ven la campana activa
 * ─────────────────────────────────────────────────────────────
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const STORAGE_KEY = "liss_guest_notification_active";

interface GuestNotificationContextValue {
  /** Si la campana debe mostrarse activa (con pulso y badge) */
  isActive: boolean;
  /** Activa la campana — llamado cuando un guest agrega un favorito */
  activate: () => void;
  /** Desactiva la campana — llamado al iniciar sesión */
  dismiss: () => void;
}

const GuestNotificationContext = createContext<
  GuestNotificationContextValue | undefined
>(undefined);

export function useGuestNotification(): GuestNotificationContextValue {
  const ctx = useContext(GuestNotificationContext);
  if (!ctx) {
    throw new Error(
      "useGuestNotification must be used within GuestNotificationProvider"
    );
  }
  return ctx;
}

export function GuestNotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);

  // Restaurar estado desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "1") setIsActive(true);
    } catch (_) {}
  }, []);

  const activate = useCallback(() => {
    setIsActive(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
  }, []);

  const dismiss = useCallback(() => {
    setIsActive(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }, []);

  return (
    <GuestNotificationContext.Provider value={{ isActive, activate, dismiss }}>
      {children}
    </GuestNotificationContext.Provider>
  );
}
