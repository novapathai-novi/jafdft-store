"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

type Props = {
  handle: string;
  name: string;
  price: number;
  image: string;
  label?: string;
  className?: string;
};

export default function AddToCartButton({
  handle,
  name,
  price,
  image,
  label = "Add to Cart",
  className = "",
}: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({ handle, name, price, image });
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
