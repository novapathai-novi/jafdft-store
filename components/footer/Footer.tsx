import Link from "next/link";

const navigation = [
  { label: "Shop", href: "/collections/all" },
  { label: "Our Story", href: "/our-story" },
];

const info = [
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white/70">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        {/* Top row — three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-14 mb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Column 1 — Brand */}
          <div className="flex flex-col">
            <Link href="/" className="font-display text-2xl tracking-wide text-[#F2EDE4] mb-5 inline-block">
              JAFDFT
            </Link>
            <p className="font-editorial italic text-sm text-white/50 leading-relaxed mb-8 max-w-[260px]">
              Just A Father Doing Fatherly Things. Est. MMXVIII.
            </p>
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-[#C8905A] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-white/50 hover:text-[#C8905A] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="text-white/50 hover:text-[#C8905A] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C8905A] mb-5">
                Explore
              </p>
              <ul className="flex flex-col gap-3">
                {navigation.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-[#F2EDE4] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C8905A] mb-5">
                Support
              </p>
              <ul className="flex flex-col gap-3">
                {info.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 hover:text-[#F2EDE4] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 — Drop preview */}
          <div className="flex flex-col md:items-end md:text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C8905A] mb-5">
              Up Next
            </p>
            <h3 className="font-display text-3xl tracking-wide text-[#F2EDE4] leading-none mb-3">
              Drop 002
            </h3>
            <p className="font-editorial italic text-sm text-white/60 leading-relaxed mb-4 max-w-[260px]">
              More drops coming. Summer 2026.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Limited. Numbered. Intentional.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            &copy; 2026 JAFDFT &middot; By Fathers, For Fathers
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            Drop 001 &middot; 125 Hats &middot; Each One Numbered
          </p>
        </div>
      </div>
    </footer>
  );
}
