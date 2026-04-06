export type Product = {
  name: string;
  handle: string;
  series: string;
  colorway: string;
  price: number;
  units: number;
  swatches: string[];
  variantId: string;
  images: { angle: string; src: string }[];
  description: string;
  quote: string;
};

const products: Product[] = [
  {
    name: "The Standard",
    handle: "the-standard",
    series: "Flagship Series",
    colorway: "All Black",
    price: 45,
    units: 21,
    swatches: ["#0A0A0A"],
    variantId: "gid://shopify/ProductVariant/the-standard",
    images: [
      { angle: "Front", src: "/images/products/the-standard/the-standard-front.png" },
      { angle: "Back", src: "/images/products/the-standard/the-standard-back.png" },
      { angle: "Left Side", src: "/images/products/the-standard/the-standard-left.png" },
      { angle: "Right Side", src: "/images/products/the-standard/the-standard-right.png" },
    ],
    description: "The one that started it all. No flash. Just standard. All-black snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "The one that started it all. No flash. Just standard.",
  },
  {
    name: "The Sideline",
    handle: "the-sideline",
    series: "Flagship Series",
    colorway: "Navy / Red",
    price: 45,
    units: 21,
    swatches: ["#1B2A4A", "#8B2332"],
    variantId: "gid://shopify/ProductVariant/the-sideline",
    images: [
      { angle: "Front", src: "/images/products/the-sideline/the-sideline-front.png" },
      { angle: "Back", src: "/images/products/the-sideline/the-sideline-back.png" },
      { angle: "Left Side", src: "/images/products/the-sideline/the-sideline-left.png" },
      { angle: "Right Side", src: "/images/products/the-sideline/the-sideline-right.png" },
    ],
    description: "For the ones who never miss a game. Rain or shine. Navy and red snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "For the ones who never miss a game. Rain or shine.",
  },
  {
    name: "The Sunday",
    handle: "the-sunday",
    series: "Flagship Series",
    colorway: "White / Black",
    price: 45,
    units: 21,
    swatches: ["#F2EDE4", "#0A0A0A"],
    variantId: "gid://shopify/ProductVariant/the-sunday",
    images: [
      { angle: "Front", src: "/images/products/the-sunday/the-sunday-front.png" },
      { angle: "Back", src: "/images/products/the-sunday/the-sunday-back.png" },
      { angle: "Left Side", src: "/images/products/the-sunday/the-sunday-left.png" },
      { angle: "Right Side", src: "/images/products/the-sunday/the-sunday-right.png" },
    ],
    description: "Sundays are sacred. This hat knows that. White and black snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "Sundays are sacred. This hat knows that.",
  },
  {
    name: "The Provider",
    handle: "the-provider",
    series: "Legacy Series",
    colorway: "Camo / Blue",
    price: 45,
    units: 21,
    swatches: ["#4A5D3A", "#2A4A6B"],
    variantId: "gid://shopify/ProductVariant/the-provider",
    images: [
      { angle: "Front", src: "/images/products/the-provider/the-provider-front.png" },
      { angle: "Back", src: "/images/products/the-provider/the-provider-back.png" },
      { angle: "Left Side", src: "/images/products/the-provider/the-provider-left.png" },
      { angle: "Right Side", src: "/images/products/the-provider/the-provider-right.png" },
    ],
    description: "Quiet work. Loud results. That\u2019s what providers do. Camo and blue snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "Quiet work. Loud results. That\u2019s what providers do.",
  },
  {
    name: "The Builder",
    handle: "the-builder",
    series: "Legacy Series",
    colorway: "Tan / Camo",
    price: 45,
    units: 21,
    swatches: ["#C4A97D", "#4A5D3A"],
    variantId: "gid://shopify/ProductVariant/the-builder",
    images: [
      { angle: "Front", src: "/images/products/the-builder/the-builder-front.png" },
      { angle: "Back", src: "/images/products/the-builder/the-builder-back.png" },
      { angle: "Left Side", src: "/images/products/the-builder/the-builder-left.png" },
      { angle: "Right Side", src: "/images/products/the-builder/the-builder-right.png" },
    ],
    description: "Built something from nothing. This is what that looks like. Tan and camo snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "Built something from nothing. This is what that looks like.",
  },
  {
    name: "The Girl Dad",
    handle: "the-girl-dad",
    series: "Legacy Series",
    colorway: "Camo / Pink",
    price: 45,
    units: 20,
    swatches: ["#4A5D3A", "#D4899B"],
    variantId: "gid://shopify/ProductVariant/the-girl-dad",
    images: [
      { angle: "Front", src: "/images/products/the-girl-dad/the-girl-dad-front.png" },
      { angle: "Back", src: "/images/products/the-girl-dad/the-girl-dad-back.png" },
      { angle: "Left Side", src: "/images/products/the-girl-dad/the-girl-dad-left.png" },
      { angle: "Right Side", src: "/images/products/the-girl-dad/the-girl-dad-right.png" },
    ],
    description: "She changed everything. This one\u2019s for her. Camo and pink snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "She changed everything. This one\u2019s for her.",
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getOtherProducts(handle: string): Product[] {
  return products.filter((p) => p.handle !== handle).slice(0, 4);
}
