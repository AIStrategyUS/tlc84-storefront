# Rebuild tlc84.com as a modern direct-to-consumer storefront

## Your role

You are a senior front-end engineer and UX designer who has shipped direct-to-consumer ecommerce sites for personalized-product brands (custom photo gifts, print-on-demand, wedding stationery). You think in terms of conversion, mobile-first layouts, and making a custom product feel tangible before the customer pays. You write clean, lean code and you do not over-engineer.

## Context

The client is The Legacy Collective (tlc84.com), a family-run Tennessee business that makes custom photo magnets, keychains, and pins, sells gift collections (faith-based, sports fan, birth-month flower, holiday), and runs onsite "magnet-making" events at weddings, showers, and parties.

Read `tlc84-site-reference.md` in the repo root before writing any code. It contains the brand colors, fonts, logo, the full catalog with slugs and image IDs, all known pricing, policies, service tiers, and the "Our Story" copy. Treat it as the source of truth for data.

The current site is a Wix template with serious problems you are fixing:
- Every page is set to noindex, so Google cannot see the store
- The product page has two fields both labeled "Quantity" (one is the price tier, one is the cart count), so customers can accidentally order 16 magnets instead of 4
- A single "Choose Image" button regardless of pack size, so there is no way to upload 8 photos for an 8-pack
- No prices on product cards, one giant junk-drawer filter panel, duplicated sections, 1.47 MB homepage that paints blank on first load
- No reviews, no location, no trust signals, phone-snapshot product photos
- An unrelated bookkeeping service mixed into the homepage (we are removing it entirely)

## Goal

Build a production-quality mockup of a replacement site that:
1. Looks and feels like a modern D2C brand a customer would trust with their credit card
2. Lets a shopper upload a photo and see it rendered on any custom product (magnet, keychain, pin, save-the-date, logo magnet) before buying, with the correct number of photo slots for the pack they chose
3. Has a complete, realistic add-to-cart, cart, checkout, and order-confirmation flow with a clearly labeled demo payment step
4. Keeps the onsite-event booking flow working the way it does today (three tiers, pick a date and time, confirm)
5. Deploys as a static site to GitHub Pages so it can be shared by link with the client

## Stack (keep it lean)

- Vite + React 18 + TypeScript (strict) + Tailwind CSS
- React Router with BrowserRouter. For GitHub Pages deep links, copy `dist/index.html` to `dist/404.html` in the build script and set Vite `base` to `/<repo-name>/` (read the repo name from `package.json` or an env var so it is not hardcoded in two places)
- Cart state: React context + useReducer, persisted to localStorage
- Photo handling: fully client-side (FileReader / object URLs / canvas). Nothing is uploaded anywhere in the mockup
- No backend, no database, no auth, no login. Checkout is mocked
- Fonts: Fraunces (Google Fonts) for display headings, Figtree for body and UI
- Icons: lucide-react
- Optional: `react-easy-crop` for the customizer if it saves meaningful time; otherwise implement pan/zoom with CSS transforms. `qrcode` package for client-side QR generation on the Logo/QR product
- Deployment: a GitHub Actions workflow that builds on push to `main` and deploys to GitHub Pages using the official `actions/deploy-pages` action. Remind the user in the README that they must set Pages source to "GitHub Actions" in repo settings

## Design system

Use the brand tokens from the reference file: cream `#FFFAF1` background, forest green `#17371A` primary, mid green `#3F7652` accents, sage `#D4E9CF` section tints, gray-green `#E1E7E3` borders. Define them as Tailwind theme colors, not inline hex.

Direction: warm, editorial, handmade-but-professional. Generous whitespace, large product imagery, softly rounded cards, one serif display face used sparingly for headlines. Think Minted or Artifact Uprising, not Etsy. Avoid anything that reads as a template: no gradient hero with white text over a stock photo, no purple, no card grids with identical drop shadows everywhere.

Mobile-first. Design at 375px first, then 768px and 1280px. Most of this client's traffic will come from Instagram and Facebook on phones.

## Site map

- `/` Home
- `/shop` All products with category chips: Custom, Gifts, Faith, Sports, Pins, Baby
- `/shop/:category`
- `/product/:slug`
- `/events` Onsite magnet making, three tiers, leads into booking
- `/events/book` Booking flow
- `/bulk` Business and bulk orders with quote request
- `/about` Our Story
- `/cart`
- `/checkout`
- `/order/:orderId` Confirmation
- `/contact`
- `/policies` Shipping, returns, privacy, terms as anchored sections

