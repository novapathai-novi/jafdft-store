import Link from "next/link";

const navLinks = [
  { label: "Shop", href: "/collections/all" },
  { label: "Flagship Series", href: "/collections/all" },
  { label: "Legacy Series", href: "/collections/all" },
  { label: "Our Story", href: "/our-story" },
  { label: "Papa Charlie", href: "/papa-charlie" },
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left — Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Tagline + socials */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <p className="font-body italic text-sm text-white/40 leading-relaxed">
              Just A Father Doing Fatherly Things. Est. MMXVIII.
            </p>
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Large wordmark */}
        <div className="text-center mb-8 overflow-hidden">
          <span
            className="font-display text-[#1a1a1a] leading-none block select-none"
            style={{ fontSize: "clamp(80px, 16vw, 180px)" }}
          >
            JAFDFT
          </span>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            &copy; 2026 JAFDFT &middot; Designed by Papa Charlie
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            Drop 001 &middot; 125 Hats &middot; Each One Numbered
          </p>
        </div>
      </div>
    </footer>
  );
}
