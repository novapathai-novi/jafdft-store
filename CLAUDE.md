# JAFDFT Website — Claude Code Project Brief

Read this file completely before touching any code. This is the single source of truth.

## Architecture
- Frontend: Next.js 14 + Tailwind CSS — fully custom
- Cart + Checkout: Shopify Storefront API ONLY
- Hosting: Vercel (novapath team)
- Domain: jafdft.com
- GitHub: novapathai-novi

## Shopify Credentials
- Store: jafdft.myshopify.com
- Storefront API token: 57b3942f8576f581f5f1094b4ed0de7b

## .env.local
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=jafdft.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=57b3942f8576f581f5f1094b4ed0de7b

## Design System
Fonts: Bebas Neue (display), Playfair Display Italic (editorial), DM Sans (body), Space Mono (labels)
Colors:
- Background: #FAF7F2
- Off-white panels: #F2EDE4
- Black: #0A0A0A
- Cognac accent: #C8905A
- Text muted: #7a7570
- Border: rgba(0,0,0,0.09)
Theme: Light only. No dark mode.

## Products — Drop 001
- The Standard | the-standard | Flagship | $45 | 21 units
- The Sideline | the-sideline | Flagship | $45 | 21 units
- The Sunday | the-sunday | Flagship | $45 | 21 units
- The Provider | the-provider | Legacy | $45 | 21 units
- The Builder | the-builder | Legacy | $45 | 21 units
- The Girl Dad | the-girl-dad | Legacy | $45 | 20 units
All: One Size, Snapback, individually numbered 1-125

## Images Location
~/Desktop/Claude/Projects/Fartherly Things/Jafdft-images/
- products/the-standard/ (front, back, left, right, tag, underbrim, label)
- products/the-sideline/
- products/the-sunday/
- products/the-provider/
- products/the-builder/
- products/the-girl-dad/
- brand/logos/ (12 logo files)

## Pages to Build
1. / — Homepage
2. /collections/all — Collection grid
3. /products/[handle] — Dynamic PDP
4. /our-story
5. /papa-charlie

## Homepage Sections
1. Nav — sticky, backdrop blur, JAFDFT wordmark, Cart
2. Hero — dark bg, "Drop 001. 125 hats. Each one numbered."
3. Product Showcase — split panel, 6 hats, scrollable, marquee, dots+arrows
4. Brand Statement — Presence · Precision · Standard
5. T-Shirt Drop — dark section, countdown, email capture
6. Footer — large JAFDFT wordmark

## PDP Layout
Left: 4 stacked image panels (Front/Back/Left/Right) Kith-style
Right: Sticky panel — series tag, name, price, Papa Charlie badge, swatches, Add to Cart (always visible black button), accordions, guarantees

## Icons
All custom thin SVG — 1.5px stroke, round linecaps, cognac color.
NEVER use emojis as icons.

## Key Copy
Hero: "Drop 001. 125 hats. Each one numbered."
Tagline: "Just A Father Doing Fatherly Things. Est. MMXVIII."
Scarcity: "21 available. When they're gone, they're gone."
Brim line: "Flip the brim. EST MMXVIII. That's when it started."

## Our Story
"2018. Charlie was born. A friend asked Demetrie what he'd been up to lately. He said: 'I'm just a father, man. Doing fatherly things.' Those words weren't planned. They weren't a pitch. They were just true. EST MMXVIII. That's when it started. That's what's on the brim."

## Papa Charlie
"Charlie arrived. I became Papa Charlie. She didn't just give me a name — she gave me a purpose. Every hat in this drop is my design. Built for the fathers who are locked in and show up. This is what that looks like."

## Build Order
1. .env.local with Shopify credentials
2. lib/shopify.ts — Storefront API client
3. Nav component
4. Homepage — section by section
5. Collection page
6. Product detail page (dynamic)
7. Our Story + Papa Charlie pages
8. Cart integration — CartProvider, Add to Cart, checkout redirect
9. Copy images to public/images/
10. Deploy to Vercel

## Deployment
Team: novapath | Account: novapath.ai@gmail.com
vercel --prod
Add env vars in Vercel dashboard before first deploy.