Sticky header: logo, Shop, Events, Bulk, About, cart icon with count. No "Log In." Footer: logo, email, Instagram, Facebook, "Family-made in Middle Tennessee," policy links.

## Catalog simplification

Collapse the separate 2.25" and 3" listings into single products with a Size selector. Model the catalog as a typed data file (`src/data/catalog.ts`) with a product type that supports: sizes, pack tiers with prices, option groups (month, verse design, sport, role, blanket color), and a `customizable` flag with slot count derived from the pack.

Products to include:
1. Custom Photo Magnets: size 2.25" or 3", pack 1 / 4 / 8, per-slot photo upload. Pricing: 3" is $6.98 / $24 / $40. 2.25" is $4.98 single; use $16 / $28 for 4 and 8 as placeholder tiers and flag them as assumptions
2. Custom Photo Keychains: 2.25", same pack structure
3. Custom Photo Pins: 3", pack 1 / 4 / 8 at $6.98 / $24 / $40
4. Save the Date Magnets: size, bulk tiers 50 / 100 / 200 (3": $196 / $249 / $349, 2.25": $149 / $199 / $299), photo upload plus names and date text overlay
5. Logo / QR Code Magnets: size, same bulk tiers, upload a logo or paste a URL to generate a QR code rendered on the magnet
6. Birth Month Flower Magnets: month select, size
7. Bible Verse Magnets: design select from the verse list, size, "set of 3" option at $16
8. Sport Fan Magnets and Pins: one product with sport select, role select (Athlete / Mom / Dad / Grandma / Grandpa), size, and magnet-or-pin toggle
9. Patriotic Magnets, Christmas Coloring Magnets, Punny Magnet Gift Set ($16), ABC 123 Magnet Kit ($42, or $46 with custom name)
10. Baby Blanket: $40, color select from the reference list

Gift wrapping is a $2 add-on available on any item in the cart.

## The customizer (this is the centerpiece, spend the most effort here)

- Upload by drag-and-drop or tap. Use `accept="image/*"` so phones offer the camera and photo library
- The photo renders immediately inside a photorealistic circular product frame: thin metal rim, subtle gloss highlight arc, soft drop shadow. Keychains add a ring at the top. Pins show a small pin-back badge. Show 2.25" and 3" at their true relative scale so the size choice is obvious
- Drag to reposition, pinch or scroll to zoom, a rotate-90 button, and a reset button. Must work with touch
- Photo quality check: if the image's shorter side is under 600px for 2.25" or under 800px for 3", show an inline warning: "This photo may print blurry. A larger photo will look sharper." This mirrors the client's no-refund-for-low-res policy, so it protects both sides
- Pack of N shows N slots in a grid. Each slot is independently editable. A "use this photo for all slots" shortcut is available
- Live price shows the pack total and the per-item price with savings versus buying singles ("$5.00 each, save 28%")
- On Add to Cart, store the crop parameters and generate a thumbnail with canvas `toDataURL` so the cart and confirmation show exactly what the customer made
- Save-the-Date adds name and date text fields rendered on the preview. Logo/QR adds a URL field that generates the QR live

## Shop and product pages

- Product cards always show the starting price ("from $4.98"), a size badge, and a hover or tap secondary image where one exists
- Category chips instead of a filter sidebar. One sort dropdown. That is all the filtering this catalog needs
- Product page: gallery on the left (customizer replaces the gallery for customizable products), title, price, size selector, pack selector as visual tiles not a dropdown, options, then Add to Cart. Below: details, "how it's made," shipping and returns, and a "you might also like" row
- One quantity control per product page. The pack tile is the quantity for custom products; for simple products it is a plain stepper

## Cart and checkout

- Cart opens as a slide-over drawer from the header, with a full `/cart` page as well
- Line items show the custom thumbnail, size, pack, options, an "Edit" link back to the customizer with state restored, quantity, gift wrap toggle, remove
- Subtotal, estimated shipping (flat $5.95 under $35, free at $35 and over; flag the threshold as an assumption), free-shipping progress bar
- Checkout is a single page: contact, shipping address, shipping method, payment. Payment fields are mock card inputs with format-only validation and a visible banner: "Demo checkout. No payment is processed and nothing is stored." Order summary is sticky on desktop and collapsible on mobile
- Confirmation page: order number, the custom thumbnails, a "what happens next" timeline (processed within 1 business day after we receive your photos, ships in 3 to 5 business days), and a "share your magnets" nudge to Instagram

