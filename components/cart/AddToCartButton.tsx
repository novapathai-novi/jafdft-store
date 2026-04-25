"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

type Props = {
  handle: string;
  name: string;
  price: number;
  image: string;
  variantId: string;
  label?: string;
  className?: string;
};

export default function AddToCartButton({
  handle,
  name,
  price,
  image,
  variantId,
  label = "Add to Cart",
  className = "",
}: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({ handle, name, price, image, variantId });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-4 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/85 transition-colors ${className}`}
    >
      {added ? "Added \u2713" : label}
    </button>
  );
}
