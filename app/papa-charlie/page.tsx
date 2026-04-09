'use client'
import { useEffect, useRef } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'

export default function PapaCharli() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = contentRef.current?.querySelectorAll('.fade-up')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <style>{`
        .hero-img { animation: kenburns 20s ease-in-out infinite alternate; }
        @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.animate-in { opacity: 1; transform: translateY(0); }
        .fade-up:nth-child(1) { transition-delay: 0s; }
        .fade-up:nth-child(2) { transition-delay: 0.1s; }
        .fade-up:nth-child(3) { transition-delay: 0.2s; }
        .fade-up:nth-child(4) { transition-delay: 0.3s; }
        .fade-up:nth-child(5) { transition-delay: 0.4s; }
        .divider-line { width: 0; transition: width 0.8s ease 0.3s; }
        .animate-in .divider-line, .divider-line.animate-in { width: 48px; }
      `}</style>

      {/* FULL HERO */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src="/images/lifestyle/papa-charlie-family.jpg"
          alt="Papa Charli and family"
          className="hero-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 70%, #FAF7F2 100%)' }} />
      </div>

      {/* CONTENT SECTION */}
      <div ref={contentRef} style={{ background: '#FAF7F2', paddingTop: '80px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <p className="fade-up" style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C8905A', marginBottom: '12px' }}>Papa Charli</p>
          <h1 className="fade-up" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: '2px', color: '#0A0A0A', marginBottom: '24px', lineHeight: 1 }}>THE NAME BEHIND THE HAT.</h1>
          <p className="fade-up" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '24px', color: '#C8905A', marginBottom: '24px', lineHeight: 1.4 }}>&ldquo;She didn&rsquo;t just give me a name &mdash; she gave me a purpose.&rdquo;</p>
          <div className="fade-up">
            <div className="divider-line animate-in" style={{ height: '1px', background: '#C8905A', marginBottom: '32px' }} />
          </div>
          <div className="fade-up" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 300, color: '#7a7570', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '20px' }}>Charli arrived. I became Papa Charli. She didn&rsquo;t just give me a name &mdash; she gave me a purpose.</p>
            <p>Every hat in this drop is my design. Built for the fathers who are locked in and show up. This is what that looks like.</p>
          </div>
          <div className="fade-up" style={{ marginTop: '48px' }}>
            <a href="/collections/all" style={{ display: 'inline-block', background: '#C8905A', color: '#0A0A0A', fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', padding: '16px 32px', textDecoration: 'none', fontWeight: 700 }}>Shop Collection</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
