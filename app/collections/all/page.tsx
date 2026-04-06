"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";

const products = [
  {
    name: "The Standard",
    handle: "the-standard",
    series: "Flagship Series",
    colorway: "All Black",
    price: 45,
    image: "/images/products/the-standard/the-standard-front.png",
  },
  {
    name: "The Sideline",
    handle: "the-sideline",
    series: "Flagship Series",
    colorway: "Navy / Red",
    price: 45,
    image: "/images/products/the-sideline/the-sideline-front.png",
  },
  {
    name: "The Sunday",
    handle: "the-sunday",
    series: "Flagship Series",
    colorway: "White / Black",
    price: 45,
    image: "/images/products/the-sunday/the-sunday-front.png",
  },
  {
    name: "The Provider",
    handle: "the-provider",
    series: "Legacy Series",
    colorway: "Camo / Blue",
    price: 45,
    image: "/images/products/the-provider/the-provider-front.png",
  },
  {
    name: "The Builder",
    handle: "the-builder",
    series: "Legacy Series",
    colorway: "Tan / Camo",
    price: 45,
    image: "/images/products/the-builder/the-builder-front.png",
  },
  {
    name: "The Girl Dad",
    handle: "the-girl-dad",
    series: "Legacy Series",
    colorway: "Camo / Pink",
    price: 45,
    image: "/images/products/the-girl-dad/the-girl-dad-front.png",
  },
];

const filters = ["All", "Flagship Series", "Legacy Series"];

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.series === activeFilter);

  return (
    <>
      <Nav />
      <main className="bg-[#FAF7F2] flex-1">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-6 pt-24 sm:pt-32 pb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-4">
            Drop 001 &middot; 125 Hats &middot; Each One Numbered
          </p>
          <h1 className="font-display text-6xl sm:text-[64px] tracking-wide text-foreground leading-none mb-10">
            The Collection
          </h1>

          {/* Filter tabs */}
          <div className="flex items-center gap-6 border-b border-border pb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  activeFilter === filter
                    ? "text-foreground"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Link
                key={product.handle}
                href={`/products/${product.handle}`}
                className="group block"
              >
                {/* Image */}
                <div
                  className="aspect-square mb-4 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: "#F2EDE4" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    draggable={false}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C8905A] mb-1">
                  {product.series}
                </p>
                <h3 className="font-display text-[28px] tracking-wide text-foreground leading-tight mb-1">
                  {product.name}
                </h3>
                <p className="font-mono text-sm text-text-muted mb-4">
                  ${product.price}
                </p>

                {/* Add to Cart */}
                <button className="w-full py-3.5 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/85 transition-colors">
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
