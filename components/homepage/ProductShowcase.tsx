"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const hats = [
  {
    name: "The Standard",
    handle: "the-standard",
    series: "Flagship Series",
    colorway: "All Black",
    swatches: ["#0A0A0A"],
    image: "/images/products/the-standard/the-standard-front.png",
    quote: "The one that started it all. No flash. Just standard.",
  },
  {
    name: "The Sideline",
    handle: "the-sideline",
    series: "Flagship Series",
    colorway: "Navy / Red",
    swatches: ["#1B2A4A", "#8B2332"],
    image: "/images/products/the-sideline/the-sideline-front.png",
    quote: "For the ones who never miss a game. Rain or shine.",
  },
  {
    name: "The Sunday",
    handle: "the-sunday",
    series: "Flagship Series",
    colorway: "White / Black",
    swatches: ["#F2EDE4", "#0A0A0A"],
    image: "/images/products/the-sunday/the-sunday-front.png",
    quote: "Sundays are sacred. This hat knows that.",
  },
  {
    name: "The Provider",
    handle: "the-provider",
    series: "Legacy Series",
    colorway: "Camo / Blue",
    swatches: ["#4A5D3A", "#2A4A6B"],
    image: "/images/products/the-provider/the-provider-front.png",
    quote: "Quiet work. Loud results. That's what providers do.",
  },
  {
    name: "The Builder",
    handle: "the-builder",
    series: "Legacy Series",
    colorway: "Tan / Camo",
    swatches: ["#C4A97D", "#4A5D3A"],
    image: "/images/products/the-builder/the-builder-front.png",
    quote: "Built something from nothing. This is what that looks like.",
  },
  {
    name: "The Girl Dad",
    handle: "the-girl-dad",
    series: "Legacy Series",
    colorway: "Camo / Pink",
    swatches: ["#4A5D3A", "#D4899B"],
    image: "/images/products/the-girl-dad/the-girl-dad-front.png",
    quote: "She changed everything. This one\u2019s for her.",
  },
];

const marqueeText =
  "JUST A FATHER DOING FATHERLY THINGS \u00B7 DESIGNED BY PAPA CHARLIE \u00B7 DROP 001 \u00B7 125 HATS \u00B7 EST MMXVIII \u00B7 ";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  // Scroll to a specific slide
  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.offsetWidth;
    track.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  }, []);

  // Track active slide on scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const slideWidth = track.offsetWidth;
      const newIndex = Math.round(track.scrollLeft / slideWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), hats.length - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && activeIndex < hats.length - 1) {
        scrollToSlide(activeIndex + 1);
      } else if (e.key === "ArrowLeft" && activeIndex > 0) {
        scrollToSlide(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToSlide]);

  // Drag to scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartX.current - dx;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const padIndex = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section className="relative bg-[#FAF7F2] py-20 sm:py-28 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 mb-12 flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
            The Collection
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-foreground leading-[0.95]">
            The Hats.<br />
            Designed by Papa Charlie.
          </h2>
        </div>
        <p className="hidden sm:block font-mono text-sm tracking-widest text-text-muted">
          {padIndex(activeIndex)} / {padIndex(hats.length)}
        </p>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {hats.map((hat, i) => (
          <div
            key={hat.handle}
            className="flex-none w-full snap-start"
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[680px]">
                {/* LEFT — Product panel */}
                <div className="relative flex flex-col items-center justify-center bg-[#F2EDE4] p-8 sm:p-12 overflow-hidden">
                  {/* Grid texture */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Diagonal stripe */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 60px,
                        rgba(0,0,0,0.015) 60px,
                        rgba(0,0,0,0.015) 61px
                      )`,
                    }}
                  />

                  {/* Slide number */}
                  <span className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
                    {padIndex(i)} / {padIndex(hats.length)}
                  </span>

                  {/* Product image */}
                  <div
                    className="relative z-10 w-full max-w-[480px] sm:max-w-[520px] aspect-[4/5] mb-4 select-none pointer-events-none"
                    style={{ backgroundColor: '#F2EDE4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img
                      src={hat.image}
                      alt={hat.name}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Product info */}
                  <div className="relative z-10 w-full max-w-[380px]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8905A] mb-1">
                      {hat.series}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-foreground mb-2">
                      {hat.name}
                    </h3>
                    <p className="font-body text-sm text-text-muted mb-4">
                      {hat.colorway}
                    </p>

                    {/* Swatches */}
                    <div className="flex items-center gap-2 mb-5">
                      {hat.swatches.map((color) => (
                        <span
                          key={color}
                          className="w-5 h-5 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Price */}
                    <p className="font-display text-2xl text-foreground mb-6">
                      $45
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/products/${hat.handle}`}
                        className="flex-1 flex items-center justify-center py-3.5 border border-foreground text-foreground font-mono text-[11px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                      >
                        Quick View
                      </Link>
                      <button className="flex-1 py-3.5 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/85 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT — Dark editorial panel */}
                <div className="relative flex flex-col justify-between bg-[#0A0A0A] p-8 sm:p-12 overflow-hidden min-h-[400px] lg:min-h-0">
                  {/* Ghost text */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
                    <span
                      className="font-display text-[180px] sm:text-[240px] lg:text-[280px] text-white/[0.02] whitespace-nowrap leading-none"
                    >
                      {hat.name}
                    </span>
                  </div>

                  {/* Scrolling marquee top */}
                  <div className="overflow-hidden border-b border-white/5 pb-4 mb-auto">
                    <div className="flex animate-marquee whitespace-nowrap">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <span
                          key={j}
                          className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/15"
                        >
                          {marqueeText}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle placeholder */}
                  <div className="relative z-10 flex-1 flex items-center justify-center my-8">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] border border-white/5 bg-white/[0.02] flex items-center justify-center">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                        Lifestyle
                      </span>
                      {/* Hotspot dot */}
                      <span className="absolute top-1/3 left-2/3 w-3 h-3 rounded-full bg-[#C8905A]/60 ring-4 ring-[#C8905A]/20 animate-pulse" />
                    </div>
                  </div>

                  {/* Bottom: quote + badge */}
                  <div className="relative z-10 flex items-end justify-between gap-6">
                    <p className="font-editorial italic text-sm sm:text-base text-white/50 max-w-[280px] leading-relaxed">
                      &ldquo;{hat.quote}&rdquo;
                    </p>

                    {/* Papa Charlie badge */}
                    <div className="flex-none w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#C8905A]/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <path
                            id={`badge-circle-${i}`}
                            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                          />
                        </defs>
                        <text className="fill-[#C8905A]/50" style={{ fontSize: "9px" }}>
                          <textPath
                            href={`#badge-circle-${i}`}
                            startOffset="0%"
                            style={{ fontFamily: "var(--font-space-mono)", letterSpacing: "0.15em" }}
                          >
                            PAPA CHARLIE &middot; DESIGNED BY &middot; DROP 001 &middot;
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation: dots + arrows */}
      <div className="mx-auto max-w-7xl px-6 mt-8 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {hats.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-[#C8905A]"
                  : "w-2 bg-foreground/15 hover:bg-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous slide"
            onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 border border-foreground/15 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => scrollToSlide(Math.min(hats.length - 1, activeIndex + 1))}
            disabled={activeIndex === hats.length - 1}
            className="w-10 h-10 border border-foreground/15 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
