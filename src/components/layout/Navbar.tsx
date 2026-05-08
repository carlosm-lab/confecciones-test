"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [{ href: "/catalogo", label: "Catálogo" }];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="text-primary sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-[2px] md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Confecciones Liss Logo"
            width={180}
            height={180}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:bg-primary/5 hover:text-primary rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Buscar productos"
            className="hidden transition-opacity hover:opacity-80 md:block"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            className="flex items-center md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          className="border-t border-gray-100 bg-white px-5 py-4 md:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="space-y-1">
            <li>
              <Link
                href="/catalogo"
                onClick={() => setIsMenuOpen(false)}
                className="text-primary flex items-center gap-2 rounded-md px-3 py-3 text-sm font-semibold"
              >
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  storefront
                </span>
                Catálogo
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
