"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import { useCart } from "@/components/cart/CartContext";
import { createCart, addToCart as shopifyAddToCart } from "@/lib/shopify";

export default function CartPage() {
  const { cartItems, cartCount, removeFromCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const cart = await createCart();

      let updatedCart = cart;
      for (const item of cartItems) {
        updatedCart = await shopifyAddToCart(
          updatedCart.id,
          item.variantId,
          item.quantity
        );
      }

      if (updatedCart?.checkoutUrl) {
        window.location.href = updatedCart.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError("Something went wrong. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Nav />
      <main className="bg-[#FAF7F2] flex-1">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide text-foreground mb-10">
            Your Cart
          </h1>

          {cartCount === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-lg text-text-muted mb-8">
                Your cart is empty.
              </p>
              <Link
                href="/collections/all"
                className="inline-block px-8 py-3.5 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/85 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="hidden sm:grid grid-cols-[1fr_100px_100px_40px] gap-4 pb-4 border-b border-border mb-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Product</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted text-center">Qty</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted text-right">Total</span>
                <span />
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div
                  key={item.handle}
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_100px_100px_40px] gap-4 items-center py-6 border-b border-border"
                >
                  {/* Image */}
                  <div className="w-20 h-20 flex items-center justify-center" style={{ backgroundColor: "#F2EDE4" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Name + Price */}
                  <div>
                    <h3 className="font-display text-xl tracking-wide text-foreground">
                      {item.name}
                    </h3>
                    <p className="font-mono text-sm text-text-muted">${item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.handle, item.quantity - 1)}
                      className="w-7 h-7 border border-border flex items-center justify-center font-mono text-sm text-text-muted hover:text-foreground transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.handle, item.quantity + 1)}
                      className="w-7 h-7 border border-border flex items-center justify-center font-mono text-sm text-text-muted hover:text-foreground transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <p className="font-mono text-sm text-foreground text-right">
                    ${item.price * item.quantity}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.handle)}
                    className="text-text-muted hover:text-foreground transition-colors justify-self-end"
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Footer */}
              <div className="flex items-center justify-between pt-8">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted mb-1">Order Total</p>
                  <p className="font-display text-3xl text-foreground">${total}</p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="px-10 py-4 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? "Redirecting\u2026" : "Proceed to Checkout"}
                </button>
              </div>

              {checkoutError && (
                <p className="font-mono text-[11px] text-red-600 mt-4 text-right">
                  {checkoutError}
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
