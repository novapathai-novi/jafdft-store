export type Product = {
  name: string;
  handle: string;
  series: string;
  colorway: string;
  price: number;
  units: number;
  swatches: string[];
  variantId: string;
  sortOrder: number;
  numberRange: string;
  images: { angle: string; src: string }[];
  lifestyle: string;
  description: string;
  quote: string;
};

const products: Product[] = [
  {
    name: "The Sunday",
    handle: "the-sunday",
    series: "Flagship Series",
    colorway: "White / Black",
    price: 40,
    units: 21,
    swatches: ["#F2EDE4", "#0A0A0A"],
    variantId: "gid://shopify/ProductVariant/the-sunday",
    sortOrder: 5,
    numberRange: "101–125",
    images: [
      { angle: "Front", src: "/images/products-v2/the-sunday/1-the-sunday-front.jpg" },
      { angle: "Left", src: "/images/products-v2/the-sunday/2-the-sunday-left.jpg" },
      { angle: "Right", src: "/images/products-v2/the-sunday/3-the-sunday-right.jpg" },
      { angle: "Back", src: "/images/products-v2/the-sunday/4-the-sunday-back.jpg" },
      { angle: "Detail Right", src: "/images/products-v2/the-sunday/5-the-sunday-det-right.jpg" },
      { angle: "Detail Left", src: "/images/products-v2/the-sunday/6-the-sunday-det-left.jpg" },
    ],
    lifestyle: "/images/lifestyle/pdp-portrait/the-sunday-lifestyle.jpg",
    description: "Sundays are sacred. This hat knows that. White and black snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "Sundays are sacred. This hat knows that.",
  },
  {
    name: "The Standard",
    handle: "the-standard",
    series: "Flagship Series",
    colorway: "All Black",
    price: 40,
    units: 21,
    swatches: ["#0A0A0A"],
    variantId: "gid://shopify/ProductVariant/48045237240052",
    sortOrder: 1,
    numberRange: "001–025",
    images: [
      { angle: "Front", src: "/images/products-v2/the-standard/1-the-standard-front.jpg" },
      { angle: "Left", src: "/images/products-v2/the-standard/2-the-standard-left.jpg" },
      { angle: "Right", src: "/images/products-v2/the-standard/3-the-standard-right.jpg" },
      { angle: "Back", src: "/images/products-v2/the-standard/4-the-standard-back.jpg" },
      { angle: "Detail Right", src: "/images/products-v2/the-standard/5-the-standard-det-right.jpg" },
      { angle: "Detail Left", src: "/images/products-v2/the-standard/6-the-standard-det-left.jpg" },
    ],
    lifestyle: "/images/lifestyle/pdp-portrait/the-standard-lifestyle.jpg",
    description: "The one that started it all. No flash. Just standard. All-black snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "The one that started it all. No flash. Just standard.",
  },
  {
    name: "The Girl Dad",
    handle: "the-girl-dad",
    series: "Legacy Series",
    colorway: "Camo / Pink",
    price: 40,
    units: 20,
    swatches: ["#4A5D3A", "#D4899B"],
    variantId: "gid://shopify/ProductVariant/the-girl-dad",
    sortOrder: 3,
    numberRange: "051–075",
    images: [
      { angle: "Front", src: "/images/products-v2/the-girl-dad/1-the-girl-dad-front.jpg" },
      { angle: "Left", src: "/images/products-v2/the-girl-dad/2-the-girl-dad-left.jpg" },
      { angle: "Right", src: "/images/products-v2/the-girl-dad/3-the-girl-dad-right.jpg" },
      { angle: "Back", src: "/images/products-v2/the-girl-dad/4-the-girl-dad-back.jpg" },
      { angle: "Detail Right", src: "/images/products-v2/the-girl-dad/5-the-girl-dad-det-right.jpg" },
      { angle: "Detail Left", src: "/images/products-v2/the-girl-dad/6-the-girl-dad-det-left.jpg" },
    ],
    lifestyle: "/images/lifestyle/pdp-portrait/the-girl-dad-lifestyle.jpg",
    description: "She changed everything. This one\u2019s for her. Camo and pink snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "She changed everything. This one\u2019s for her.",
  },
  {
    name: "The Provider",
    handle: "the-provider",
    series: "Legacy Series",
    colorway: "Camo / Blue",
    price: 40,
    units: 21,
    swatches: ["#4A5D3A", "#2A4A6B"],
    variantId: "gid://shopify/ProductVariant/the-provider",
    sortOrder: 4,
    numberRange: "076–100",
    images: [
      { angle: "Front", src: "/images/products-v2/the-provider/1-the-provider-front.jpg" },
      { angle: "Left", src: "/images/products-v2/the-provider/2-the-provider-left.jpg" },
      { angle: "Right", src: "/images/products-v2/the-provider/3-the-provider-right.jpg" },
      { angle: "Back", src: "/images/products-v2/the-provider/4-the-provider-back.jpg" },
      { angle: "Detail Right", src: "/images/products-v2/the-provider/5-the-provider-det-right.jpg" },
      { angle: "Detail Left", src: "/images/products-v2/the-provider/6-the-provider-det-left.jpg" },
    ],
    lifestyle: "/images/lifestyle/pdp-portrait/the-provider-lifestyle.jpg",
    description: "Quiet work. Loud results. That\u2019s what providers do. Camo and blue snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "Quiet work. Loud results. That\u2019s what providers do.",
  },
  {
    name: "The Builder",
    handle: "the-builder",
    series: "Legacy Series",
    colorway: "Tan / Camo",
    price: 40,
    units: 21,
    swatches: ["#C4A97D", "#4A5D3A"],
    variantId: "gid://shopify/ProductVariant/the-builder",
    sortOrder: 2,
    numberRange: "026–050",
    images: [
      { angle: "Front", src: "/images/products-v2/the-builder/1-the-builder-front.jpg" },
      { angle: "Left", src: "/images/products-v2/the-builder/2-the-builder-left.jpg" },
      { angle: "Right", src: "/images/products-v2/the-builder/3-the-builder-right.jpg" },
      { angle: "Back", src: "/images/products-v2/the-builder/4-the-builder-back.jpg" },
      { angle: "Detail Right", src: "/images/products-v2/the-builder/5-the-builder-det-right.jpg" },
      { angle: "Detail Left", src: "/images/products-v2/the-builder/6-the-builder-det-left.jpg" },
    ],
    lifestyle: "/images/lifestyle/pdp-portrait/the-builder-lifestyle.jpg",
    description: "Built something from nothing. This is what that looks like. Tan and camo snapback with embroidered JAFDFT branding and individually numbered tag.",
    quote: "Built something from nothing. This is what that looks like.",
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getOtherProducts(handle: string): Product[] {
  return products.filter((p) => p.handle !== handle).slice(0, 4);
}
