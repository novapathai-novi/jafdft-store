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

const typewriterWords = ["BY FATHERS", "FOR FATHERS."];

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
        <span className="block">BY FATHERS</span>
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
  const count6 = useCountUp(6, 1000, statsVisible);

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
        .hero-btn-fill {
          transition: all 500ms ease-out;
        }
        .hero-btn-fill:hover {
          background: #C8905A !important;
          color: #0A0A0A !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,144,90,0.3);
        }
        .hero-btn-outline {
          transition: all 500ms ease-out;
        }
        .hero-btn-outline:hover {
          background: #F2EDE4 !important;
          color: #0A0A0A !important;
          transform: translateY(-2px);
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
            background-position: right center !important;
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
        className="relative w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: "#F2EDE4" }}
      >
        {/* Diagonal shooting meteor lines — 2 on mobile, 4 on desktop */}
        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
          <div className="meteor-line" style={{ top: "10%", left: "-120px", animation: "meteor 4s linear 0s infinite" }} />
          <div className="meteor-line" style={{ top: "30%", left: "-120px", animation: "meteor 5s linear 1.2s infinite" }} />
          <div className="meteor-line hidden md:block" style={{ top: "55%", left: "-120px", animation: "meteor 4.5s linear 2.8s infinite" }} />
          <div className="meteor-line hidden md:block" style={{ top: "75%", left: "-120px", animation: "meteor 5.5s linear 4s infinite" }} />
        </div>

        {/* Background image with Ken Burns slow zoom */}
        <div
          className="absolute inset-0 hero-zoom"
          style={{
            backgroundImage: "url('/images/lifestyle/hero-model.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "75% 25%",
            animation: "slowZoom 20s ease-in-out infinite",
          }}
        />

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
          className="relative z-10 h-full min-h-screen flex flex-col justify-end md:justify-center text-center md:text-left px-6 md:px-0 pb-12 md:pb-0 md:pt-0"
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

            {/* CTA Buttons */}
            <div className="hero-fade hero-delay-4 flex flex-col md:flex-row gap-4">
              <a
                href="/collections/all"
                className="hero-btn-fill inline-flex items-center justify-center font-mono text-[11px] tracking-[0.15em] uppercase font-bold w-full md:w-auto bg-[#0A0A0A] text-[#F2EDE4] md:bg-[#F2EDE4] md:text-[#0A0A0A]"
                style={{ minHeight: "48px", textDecoration: "none" }}
              >
                Shop Drop 001
              </a>
              <a
                href="/our-story"
                className="hero-btn-outline inline-flex items-center justify-center font-mono text-[11px] tracking-[0.15em] uppercase font-bold text-[#F2EDE4] border border-[#F2EDE4]/40 bg-transparent w-full md:w-auto"
                style={{ minHeight: "48px", textDecoration: "none" }}
              >
                Our Story
              </a>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="hero-fade hero-delay-5 flex justify-center md:justify-start gap-6 md:gap-10 mt-6 md:mt-8 pt-5 md:pt-6"
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
                  {count6}
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
