"use client";

import { useEffect, useState, lazy, Suspense } from "react";

const GoogleAnalytics = lazy(() =>
  import("./GoogleAnalytics").then((m) => ({ default: m.GoogleAnalytics }))
);
const MetaPixel = lazy(() =>
  import("./MetaPixel").then((m) => ({ default: m.MetaPixel }))
);
const GoogleMerchantWidget = lazy(() =>
  import("./GoogleMerchantWidget").then((m) => ({
    default: m.GoogleMerchantWidget,
  }))
);

interface AnalyticsScriptsProps {
  gaId?: string;
  pixelId?: string;
}

export function AnalyticsScripts({ gaId, pixelId }: AnalyticsScriptsProps) {
  const STORAGE_KEY = "__liss_cookie_consent__";
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem(STORAGE_KEY);
        setHasConsent(consent === "accepted");
      } catch {
        setHasConsent(false);
      }
    };

    checkConsent();

    const handleConsentUpdate = () => {
      checkConsent();
    };

    window.addEventListener("liss_cookie_consent_updated", handleConsentUpdate);
    return () => {
      window.removeEventListener(
        "liss_cookie_consent_updated",
        handleConsentUpdate
      );
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <Suspense fallback={null}>
      <GoogleAnalytics gaId={gaId} />
      <MetaPixel pixelId={pixelId} />
      <GoogleMerchantWidget
        merchantId={5773588467}
        position="BOTTOM_RIGHT"
        region="SV"
      />
    </Suspense>
  );
}
