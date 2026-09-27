# Going live: what this mockup doesn't do yet

This is a static, client-side-only mockup. Nothing is actually charged,
uploaded, emailed, or scheduled. Here's what a real, transacting version of
this site needs, roughly in the order it would matter to a paying customer,
with a rough effort estimate for a developer who already knows this
codebase. Estimates assume no major design changes, just wiring the mockup
up to real services.

## 1. Payment processing — 3 to 5 days

Replace the mock card form in `src/pages/Checkout.tsx` with
**Stripe Checkout** (hosted) or **Stripe Elements** (embedded, closer to the
current look). Either way this needs a small backend: a serverless function
that creates a Checkout Session or PaymentIntent server-side (never trust a
client-computed total), and a webhook handler that confirms payment before
treating an order as placed. This is the single most important change:
nothing else here matters if the site can't actually charge a card.

## 2. Photo upload and storage — 4 to 6 days

Right now, uploaded photos live only in the browser (`localStorage` and
in-memory state) as base64 data URLs. A real order needs those photos on a
server so they survive past the browser session and can reach whoever
prints them. Two reasonable paths:

- **Serverless upload endpoint** (e.g. a Cloudflare Worker, AWS Lambda, or
  Vercel function) that accepts the image and crop parameters already
  computed by the customizer (`src/lib/image.ts` already does the crop math)
  and stores the result in **S3** or **Cloudinary**. Cloudinary is the
  faster path since it can also handle server-side image transforms.
- **Shopify Storefront API**, if the client would rather run the whole
  store on Shopify: product catalog, cart, and checkout move into Shopify,
  and this React app's customizer becomes a component embedded in a Shopify
  theme or a headless storefront. Bigger lift, but offloads inventory,
  payments, and order management to a platform built for it.

Either path also needs the print-resolution originals kept (not just the
1600px working copies this mockup stores), so whoever fulfills the order has
a file worth printing.

## 3. Order and customer data — 2 to 3 days

Orders currently live in the browser's `localStorage`
(`src/lib/orders.ts`), which means they vanish if the customer clears their
browser or switches devices, and the business owner has no way to see them
at all. This needs a real database (even a simple one, like a hosted
Postgres or a spreadsheet-backed API for something this size) and an
order-confirmation email (see below) so the customer has a record that
doesn't depend on their browser.

## 4. Transactional email — 1 to 2 days

Order confirmations, the contact form (`src/pages/Contact.tsx`), and the
bulk quote form (`src/pages/Bulk.tsx`) all currently just show a success
message and send nothing. Wire these to a transactional email service
(Postmark, Resend, or SendGrid) via a small serverless function.

## 5. Real event scheduling and deposits — 3 to 4 days

The booking calendar in `src/data/events.ts` and
`src/components/events/Calendar.tsx` uses a hardcoded, fake availability
list. A real version needs either a scheduling provider (Calendly, Cal.com)
embedded or driven via its API, or a custom availability table in a
database. The brief for a service like this typically also wants a deposit
collected at booking time, which folds into the Stripe integration above.

## 6. Tax calculation — 1 to 2 days

Not modeled anywhere in this mockup. Stripe Tax or a dedicated service
(TaxJar, Avalara) can compute this at checkout once real payments are wired
up; simplest to add at the same time as item 1.

## 7. SEO: prerendering for real per-page previews — 2 to 4 days

This site is fully client-rendered: a search engine or a social platform's
link-preview crawler that doesn't execute JavaScript sees only the generic
tags in `index.html`, not the per-page title/description this app sets at
runtime (`src/lib/useSeo.ts`) or the per-product JSON-LD
(`src/lib/useJsonLd.ts`). For a real launch, prerendering each route to
static HTML at build time (via a tool like `vite-plugin-ssg`,
`react-snap`, or moving to a framework with built-in SSG like Astro or
Next.js) would make titles, descriptions, Open Graph tags, and structured
data all actually visible to crawlers instead of only to a browser that
runs the JS. `sitemap.xml` and `robots.txt` already exist and don't need to
change.

## 8. Legal review of Privacy and Terms — not a dev task, but blocking

The Privacy and Terms sections on `/policies` are reasonable placeholder
language for a mockup, not reviewed legal text. Before this site collects
real names, addresses, and payment information, the client should have an
actual privacy policy and terms of service reviewed by a lawyer (or
generated via a reputable policy-generator service) given that it will
handle real customer PII.

## 9. Analytics — half a day

Nothing is currently tracked. Adding a privacy-respecting analytics tool
(Plausible, Fathom, or GA4 if the client prefers) is low effort and worth
doing before launch so the client can see what's actually happening on the
site.

## Rough total

Items 1 to 6 are the ones that make this an actual store: roughly **2 to 3
weeks** of focused development for someone already familiar with this
codebase, plus whatever time the legal review (item 8) takes on its own
track. Items 7 and 9 can happen before or after initial launch without
blocking it.
