"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LegalArticleReaderProps {
  title: string;
  category?: string;
  date: string;
  readingTime: number;
  children: React.ReactNode;
}

export default function LegalArticleReader({
  title,
  category = "DOCUMENTOS LEGALES",
  date,
  readingTime,
  children,
}: LegalArticleReaderProps) {
  const router = useRouter();

  // ESC key handler — backdrop click is handled inline
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/legal");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const handleClose = () => {
    router.push("/legal");
  };

  return (
    /* Overlay — covers everything including navbar, z-[9999]            */
    /* overflow-hidden on the backdrop naturally prevents background scroll */
    <div
      role="button"
      tabIndex={-1}
      aria-label="Cerrar documento y volver a la lista"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "rgba(10, 17, 40, 0.93)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
    >
      {/* Paper sheet — scrollable, isolated from backdrop */}
      <div
        role="article"
        className="relative mx-3 w-full bg-white sm:mx-6"
        style={{
          maxWidth: 850,
          maxHeight: "92vh",
          overflowY: "auto",
          overflowX: "hidden",
          overscrollBehavior:
            "contain" /* prevents scroll leaking to backdrop */,
          borderRadius: 4,
          boxShadow: "0 25px 60px -12px rgba(0,0,0,0.55)",
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 transparent",
          padding: "20px 40px",
        }}
      >
        {/* Close button — sticky top right */}
        <button
          onClick={handleClose}
          aria-label="Cerrar y volver a documentos legales"
          className="sticky top-2.5 z-10 float-right -mt-3 -mr-8 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all duration-300 hover:rotate-90 hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-red-100 sm:-mr-10"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Article header */}
        <header className="mb-8 border-b border-slate-200 pt-3 pb-6 text-center">
          {/* Category badge */}
          <span className="mb-3 inline-block rounded-md bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase">
            {category}
          </span>

          {/* Title */}
          <h1
            className="mb-4 text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-center gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {readingTime} min lectura
            </span>
          </div>
        </header>

        {/* Article content */}
        <div
          className="space-y-6 text-slate-600"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.75,
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          {children}
        </div>

        {/* Footer nav */}
        <footer className="mt-12 border-t border-slate-100 pt-6 text-center">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver a documentos legales
          </Link>
        </footer>
      </div>
    </div>
  );
}
