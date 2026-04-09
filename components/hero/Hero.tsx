"use client";

import Link from "next/link";

const marqueeText =
  "JUST A FATHER DOING FATHERLY THINGS \u00B7 DESIGNED BY PAPA CHARLIE \u00B7 DROP 001 \u00B7 125 HATS \u00B7 EST MMXVIII \u00B7 LIMITED EDITION \u00B7 ";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Layer 1: Hero background image with Ken Burns slow zoom */}
      <div
        className="absolute inset-0 z-0 hero-image"
        style={{
          backgroundImage: "url('/images/lifestyle/hero-model.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          animation: "slowZoom 20s ease-in-out infinite",
        }}
      />

      {/* Layer 2: Warm cognac edge glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(200,144,90,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Layer 3: Dark vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.3) 100%)",
        }}
      />

      {/* Layer 4: Film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Top label */}
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8905A] mb-8 sm:mb-12">
          Limited Edition &middot; Drop 001 &middot; 125 Hats &middot; Each One Numbered
        </p>

        {/* Main headline */}
        <h1
          className="font-display leading-[0.9] text-[#F2EDE4]"
          style={{ fontSize: "clamp(72px, 15vw, 140px)" }}
        >
          <span className="block">For Fathers</span>
          <span className="block">Who Are Locked In.</span>
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
