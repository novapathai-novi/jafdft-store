"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { useCart } from "@/components/cart/CartContext";
import {
  getProductByHandle,
  getOtherProducts,
  getAllProducts,
} from "@/lib/products";

// Force dynamic rendering to bust cache
export const dynamic = "force-dynamic";

// ─── Complete The Look pairings ─────────────────────────────────────────────

const completeTheLook: Record<string, [string, string]> = {
  "the-sunday": ["the-standard", "the-girl-dad"],
  "the-standard": ["the-sunday", "the-provider"],
  "the-girl-dad": ["the-standard", "the-builder"],
  "the-provider": ["the-builder", "the-standard"],
  "the-builder": ["the-provider", "the-sunday"],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = getProductByHandle(handle);
  const [activeTab, setActiveTab] = useState<"description" | "shipping">("description");
  const [activeThumb, setActiveThumb] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { addToCart } = useCart();
  const [ctlAdded, setCtlAdded] = useState<string | null>(null);

  const scrollToImage = useCallback((index: number) => {
    const el = imageRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveThumb(index);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveThumb(i);
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [product]);

  if (!product) {
    return (
      <>
        <Nav />
        <main className="bg-[#ffffff] flex-1 flex items-center justify-center min-h-screen">
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
  const allProducts = getAllProducts();

  // Gallery = lifestyle shot first, then 6 product angles (7 total)
  const galleryImages = [
    { angle: "Lifestyle", src: product.lifestyle },
    ...product.images,
  ];

  const ctlHandles = completeTheLook[handle] || [others[0]?.handle, others[1]?.handle];
  const ctlProducts = ctlHandles
    .map((h) => allProducts.find((p) => p.handle === h))
    .filter(Boolean) as typeof allProducts;

  const handleCtlAdd = (p: (typeof allProducts)[number]) => {
    addToCart({ handle: p.handle, name: p.name, price: p.price, image: p.images[0].src });
    setCtlAdded(p.handle);
    setTimeout(() => setCtlAdded(null), 1500);
  };

  // Shared description tab content
  const descriptionContent = (
    <div className="font-mono text-[12px] font-light text-[#0A0A0A] leading-relaxed space-y-3">
      <p>{product.description}</p>
      <p className="font-editorial italic text-[#C8905A]">
        &ldquo;{product.quote}&rdquo;
      </p>
      <ul className="list-disc list-inside space-y-1 text-[#7a7570]">
        <li>Premium structured crown</li>
        <li>Classic snapback closure &mdash; one size fits most</li>
        <li>Pre-curved brim with EST MMXVIII underbrim detail</li>
        <li>Individually numbered 1&ndash;125</li>
        <li>Custom woven label interior</li>
        <li>Drop 001 limited edition</li>
      </ul>
      {/* Product details */}
      <div className="pt-3 mt-3 space-y-1" style={{ borderTop: "1px solid #D9D5CF" }}>
        <p className="text-[#7a7570]">Style: JAFDFT-{handle}-001</p>
        <p className="text-[#7a7570]">Color: {product.colorway}</p>
        <p className="text-[#7a7570]">Material: Premium Structured Cotton</p>
      </div>
    </div>
  );

  const shippingContent = (
    <div className="font-mono text-[12px] font-light text-[#0A0A0A] leading-relaxed space-y-3">
      <p>Free shipping on all orders. Ships within 2&ndash;3 business days via USPS Priority Mail with tracking.</p>
      <p className="text-[#7a7570]">Due to the limited nature of Drop 001, all sales are final. If your hat arrives damaged, contact us within 48 hours for a replacement.</p>
      <p className="text-[#7a7570]">Spot clean only. Do not machine wash or tumble dry. Air dry away from direct sunlight.</p>
    </div>
  );

  // Shared tabs renderer
  const tabsSection = (
    <div className="mt-4">
      <div className="flex gap-8 pb-3" style={{ borderBottom: "1px solid #0A0A0A" }}>
        <button
          onClick={() => setActiveTab("description")}
          className={`font-mono text-[12px] uppercase font-bold tracking-[0.06em] transition-colors ${
            activeTab === "description" ? "text-[#0A0A0A]" : "text-[#7a7570]"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`font-mono text-[12px] uppercase font-bold tracking-[0.06em] transition-colors ${
            activeTab === "shipping" ? "text-[#0A0A0A]" : "text-[#7a7570]"
          }`}
        >
          Shipping
        </button>
      </div>
      <div className="py-3">
        {activeTab === "description" ? descriptionContent : shippingContent}
      </div>
    </div>
  );

  // Complete The Look section
  const completeTheLookSection = (
    <div className="mt-6 pt-4" style={{ borderTop: "1px solid #D9D5CF" }}>
      <h3 className="font-display text-lg text-[#0A0A0A] mb-4">
        More From Drop 001
      </h3>
      <div className="space-y-4">
        {ctlProducts.map((p) => (
          <div key={p.handle} className="grid gap-4" style={{ gridTemplateColumns: "2fr 3fr", alignItems: "start" }}>
            <Link href={`/products/${p.handle}`}>
              <div className="aspect-square w-full flex items-center justify-center" style={{ backgroundColor: "#ebebeb" }}>
                <img src={p.images[0].src} alt={p.name} className="w-full h-full object-contain" />
              </div>
            </Link>
            <div>
              <Link href={`/products/${p.handle}`}>
                <p className="font-mono text-[12px] text-[#0A0A0A]">{p.name}</p>
                <p className="font-mono text-[11px] text-[#7a7570] mt-0.5">{p.colorway}</p>
                <p className="font-mono text-[12px] text-[#0A0A0A] mt-1">${p.price}.00</p>
              </Link>
              <button
                onClick={() => handleCtlAdd(p)}
                className="mt-2 px-4 py-2 bg-[#0A0A0A] text-white font-mono text-[10px] uppercase tracking-wide hover:bg-[#0A0A0A]/85 transition-colors"
              >
                {ctlAdded === p.handle ? "Added \u2713" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Nav />
      <main className="bg-[#ffffff] flex-1">
        {/* ─── DESKTOP: 3-column grid ─── */}
        <div
          className="hidden lg:grid items-start"
          style={{
            gridTemplateColumns: "78px 1fr 50%",
            gap: "0 40px",
            borderTop: "1px solid #D9D5CF",
          }}
        >
          {/* COL 1: Thumbnail nav rail */}
          <div className="sticky top-[70px] flex flex-col gap-[12px] py-5 pl-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.angle}
                onClick={() => scrollToImage(i)}
                className="w-[52px] h-[52px] flex-none overflow-hidden cursor-pointer transition-colors"
                style={{
                  border: activeThumb === i ? "1px solid #0A0A0A" : "1px solid #D9D5CF",
                  backgroundColor: "#ebebeb",
                }}
                aria-label={`View ${img.angle}`}
              >
                <img
                  src={img.src}
                  alt={img.angle}
                  className={`w-full h-full ${img.angle === "Lifestyle" ? "object-cover" : "object-contain"}`}
                />
              </button>
            ))}
          </div>

          {/* COL 2: Main image gallery */}
          <div className="flex flex-col gap-[18px]">
            {galleryImages.map((img, i) => (
              <div
                key={img.angle}
                ref={(el) => { imageRefs.current[i] = el; }}
                className="aspect-square w-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "#ebebeb" }}
              >
                <img
                  src={img.src}
                  alt={`${product.name} — ${img.angle}`}
                  draggable={false}
                  className={`w-full h-full ${img.angle === "Lifestyle" ? "object-cover" : "object-contain"} select-none`}
                />
              </div>
            ))}
          </div>

          {/* COL 3: Product info panel */}
          <div className="sticky top-[70px] self-start" style={{ maxWidth: "80ch", padding: "30px 24px 18px" }}>
            {/* Breadcrumb */}
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] font-medium text-[#7a7570] mb-4">
              <Link href="/collections/all" className="hover:text-foreground transition-colors">
                Collection
              </Link>
              {" / "}
              <span className="text-foreground">{product.name}</span>
            </p>

            {/* Product name */}
            <h1 className="font-display text-2xl tracking-wide text-[#0A0A0A] leading-none mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="font-mono text-[14px] font-light text-[#0A0A0A] mb-4">
              ${product.price}.00
            </p>

            <div className="w-full h-px bg-[#D9D5CF]" />

            {/* Color */}
            <div className="py-4">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#0A0A0A]">
                Color: {product.colorway}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {product.swatches.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-[#D9D5CF]" />

            {/* Size selector — unselected by default */}
            <div className="py-4">
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setSizeSelected(true)}
                  className="flex items-center justify-center font-mono text-[12px] uppercase transition-colors"
                  style={{
                    height: "41px",
                    border: sizeSelected ? "1px solid #0A0A0A" : "1px solid #D9D5CF",
                    backgroundColor: sizeSelected ? "#0A0A0A" : "transparent",
                    color: sizeSelected ? "#ffffff" : "#0A0A0A",
                  }}
                >
                  One Size
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <AddToCartButton
              handle={product.handle}
              name={product.name}
              price={product.price}
              image={product.images[0].src}
              className="h-[48px] min-h-0 text-[12px] tracking-[0.1em] mt-4"
            />

            {/* Final sale notice */}
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#7a7570] mt-3">
              Final sale. All sales are final due to the limited nature of Drop 001.
            </p>

            {/* Tabs */}
            {tabsSection}

            {/* Complete The Look */}
            {completeTheLookSection}
          </div>
        </div>

        {/* ─── MOBILE: Single column ─── */}
        <div className="lg:hidden">
          {/* Images — full width stack */}
          <div className="flex flex-col gap-[18px]">
            {galleryImages.map((img) => (
              <div
                key={img.angle}
                className="aspect-square w-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "#ebebeb" }}
              >
                <img
                  src={img.src}
                  alt={`${product.name} — ${img.angle}`}
                  draggable={false}
                  className={`w-full h-full ${img.angle === "Lifestyle" ? "object-cover" : "object-contain"} select-none`}
                />
              </div>
            ))}
          </div>

          {/* Product info */}
          <div className="px-4 pt-6 pb-28">
            {/* Breadcrumb */}
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] font-medium text-[#7a7570] mb-4">
              <Link href="/collections/all" className="hover:text-foreground transition-colors">
                Collection
              </Link>
              {" / "}
              <span className="text-foreground">{product.name}</span>
            </p>

            <h1 className="font-display text-2xl tracking-wide text-[#0A0A0A] leading-none mb-3">
              {product.name}
            </h1>

            <p className="font-mono text-[14px] font-light text-[#0A0A0A] mb-4">
              ${product.price}.00
            </p>

            <div className="w-full h-px bg-[#D9D5CF]" />

            {/* Color */}
            <div className="py-4">
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#0A0A0A]">
                Color: {product.colorway}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {product.swatches.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-[#D9D5CF]" />

            {/* Size — unselected by default */}
            <div className="py-4">
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setSizeSelected(true)}
                  className="flex items-center justify-center font-mono text-[12px] uppercase transition-colors"
                  style={{
                    height: "41px",
                    border: sizeSelected ? "1px solid #0A0A0A" : "1px solid #D9D5CF",
                    backgroundColor: sizeSelected ? "#0A0A0A" : "transparent",
                    color: sizeSelected ? "#ffffff" : "#0A0A0A",
                  }}
                >
                  One Size
                </button>
              </div>
            </div>

            {/* Final sale notice */}
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#7a7570] mt-1 mb-4">
              Final sale. All sales are final due to the limited nature of Drop 001.
            </p>

            {/* Tabs */}
            {tabsSection}

            {/* Complete The Look */}
            {completeTheLookSection}
          </div>
        </div>

        {/* Mobile sticky Add to Cart bar */}
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 bg-white"
          style={{ borderTop: "1px solid #D9D5CF", padding: "16px" }}
        >
          <img
            src={product.images[0].src}
            alt={product.name}
            className="w-[50px] h-[50px] object-contain flex-none"
            style={{ backgroundColor: "#ebebeb" }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm text-[#0A0A0A] truncate">{product.name}</p>
            <p className="font-mono text-[12px] font-light text-[#0A0A0A]">${product.price}.00</p>
          </div>
          <AddToCartButton
            handle={product.handle}
            name={product.name}
            price={product.price}
            image={product.images[0].src}
            className="h-[48px] min-h-0 text-[11px] tracking-[0.1em] flex-1"
          />
        </div>

        {/* You May Also Like */}
        <div className="border-t border-[#D9D5CF]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <h2 className="font-display text-3xl tracking-wide text-foreground mb-10">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((p) => (
                <Link key={p.handle} href={`/products/${p.handle}`} className="group block">
                  <div
                    className="aspect-square mb-3 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: "#ebebeb" }}
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
