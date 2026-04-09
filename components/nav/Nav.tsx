"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

const navLinks = [
  { label: "Shop", href: "/collections/all" },
  { label: "Our Story", href: "/our-story" },
  { label: "Papa Charli", href: "/papa-charlie" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAF7F2]/90 border-b border-border">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Wordmark */}
        <Link href="/" className="font-display text-2xl tracking-wide text-foreground">
          JAFDFT
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Cart + Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Cart link */}
          <Link
            href="/cart"
            aria-label="Open cart"
            className="relative font-mono text-xs uppercase tracking-widest text-text-muted hover:text-foreground transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C8905A] text-[#0A0A0A] text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-[#FAF7F2]/95 backdrop-blur-md">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-sm uppercase tracking-widest text-text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
