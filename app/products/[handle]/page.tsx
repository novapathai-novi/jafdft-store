"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import AddToCartButton from "@/components/cart/AddToCartButton";
import {
  getProductByHandle,
  getOtherProducts,
  getAllProducts,
} from "@/lib/products";

// ─── Accordion ───────────────────────────────────────────────────────────────

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
          {title}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 font-body text-sm text-text-muted leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = getProductByHandle(handle);

  if (!product) {
    return (
      <>
        <Nav />
        <main className="bg-[#FAF7F2] flex-1 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
            <Link href="/collections/all" className="font-mono text-xs uppercase tracking-widest text-[#C8905A]">
              Back to Collection
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const others = getOtherProducts(handle);
  const angles = ["Front", "Back", "Left Side", "Right Side"];

  return (
    <>
      <Nav />
      <main className="bg-[#FAF7F2] flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-6 pb-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
            <Link href="/collections/all" className="hover:text-foreground transition-colors">
              Collection
            </Link>
            {" / "}
            <span className="text-foreground">{product.name}</span>
          </p>
        </div>

        {/* Main layout */}
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ─── LEFT: Stacked image panels ─── */}
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <div
                  key={img.angle}
                  className="relative overflow-hidden"
                  style={{
                    backgroundColor: "#F2EDE4",
                    minHeight: "500px",
                  }}
                >
                  {/* Grid texture */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          -45deg, transparent, transparent 60px,
                          rgba(0,0,0,0.015) 60px, rgba(0,0,0,0.015) 61px
                        ),
                        linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: "auto, 24px 24px, 24px 24px",
                    }}
                  />

                  {/* Angle label */}
                  <span className="absolute top-5 left-5 font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted z-10">
                    {img.angle}
                  </span>

                  {/* Image number */}
                  <span className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[0.25em] text-text-muted/40 z-10">
                    {String(i + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
                  </span>

                  {/* Hat image */}
                  <div className="flex items-center justify-center h-full p-12" style={{ minHeight: "500px", backgroundColor: "#F2EDE4" }}>
                    <img
                      src={img.src}
                      alt={`${product.name} — ${img.angle}`}
                      draggable={false}
                      className="w-4/5 h-4/5 object-contain select-none"
                      style={{ backgroundColor: '#F2EDE4', maxHeight: '400px' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ─── RIGHT: Sticky info panel ─── */}
            <div className="lg:sticky lg:top-[80px] lg:self-start">
              <div className="flex flex-col">
                {/* Series tag */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-[#C8905A]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8905A]">
                    {product.series}
                  </span>
                </div>

                {/* Product name */}
                <h1 className="font-display text-[48px] sm:text-[56px] tracking-wide text-foreground leading-none mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <p className="font-mono text-xl text-foreground mb-6">
                  ${product.price}
                </p>

                {/* Papa Charli badge */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                  <div className="w-9 h-9 rounded-full border border-[#C8905A]/40 flex items-center justify-center flex-none">
                    <span className="font-display text-[11px] text-[#C8905A]">PC</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                    Designed by Papa Charli
                  </span>
                </div>

                {/* Color swatches */}
                <div className="mb-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mb-3">
                    Colorway &mdash; {product.colorway}
                  </p>
                  <div className="flex items-center gap-2">
                    {product.swatches.map((color) => (
                      <span
                        key={color}
                        className="w-6 h-6 rounded-full border border-black/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    One Size &mdash; Snapback Adjustable
                  </p>
                </div>

                {/* Scarcity */}
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8905A] mb-6">
                  {`${product.units} available. When they're gone, they're gone.`}
                </p>

                {/* Add to Cart */}
                <AddToCartButton
                  handle={product.handle}
                  name={product.name}
                  price={product.price}
                  image={product.images[0].src}
                />

                {/* Buy it Now */}
                <button className="w-full py-4 mt-3 border border-foreground text-foreground font-mono text-[11px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                  Buy It Now
                </button>

                {/* Payment badges */}
                <div className="flex flex-wrap gap-2 mt-5 mb-8">
                  {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Shop Pay", "PayPal"].map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 border border-border font-mono text-[8px] uppercase tracking-[0.15em] text-text-muted"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Accordions */}
                <Accordion title="Description" defaultOpen>
                  <p>{product.description}</p>
                  <p className="mt-3 font-editorial italic text-[#C8905A]">
                    &ldquo;{product.quote}&rdquo;
                  </p>
                </Accordion>

                <Accordion title="Details & Construction">
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>Premium structured crown</li>
                    <li>Classic snapback closure &mdash; one size fits most</li>
                    <li>Pre-curved brim with EST MMXVIII underbrim detail</li>
                    <li>Individually numbered 1&ndash;125</li>
                    <li>Custom woven label interior</li>
                    <li>Drop 001 limited edition</li>
                  </ul>
                </Accordion>

                <Accordion title="Embroidery Details">
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>Front panel &mdash; JAFDFT wordmark, precision embroidery</li>
                    <li>Side panel &mdash; Papa Charli mark</li>
                    <li>Rear &mdash; EST MMXVIII detail</li>
                    <li>Underbrim &mdash; &ldquo;Flip the brim. EST MMXVIII. That&rsquo;s when it started.&rdquo;</li>
                  </ul>
                </Accordion>

                <Accordion title="Care Instructions">
                  <div className="flex items-center gap-6 mb-4">
                    {/* Water — spot clean */}
                    <div className="flex flex-col items-center gap-1.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                      <span className="font-mono text-[7px] uppercase tracking-wider text-text-muted">Spot Clean</span>
                    </div>
                    {/* No machine wash */}
                    <div className="flex flex-col items-center gap-1.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="3" />
                        <circle cx="12" cy="13" r="4" />
                        <line x1="3" y1="2" x2="21" y2="22" />
                      </svg>
                      <span className="font-mono text-[7px] uppercase tracking-wider text-text-muted">No Machine</span>
                    </div>
                    {/* Air dry */}
                    <div className="flex flex-col items-center gap-1.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                        <line x1="5" y1="21" x2="19" y2="21" />
                      </svg>
                      <span className="font-mono text-[7px] uppercase tracking-wider text-text-muted">Air Dry</span>
                    </div>
                    {/* No sun */}
                    <div className="flex flex-col items-center gap-1.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        <line x1="3" y1="2" x2="21" y2="22" />
                      </svg>
                      <span className="font-mono text-[7px] uppercase tracking-wider text-text-muted">No Sun</span>
                    </div>
                  </div>
                  <p>Spot clean only with a damp cloth. Do not machine wash, tumble dry, or bleach. Air dry away from direct sunlight to preserve color and shape.</p>
                </Accordion>

                <Accordion title="Shipping & Returns">
                  <p>Free shipping on all orders. Ships within 2&ndash;3 business days via USPS Priority Mail with tracking.</p>
                  <p className="mt-3">Due to the limited nature of Drop 001, all sales are final. If your hat arrives damaged, contact us within 48 hours for a replacement.</p>
                </Accordion>

                {/* Guarantees */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                  {/* Authentic */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">Authentic</span>
                  </div>
                  {/* Free Shipping */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">Free Shipping</span>
                  </div>
                  {/* Numbered */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8905A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">Numbered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <h2 className="font-display text-3xl tracking-wide text-foreground mb-10">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((p) => (
                <Link key={p.handle} href={`/products/${p.handle}`} className="group block">
                  <div
                    className="aspect-square mb-3 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: "#F2EDE4" }}
                  >
                    <img
                      src={p.images[0].src}
                      alt={p.name}
                      draggable={false}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C8905A] mb-1">
                    {p.series}
                  </p>
                  <h3 className="font-display text-xl tracking-wide text-foreground">
                    {p.name}
                  </h3>
                  <p className="font-mono text-sm text-text-muted">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
