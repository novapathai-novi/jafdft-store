"use client";

import Link from "next/link";

const marqueeText =
  "JUST A FATHER DOING FATHERLY THINGS \u00B7 DESIGNED BY PAPA CHARLIE \u00B7 DROP 001 \u00B7 125 HATS \u00B7 EST MMXVIII \u00B7 LIMITED EDITION \u00B7 ";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Diagonal grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.03) 40px,
              rgba(255,255,255,0.03) 41px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.03) 40px,
              rgba(255,255,255,0.03) 41px
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Top label */}
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-8 sm:mb-12">
          Limited Edition &middot; Drop 001 &middot; 125 Hats &middot; Each One Numbered
        </p>

        {/* Main headline */}
        <h1
          className="font-display leading-[0.9] text-[#F2EDE4]"
          style={{ fontSize: "clamp(72px, 15vw, 140px)" }}
        >
          <span className="block">The Standard</span>
          <span className="block">Is Here.</span>
        </h1>

        {/* Subline */}
        <p className="mt-6 sm:mt-8 font-editorial italic text-lg sm:text-xl text-[#C8905A] max-w-md">
          Just A Father Doing Fatherly Things. Est. MMXVIII.
        </p>

        {/* Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/collections/all"
            className="px-8 py-3.5 bg-[#C8905A] text-[#0A0A0A] font-mono text-xs uppercase tracking-widest hover:bg-[#d9a06a] transition-colors"
          >
            Shop Drop 001
          </Link>
          <Link
            href="/our-story"
            className="px-8 py-3.5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/50 transition-colors"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#C8905A]">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0A0A0A] mx-0"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
