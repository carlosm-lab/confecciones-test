"use client";

import { useState } from "react";
import LegalHubBackground from "@/components/legal/LegalHubBackground";

/**
 * Client-side wrapper for LegalHubBackground.
 *
 * Uses a useState lazy initializer to read the "liss_legal_return" flag from
 * sessionStorage WITHOUT a useEffect (avoids react-hooks/set-state-in-effect).
 *
 * Why this is safe:
 *  · On hard reload / direct URL: SSR renders with animated=true (window is
 *    undefined on the server). React hydration reuses that state — no
 *    re-initialization, no mismatch. Hub animates correctly. ✓
 *  · On client-side navigation (router.push("/legal") from article): the
 *    component mounts fresh on the client only — no SSR, no hydration.
 *    The lazy initializer runs, reads sessionStorage, returns false, and the
 *    hub renders instantly without animations. ✓
 *
 * The flag is written by LegalArticleReader.handleClose() just before
 * calling router.push("/legal").
 */
export default function LegalHubClient() {
  const [animated] = useState<boolean>(() => {
    /* Guard: on the server window is undefined — always animate */
    if (typeof window === "undefined") return true;
    try {
      if (sessionStorage.getItem("liss_legal_return")) {
        sessionStorage.removeItem("liss_legal_return");
        return false; /* returning from article → skip animations */
      }
    } catch {
      /* sessionStorage unavailable (private mode edge case) */
    }
    return true;
  });

  return <LegalHubBackground animated={animated} />;
}