## Events booking

Mirror the current flow. `/events` explains the service with the three tiers (up to 50 guests, 2 hr, $375; up to 100, 2 hr, $750; up to 200, 3 hr, $925), what is included, and how it works in three steps. Service area: Middle Tennessee, with a "contact us for other areas" line.

`/events/book`: choose tier, pick a date from a calendar showing the next 90 days (weekends highlighted, a handful of mock unavailable dates), pick a time slot, enter event details (event type, venue address, guest count, contact info), review, confirm. Confirmation page shows a mock booking reference. Include a code comment and a README note that production would connect this to a real scheduling and deposit provider.

## Bulk and business

`/bulk` is for a different buyer: realtors, churches, schools, teams, small businesses ordering logo, QR, save-the-date, or team magnets in volume. Tier pricing table for 50 / 100 / 200, three short use-case examples, and a request-a-quote form (company, quantity, product, artwork upload, needed-by date). Form submission shows a success state; nothing is sent.

## Trust layer

- Reviews block on the homepage and product pages using 3 or 4 placeholder reviews. Mark them clearly in code with a `// TODO: replace with real reviews` comment; do not invent customer names that look real, use "Sarah M." style
- A promise strip near the top of the homepage: "Family-made in Middle Tennessee," "Ships in 3 to 5 days," "Photo quality guarantee"
- FAQ accordion on the homepage and product pages: photo requirements, turnaround, bulk orders, events
- Reuse the "Our Story" copy from the reference file verbatim on `/about` with the family photo

## Photography and imagery

Download the existing product images referenced in the reference file into `public/images/products/` (they are the client's own photos) and use them as placeholders. For products with no image, render a stylized SVG magnet: a circle in brand colors with the design name or verse set in the display font. Write `docs/PHOTO-SHOT-LIST.md` listing the 8 to 10 product shots the client needs to take, with framing notes, so real photography can drop in without layout changes.

## Copy

Write all copy as a D2C copywriter: short, benefit-led, warm, specific. Every product gets a one-line hook and three bullet details. No filler, no exclamation-point enthusiasm, no clichés like "unleash your creativity." Use plain hyphens; do not use em dashes anywhere in UI text.

## Quality bar

- `npm run build` is clean, TypeScript strict, zero console errors or warnings in the browser
- Lighthouse mobile scores of 90 or better on performance, accessibility, and SEO. Proper `<title>` and meta description per route, Open Graph tags, no noindex, a `sitemap.xml`, and JSON-LD Product schema on product pages
- All interactive elements keyboard accessible with visible focus states. Alt text on every image. Touch targets at least 44px
- Verified at 375px, 768px, and 1280px
- No dead links. Every CTA leads somewhere real in the mockup
- Images lazy-loaded and sized; logo as SVG if you can trace it cleanly, otherwise the PNG

## Process

Work in phases and stop at the end of each one for review before continuing. At the end of each phase, run the build, commit with a clear message, and report what was done, what you assumed, and what you want checked.

Before Phase 1, write `docs/ASSUMPTIONS.md` listing every assumption you are making (pricing gaps, shipping threshold, unavailable event dates, etc.). Do not ask questions before starting unless you are truly blocked; make a sensible call and log it there.

- Phase 1: scaffold, Tailwind theme with brand tokens, fonts, header and footer shell, homepage, GitHub Actions deploy workflow, README with setup and Pages instructions. Push and confirm the live GitHub Pages URL renders
- Phase 2: catalog data model, shop pages, product page, the customizer
- Phase 3: cart drawer, cart page, checkout, confirmation
- Phase 4: events and booking, bulk, about, contact, policies, trust layer, SEO polish, `docs/PHOTO-SHOT-LIST.md`, and a `docs/GOING-LIVE.md` explaining how to make this a real store (Stripe Checkout plus a serverless upload endpoint to S3 or Cloudinary for the photos, or a Shopify Storefront API backend), with a rough effort estimate for each

Start with Phase 1.
