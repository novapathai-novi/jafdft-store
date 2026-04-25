"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import { useCart } from "@/components/cart/CartContext";
import { getAllProducts } from "@/lib/products";

export default function CollectionPage() {
  const { addToCart } = useCart();
  const [addedHandle, setAddedHandle] = useState<string | null>(null);
  const products = getAllProducts();

  const handleAdd = (p: (typeof products)[number]) => {
    addToCart({
      handle: p.handle,
      name: p.name,
      price: p.price,
      image: p.images[0].src,
      variantId: p.variantId,
    });
    setAddedHandle(p.handle);
    setTimeout(() => setAddedHandle(null), 1500);
  };

  return (
    <>
      <Nav />
      <main className="bg-[#ffffff] flex-1">
        {/* Header */}
        <div className="px-[18px] lg:px-[24px] pt-20 sm:pt-28 pb-10">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
            Drop 001 &middot; 125 Hats &middot; Each One Numbered
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-foreground leading-[0.95]">
            The Collection
          </h1>
        </div>

        {/* Grid — 2-col mobile, 3-col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[18px] px-[18px] lg:px-[24px] pb-20 sm:pb-28">
          {products.map((hat) => (
            <div key={hat.handle} className="group">
              {/* Image container */}
              <div
                className="relative aspect-square overflow-hidden"
                style={{ backgroundColor: "#ebebeb" }}
              >
                {/* Clickable image area */}
                <Link
                  href={`/products/${hat.handle}`}
                  className="absolute inset-0 z-[1]"
                  aria-label={`View ${hat.name}`}
                >
                  {/* Front image — always visible */}
                  <img
                    src={hat.images[0].src}
                    alt={hat.name}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    style={{ objectPosition: "50% 50%" }}
                  />
                  {/* Lifestyle image — crossfade on desktop hover only */}
                  <img
                    src={hat.lifestyle}
                    alt={`${hat.name} — lifestyle`}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover select-none opacity-0 lg:group-hover:opacity-100"
                    style={{
                      objectPosition: "50% 50%",
                      transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </Link>

                {/* Quick View — desktop hover only */}
                <Link
                  href={`/products/${hat.handle}`}
                  className="absolute z-[4] font-mono text-[10px] uppercase tracking-[0.1em] font-medium text-[#0A0A0A] px-3 py-1.5 opacity-0 group-hover:opacity-100 hidden lg:block"
                  style={{
                    bottom: "48px",
                    right: "12px",
                    backgroundColor: "rgba(242,237,228,0.9)",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  Quick View
                </Link>

                {/* Add to Cart bar — desktop hover only, inside image */}
                <button
                  onClick={() => handleAdd(hat)}
                  className="absolute bottom-0 left-0 right-0 z-[3] h-[40px] flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] text-[#F2EDE4] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hidden lg:flex"
                  style={{
                    backgroundColor: "rgba(10,10,10,0.9)",
                    transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {addedHandle === hat.handle ? "Added \u2713" : "Add to Cart"}
                </button>
              </div>

              {/* Info */}
              <p className="font-mono text-[10px] uppercase tracking-[0.06em] font-medium text-[#C8905A] mt-3">
                {hat.series}
              </p>
              <h3 className="font-display text-[16px] text-[#0A0A0A] mt-0.5">
                {hat.name}
              </h3>
              <p className="font-mono text-[12px] font-light text-[#0A0A0A] mt-0.5">
                ${hat.price}.00
              </p>

              {/* Add to Cart — mobile only, below card */}
              <button
                onClick={() => handleAdd(hat)}
                className="w-full mt-3 bg-[#0A0A0A] text-[#F2EDE4] font-mono text-[11px] uppercase tracking-[0.1em] hover:bg-[#0A0A0A]/85 transition-colors lg:hidden"
                style={{ height: "40px" }}
              >
                {addedHandle === hat.handle ? "Added \u2713" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
