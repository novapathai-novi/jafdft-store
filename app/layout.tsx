import type { Metadata } from "next";
import { Bebas_Neue, Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAFDFT — Just A Father Doing Fatherly Things",
  description: "Drop 001. 125 hats. Each one numbered. For the fathers who are locked in and show up.",
  openGraph: {
    title: "JAFDFT — Just A Father Doing Fatherly Things",
    description: "Drop 001. 125 hats. Each one numbered. For the fathers who are locked in and show up.",
    url: "https://www.jafdft.com",
    siteName: "JAFDFT",
    images: [
      {
        url: "https://www.jafdft.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "JAFDFT — Just A Father Doing Fatherly Things",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAFDFT — Just A Father Doing Fatherly Things",
    description: "Drop 001. 125 hats. Each one numbered. For the fathers who are locked in and show up.",
    images: ["https://www.jafdft.com/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero/home/desktop.jpg"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/home/mobile.jpg"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#0A0A0A] font-[family-name:var(--font-dm-sans)]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
