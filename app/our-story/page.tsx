'use client'
import { useEffect, useRef } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'

export default function OurStory() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    const elements = pageRef.current?.querySelectorAll('.fade-up')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <style>{`
        .hero-img { animation: kenburns 20s ease-in-out infinite alternate; }
        @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }
        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease-out, transform 0.7s ease-out; }
        .fade-up.animate-in { opacity: 1; transform: translateY(0); }
        .divider-line { width: 0; background: #C8905A; height: 1px; transition: width 0.8s ease 0.3s; }
        .fade-up.animate-in .divider-line { width: 48px; }
        .story-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C8905A;
          color: #0A0A0A;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 18px 36px;
          text-decoration: none;
          border-radius: 999px;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease;
          box-shadow: 0 8px 24px rgba(200, 144, 90, 0.25);
        }
        .story-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 36px rgba(200, 144, 90, 0.4);
        }
        .story-cta svg {
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .story-cta:hover svg {
          transform: translateX(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-img { animation: none !important; }
          .fade-up { opacity: 1 !important; transform: none !important; }
          .divider-line { width: 48px !important; }
        }
      `}</style>

      <div ref={pageRef}>
        {/* ─── HERO SECTION ─── */}
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          <img
            src="/images/our-story/demetrie-family-hero.jpg"
            alt="Demetrie with his family"
            className="hero-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 78%, #FAF7F2 100%)' }} />
        </div>

        {/* Hero text */}
        <section style={{ background: '#FAF7F2', paddingTop: '80px', paddingBottom: '120px' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
            <p className="fade-up" style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C8905A', marginBottom: '12px' }}>
              Our Story
            </p>
            <h1 className="fade-up" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(44px, 7vw, 72px)', letterSpacing: '2px', color: '#0A0A0A', marginBottom: '24px', lineHeight: 1 }}>
              Built For Present Fathers
            </h1>
            <div className="fade-up">
              <div className="divider-line" style={{ marginBottom: '32px' }} />
            </div>
            <div className="fade-up" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 300, color: '#7a7570', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '20px' }}>
                JAFDFT was born from a truth most people miss: the strongest parts of fatherhood happen in the quiet.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Not the posts. Not the slogans. The small moments. Early mornings before the house wakes up. Bedtime routines repeated without applause. Showing up the next day. And the day after that.
              </p>
              <p>
                That kind of fatherhood deserves a uniform.
              </p>
            </div>
          </div>
        </section>

        {/* ─── MEET DEMETRIE SECTION ─── */}
        <section style={{ background: '#FAF7F2', paddingBottom: '120px' }}>
          <div className="fade-up" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
            <img
              src="/images/our-story/demetrie-family-portrait.jpg"
              alt="Demetrie, founder of JAFDFT"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
            <p className="fade-up" style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C8905A', marginBottom: '12px' }}>
              The Founder
            </p>
            <h2 className="fade-up" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 6vw, 60px)', letterSpacing: '2px', color: '#0A0A0A', marginBottom: '24px', lineHeight: 1 }}>
              Meet Demetrie
            </h2>
            <div className="fade-up">
              <div className="divider-line" style={{ marginBottom: '32px' }} />
            </div>
            <div className="fade-up" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 300, color: '#7a7570', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '20px' }}>
                Demetrie is a father first, a designer second, and a Chicagoan through and through.
              </p>
              <p style={{ marginBottom: '20px' }}>
                He founded JAFDFT with one standard: make something real enough to wear every day, designed well enough to mean something.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Every piece in Drop 001 came through that filter &mdash; school runs, weekend outings, the long days and the moments in between.
              </p>
              <p style={{ marginBottom: '32px' }}>
                Nothing loud. Nothing overdone.
              </p>
            </div>
            <div className="fade-up" style={{ width: '48px', height: '1px', background: '#C8905A', opacity: 0.5 }} />
          </div>
        </section>

        {/* ─── DROP 001 CLOSING SECTION ─── */}
        <section style={{ background: '#FAF7F2', paddingBottom: '120px' }}>
          <div className="fade-up" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
            <img
              src="/images/our-story/demetrie-family-tender.jpg"
              alt="Demetrie with his daughter"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
            <p className="fade-up" style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C8905A', marginBottom: '12px' }}>
              The Drop
            </p>
            <h2 className="fade-up" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 6vw, 60px)', letterSpacing: '2px', color: '#0A0A0A', marginBottom: '24px', lineHeight: 1 }}>
              Drop 001
            </h2>
            <div className="fade-up">
              <div className="divider-line" style={{ marginBottom: '32px' }} />
            </div>
            <div className="fade-up" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 300, color: '#7a7570', lineHeight: 1.8, marginBottom: '32px' }}>
              <p style={{ marginBottom: '20px' }}>
                Five colorways. Twenty-five of each. Individually numbered 1 through 125.
              </p>
              <p style={{ marginBottom: '20px' }}>
                When they&rsquo;re gone, they&rsquo;re gone.
              </p>
              <p className="fade-up" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '22px', color: '#C8905A', lineHeight: 1.4, marginTop: '32px', marginBottom: '12px' }}>
                By a Father. For Fathers.
              </p>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#0A0A0A' }}>
                Est. MMXVIII
              </p>
            </div>
            <div className="fade-up">
              <a href="/collections/all" className="story-cta">
                <span>Shop Drop 001</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
