"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/nav/Nav";
import ProductShowcase from "@/components/homepage/ProductShowcase";
import BrandStatement from "@/components/homepage/BrandStatement";
import TshirtDrop from "@/components/homepage/TshirtDrop";
import Footer from "@/components/footer/Footer";

function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!shouldStart || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [shouldStart, target, duration]);

  return value;
}

const typewriterWords = ["BY A FATHER", "FOR FATHERS."];

function TypewriterHeadline() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wordIndexRef = useRef(0);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isVisibleRef = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Intersection observer — pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor blink
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      if (isTyping) {
        setShowCursor(true);
      } else {
        setShowCursor((prev) => !prev);
      }
    }, 530);
    return () => clearInterval(interval);
  }, [reducedMotion, isTyping]);

  // Typewriter loop
  useEffect(() => {
    if (reducedMotion) return;

    function typeWord() {
      const word = typewriterWords[wordIndexRef.current];
      let charIndex = 0;
      setIsTyping(true);
      setShowCursor(true);

      function typeChar() {
        if (!isVisibleRef.current) {
          timeoutRef.current = setTimeout(typeChar, 200);
          return;
        }
        charIndex++;
        setDisplayText(word.slice(0, charIndex));
        if (charIndex < word.length) {
          timeoutRef.current = setTimeout(typeChar, 80);
        } else {
          // Done typing — hold for 1.5s then clear
          setIsTyping(false);
          timeoutRef.current = setTimeout(() => {
            setDisplayText("");
            setIsTyping(true);
            setShowCursor(true);
            wordIndexRef.current = (wordIndexRef.current + 1) % typewriterWords.length;
            timeoutRef.current = setTimeout(typeWord, 300);
          }, 1500);
        }
      }

      typeChar();
    }

    typeWord();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <h1
        className="font-display tracking-wide text-[#F2EDE4] mb-6 md:mb-8 hero-typewriter"
        style={{ lineHeight: 0.92 }}
      >
        <span className="block">BY A FATHER</span>
        <span className="block">FOR FATHERS.</span>
      </h1>
    );
  }

  return (
    <h1
      ref={containerRef}
      className="font-display tracking-wide mb-6 md:mb-8 hero-typewriter"
      style={{
        lineHeight: 0.92,
        minHeight: "1em",
      }}
    >
      <span
        style={{
          backgroundImage: "linear-gradient(90deg, #C8905A, #d4a373)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayText}
      </span>
      <span
        style={{
          color: "#C8905A",
          opacity: showCursor ? 1 : 0,
          fontWeight: 200,
          marginLeft: "2px",
        }}
      >
        |
      </span>
    </h1>
  );
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const count125 = useCountUp(125, 2000, statsVisible);
  const count5 = useCountUp(5, 1000, statsVisible);

  // Stats intersection observer
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes clipReveal {
          from { clip-path: inset(0 100% 0 0); opacity: 0; }
          to { clip-path: inset(0 0 0 0); opacity: 1; }
        }
        .hero-fade { opacity: 0; animation: fadeUp 0.8s ease-out forwards; }
        .hero-clip { opacity: 0; animation: clipReveal 1s ease-out forwards; }
        .hero-delay-0 { animation-delay: 0s; }
        .hero-delay-1 { animation-delay: 0.15s; }
        .hero-delay-2 { animation-delay: 0.3s; }
        .hero-delay-3 { animation-delay: 0.5s; }
        .hero-delay-4 { animation-delay: 0.7s; }
        .hero-delay-5 { animation-delay: 0.9s; }
        /* Liquid Glass CTA system */
        .glass-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          min-height: 52px;
          border-radius: 999px;
          text-decoration: none;
          letter-spacing: 0.15em;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          overflow: hidden;
          isolation: isolate;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 400ms ease,
                      background 400ms ease;
          cursor: pointer;
        }
        .glass-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.28) 0%,
            rgba(255, 255, 255, 0.06) 35%,
            transparent 70%
          );
          z-index: 1;
        }
        .glass-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 80%
          );
          transition: left 900ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 2;
        }
        .glass-btn > * {
          position: relative;
          z-index: 3;
        }
        .glass-btn:hover {
          transform: translateY(-2px) scale(1.015);
          border-color: rgba(255, 255, 255, 0.32);
        }
        .glass-btn:hover::after {
          left: 140%;
        }
        .glass-btn:active {
          transform: translateY(0) scale(0.98);
          transition-duration: 100ms;
        }
        .glass-btn:focus-visible {
          outline: 2px solid rgba(200, 144, 90, 0.85);
          outline-offset: 3px;
        }
        .glass-btn-primary {
          background: linear-gradient(
            135deg,
            rgba(200, 144, 90, 0.82) 0%,
            rgba(200, 144, 90, 0.62) 100%
          );
          color: #0A0A0A;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
            0 8px 24px rgba(200, 144, 90, 0.28),
            0 2px 8px rgba(0, 0, 0, 0.18);
        }
        .glass-btn-primary:hover {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.45),
            inset 0 -1px 0 rgba(0, 0, 0, 0.12),
            0 14px 36px rgba(200, 144, 90, 0.42),
            0 4px 12px rgba(0, 0, 0, 0.22);
        }
        .glass-btn-secondary {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0.06) 100%
          );
          color: #F2EDE4;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.22),
            0 8px 24px rgba(0, 0, 0, 0.25);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
        }
        .glass-btn-secondary:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.09) 100%
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 14px 36px rgba(0, 0, 0, 0.3);
        }
        .glass-btn-icon {
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.85;
        }
        .glass-btn:hover .glass-btn-icon {
          transform: translateX(5px);
          opacity: 1;
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes meteor {
          0% { transform: translate(0, 0) rotate(-35deg); opacity: 0; }
          5% { opacity: 1; }
          30% { opacity: 1; }
          100% { transform: translate(calc(100vw + 200px), calc(100vh + 200px)) rotate(-35deg); opacity: 0; }
        }
        .meteor-line {
          position: absolute;
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, rgba(200,144,90,0.4), transparent);
          opacity: 0;
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .meteor-line {
            width: 120px;
          }
        }
        .hero-zoom {
          object-position: center 35%;
        }
        .hero-typewriter {
          font-size: clamp(36px, 9vw, 48px);
        }
        @media (min-width: 768px) {
          .hero-typewriter {
            font-size: clamp(56px, 9vw, 115px);
          }
        }
        .hero-gradient-overlay {
          background: linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.2) 30%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.8) 100%);
        }
        @media (min-width: 768px) {
          .hero-gradient-overlay {
            background: linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.45) 35%, rgba(10,10,10,0.1) 55%, transparent 70%);
          }
          .hero-zoom {
            object-position: left center !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
          .hero-zoom { animation: none !important; }
          .meteor-line { display: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative w-full min-h-[100dvh] md:min-h-screen overflow-hidden"
        style={{ backgroundColor: "#F2EDE4" }}
      >
        {/* Diagonal shooting meteor lines — 2 on mobile, 4 on desktop */}
        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
          <div className="meteor-line" style={{ top: "10%", left: "-120px", animation: "meteor 4s linear 0s infinite" }} />
          <div className="meteor-line" style={{ top: "30%", left: "-120px", animation: "meteor 5s linear 1.2s infinite" }} />
          <div className="meteor-line hidden md:block" style={{ top: "55%", left: "-120px", animation: "meteor 4.5s linear 2.8s infinite" }} />
          <div className="meteor-line hidden md:block" style={{ top: "75%", left: "-120px", animation: "meteor 5.5s linear 4s infinite" }} />
        </div>

        {/* Background image with Ken Burns slow zoom — responsive swap */}
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/hero/home/desktop.jpg"
          />
          <img
            src="/images/hero/home/mobile.jpg"
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="hero-zoom absolute inset-0 w-full h-full object-cover"
            style={{
              animation: "slowZoom 20s ease-in-out infinite",
            }}
          />
        </picture>

        {/* Dark gradient overlay — full on mobile, left-side on desktop */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] hero-gradient-overlay"
        />

        {/* Film grain texture */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: "overlay" as const,
          }}
        />

        {/* HERO CONTENT */}
        <div
          className="relative z-10 h-full min-h-[100dvh] md:min-h-screen flex flex-col justify-end md:justify-center text-center md:text-left px-6 md:px-0 pb-10 md:pb-0 md:pt-0"
        >
          <div className="md:pl-[8vw] md:pr-[5vw] md:max-w-[680px]">
            {/* Eyebrow */}
            <p className="hero-fade hero-delay-0 font-mono text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#F2EDE4] font-bold mb-4 md:mb-6">
              Limited Edition &middot; Drop 001 &middot; 125 Hats
            </p>

            {/* Main headline — typewriter */}
            <TypewriterHeadline />

            {/* Sub line */}
            <p className="hero-fade hero-delay-3 font-editorial italic text-[#C8905A] text-base md:text-lg lg:text-xl mb-8 md:mb-10" style={{ lineHeight: 1.5, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              Just A Father Doing Fatherly Things.
            </p>

            {/* CTA Buttons — Liquid Glass */}
            <div className="hero-fade hero-delay-4 flex flex-row gap-3 md:gap-4">
              <a
                href="/collections/all"
                className="glass-btn glass-btn-primary font-mono text-[11px] font-bold uppercase flex-1 md:flex-none"
                aria-label="Shop Drop"
              >
                <span>Shop Drop</span>
                <svg
                  className="glass-btn-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="/our-story"
                className="glass-btn glass-btn-secondary font-mono text-[11px] font-bold uppercase flex-1 md:flex-none"
                aria-label="Read our story"
              >
                <span>Our Story</span>
              </a>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="hero-fade hero-delay-5 hidden md:flex justify-center md:justify-start gap-6 md:gap-10 mt-6 md:mt-8 pt-5 md:pt-6"
              style={{ borderTop: "1px solid rgba(242,237,228,0.15)" }}
            >
              <div>
                <div className="font-mono text-xl md:text-2xl font-bold text-[#F2EDE4] leading-none">
                  {count125}
                </div>
                <div className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#F2EDE4]/60 mt-1">
                  Total Hats
                </div>
              </div>
              <div>
                <div className="font-mono text-xl md:text-2xl font-bold text-[#F2EDE4] leading-none">
                  {count5}
                </div>
                <div className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#F2EDE4]/60 mt-1">
                  Colorways
                </div>
              </div>
              <div>
                <div className="font-mono text-xl md:text-2xl font-bold text-[#F2EDE4] leading-none">
                  001
                </div>
                <div className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#F2EDE4]/60 mt-1">
                  Drop Number
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase />
      <BrandStatement />
      <TshirtDrop />
      <Footer />
    </>
  );
}
