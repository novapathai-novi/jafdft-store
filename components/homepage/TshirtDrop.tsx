"use client";

import { useEffect, useState } from "react";

// ─── Countdown logic ─────────────────────────────────────────────────────────

const TARGET = new Date("2026-06-20T00:00:00").getTime();

function getTimeLeft() {
  const diff = Math.max(TARGET - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const marqueeText =
  "SUMMER 2026 \u2014 NEXT DROP \u2014 JAFDFT APPAREL \u2014 COMING SOON \u2014 GET ACCESS FIRST \u2014 ";

const stats = [
  { label: "Drop Date", value: "Summer 2026" },
  { label: "Collection", value: "JAFDFT Apparel" },
  { label: "Access", value: "Waitlist Only" },
  { label: "Designed by", value: "JAFDFT" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function TshirtDrop() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const countdownBlocks: { value: string; label: string }[] = [
    { value: pad(time.days), label: "Days" },
    { value: pad(time.hours), label: "Hours" },
    { value: pad(time.mins), label: "Mins" },
    { value: pad(time.secs), label: "Secs" },
  ];

  return (
    <>
      {/* Marquee band */}
      <div className="overflow-hidden bg-[#C8905A] py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0A0A0A]"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Main section */}
      <section className="relative bg-[#0A0A0A] overflow-hidden">
        {/* Diagonal grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg, transparent, transparent 40px,
                rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px
              ),
              repeating-linear-gradient(
                -45deg, transparent, transparent 40px,
                rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px
              )
            `,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* ─── LEFT COLUMN ─── */}
            <div className="flex flex-col">
              {/* Tag */}
              <div className="flex items-center gap-2.5 mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8905A] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C8905A]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C8905A]">
                  Drop Incoming
                </span>
              </div>

              {/* Headline */}
              <h2
                className="font-display text-[#F2EDE4] leading-[0.95] mb-5"
                style={{ fontSize: "clamp(48px, 8vw, 80px)" }}
              >
                The Standard Tee.
              </h2>

              {/* Subline */}
              <p className="font-editorial italic text-lg sm:text-xl text-[#C8905A] max-w-md mb-10">
                The hat started it. The tee carries it forward. Summer 2026.
              </p>

              {/* Countdown */}
              <div className="flex gap-4 sm:gap-6 mb-10">
                {countdownBlocks.map((block) => (
                  <div key={block.label} className="flex flex-col items-center">
                    <span className="font-display text-4xl sm:text-5xl text-[#F2EDE4] leading-none">
                      {block.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 mt-2">
                      {block.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Email capture */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 mb-4 max-w-md"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-white/25 outline-none focus:border-[#C8905A]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#C8905A] text-[#0A0A0A] font-mono text-xs uppercase tracking-widest hover:bg-[#d9a06a] transition-colors whitespace-nowrap"
                >
                  Get Early Access
                </button>
              </form>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 mb-12">
                Founder approved &middot; No spam &middot; Drop access only
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/5 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25 mb-1.5">
                      {stat.label}
                    </p>
                    <p className="font-mono text-sm text-[#F2EDE4]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT COLUMN ─── */}
            <div className="relative flex flex-col items-center justify-center min-h-[500px] lg:min-h-[600px]">
              {/* Cognac glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at center, rgba(200,144,90,0.25) 0%, transparent 70%)" }} />

              {/* ? watermark */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[300px] text-white/[0.04] select-none pointer-events-none leading-none">
                ?
              </span>

              {/* T-shirt SVG with JAFDFT circle logo */}
              <div className="relative z-10 w-full max-w-[320px] mb-10">
                <svg
                  viewBox="0 0 300 340"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                >
                  {/* Shirt body — charcoal fill */}
                  <path
                    d="M75 40 L30 80 L60 110 L80 90 L80 300 L220 300 L220 90 L240 110 L270 80 L225 40 L195 60 C185 70 165 76 150 76 C135 76 115 70 105 60 L75 40Z"
                    fill="#2D2D2D"
                    stroke="rgba(255,255,255,0.20)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  {/* Collar */}
                  <path
                    d="M105 60 C115 70 135 76 150 76 C165 76 185 70 195 60"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* ─── JAFDFT Circle Logo on chest ─── */}
                  {/* Outer circle border */}
                  <circle
                    cx="150"
                    cy="165"
                    r="48"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.75"
                  />
                  {/* Inner circle border */}
                  <circle
                    cx="150"
                    cy="165"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="0.5"
                  />

                  {/* Circular text path */}
                  <defs>
                    <path
                      id="chest-circle"
                      d="M 150,165 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    fill="rgba(255,255,255,0.9)"
                    style={{
                      fontSize: "6.5px",
                      letterSpacing: "0.18em",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  >
                    <textPath href="#chest-circle" startOffset="0%">
                      JUST A FATHER DOING FATHERLY THINGS &middot; EST MMXVIII &middot;
                    </textPath>
                  </text>

                  {/* Center JAFDFT text */}
                  <text
                    x="150"
                    y="162"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.9)"
                    style={{
                      fontFamily: "var(--font-bebas-neue)",
                      fontSize: "18px",
                      letterSpacing: "0.2em",
                    }}
                  >
                    JAFDFT
                  </text>
                  {/* Small EST line */}
                  <text
                    x="150"
                    y="176"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: "5px",
                      letterSpacing: "0.3em",
                    }}
                  >
                    EST MMXVIII
                  </text>
                </svg>
              </div>

              {/* Redacted product name */}
              <div className="relative z-10 text-center">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/20 line-through decoration-white/15 mb-3">
                  The Standard Tee &mdash; S / M / L / XL / XXL
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 max-w-[280px] leading-relaxed">
                  Details drop with the collection &middot; Summer 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
