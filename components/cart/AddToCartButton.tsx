"use client";

import { useState } from "react";
import { createCart, addToCart } from "@/lib/shopify";

type Props = {
  variantId: string;
  label?: string;
  className?: string;
};

export default function AddToCartButton({
  variantId,
  label = "Add to Cart",
  className = "",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      const cart = await createCart();
      const updated = await addToCart(cart.id, variantId, 1);
      window.location.href = updated.checkoutUrl;
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const text =
    status === "loading"
      ? "Adding..."
      : status === "error"
        ? "Try Again"
        : label;

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className={`w-full py-4 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/85 transition-colors disabled:opacity-60 ${className}`}
    >
      {text}
    </button>
  );
}
