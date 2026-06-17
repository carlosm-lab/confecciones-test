// ──────────────────────────────────────────────────────────────
// LOGGER DE DESARROLLO
// ──────────────────────────────────────────────────────────────
// Solo loguea en desarrollo. En producción silencia todo.
// ──────────────────────────────────────────────────────────────

const isDev = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log("[liss]", ...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn("[liss:warn]", ...args);
  },
  error: (...args: unknown[]) => {
    if (isDev) console.error("[liss:error]", ...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info("[liss:info]", ...args);
  },
};
