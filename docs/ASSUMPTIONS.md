# Assumptions

This file lists every place where the brief or `tlc84-site-reference.md` did not
give a firm answer and a call had to be made to keep moving. Nothing here
blocked the build; if any of these are wrong, they are narrow, isolated
changes (mostly `src/data/catalog.ts`, `src/lib/shipping.ts`, or
`src/data/events.ts`).

## Deployment

- **Repo name / visibility / account**: created as a **public** repo named
  `tlc84-storefront` under the `AIStrategyUS` GitHub account, per the
  client's explicit answer during Phase 1 kickoff (not a guess). Free
  GitHub accounts can only serve Pages from a public repo, so the mockup
  code and this repo are visible to anyone with the link. There is no real
  backend, payment processing, or customer data in the repo, so this is low
  risk for a demo.
- **Package manager**: npm (no preference stated).
- **Branch name**: `main`, matching the GitHub Actions trigger described in
  the brief.

## Pricing gaps

- **2.25" Custom Photo Magnets, pack of 4 / 8**: the brief explicitly calls
  these out as placeholders — $16 / $28 — used as written. The live site's
  reference notes a 4/6/12 tier structure with no visible prices; the brief's
  instruction to standardize on 1/4/8 packs (matching the 3" product) takes
  precedence.
- **Custom Photo Keychains**: no keychain-specific pricing exists anywhere in
  the reference. Assumed identical to 2.25" Custom Photo Magnets: $4.98 / $16
  / $28 for packs of 1 / 4 / 8.
- **Logo / QR Code Magnets bulk pricing**: the brief says "same bulk tiers as
  above," read as reusing the Save-the-Date tiers exactly (3": $196 / $249 /
  $349, 2.25": $149 / $199 / $299).
- **Birth Month Flower Magnets**: reference gives only a single-unit price per
  size ($6.98 / $4.98), no pack/bulk tiers. Modeled as size + month select
  with a plain quantity stepper (no bulk discount), not a pack-tile selector.
- **Bible Verse Magnets**: reference gives only the "set of 3, $16" bundle.
  Assumed a single magnet sells at the standard per-size price ($6.98 / $4.98)
  with "Set of 3 - $16" offered as an additional option alongside "Single."
- **Sport Fan Magnets & Pins**: no dedicated pricing in the reference.
  Assumed standard magnet/pin pricing by size and pack (1/4/8 at
  $6.98/$24/$40 for 3", $4.98/$16/$28 for 2.25"). Selecting "Pin" restricts
  size to 3" only, matching the catalog note that pins are 3"-only.
- **Patriotic Magnets & Christmas Coloring Magnets**: no pricing exists
  anywhere in the source material. Assumed standard magnet pricing by size
  and pack, same as Custom Photo Magnets.
- All other fixed-price items (Punny Magnet Gift Set $16, ABC 123 Kit $42 /
  $46 with a custom name, Baby Blanket $40) use the prices given verbatim.

## Shipping

- **Flat-rate threshold**: $5.95 flat shipping under $35 of subtotal, free at
  $35 and over, exactly as instructed by the brief and flagged there as an
  assumption. Threshold is evaluated against the merchandise subtotal
  including gift-wrap add-ons, before tax (no tax is modeled in this demo).

## Customizer

- **Quality-check thresholds**: shorter image side under 600px (2.25") or
  800px (3") triggers the inline blur warning, exactly as specified. This is
  a soft warning only; it never blocks Add to Cart.
- **Save-the-Date / Logo-QR text and URL fields** are demo-only overlays
  rendered with Canvas; no font-kerning or print-bleed simulation is
  attempted beyond what's visually convincing on screen.

## Events booking

- **Unavailable dates**: since there is no real scheduling backend, a fixed
  (not random) set of "already booked" dates is hardcoded across the next 90
  days so the calendar looks realistic and is stable between reloads/builds.
  A code comment marks exactly where a real provider (e.g. Calendly, Cal.com,
  or a custom API) would replace this list.
- **Booking reference format**: mock strings like `TLC-EVT-38214`, generated
  client-side, not persisted anywhere beyond `localStorage` for the
  confirmation page.
- **Deposit / payment on booking**: out of scope for the mockup per the
  brief; the booking flow ends at a confirmation screen with no payment
  step. `docs/GOING-LIVE.md` (Phase 4) will call out adding a deposit charge
  as a production requirement.

## Checkout

- **Order numbers**: mock strings like `TLC-100482`, generated client-side.
  Order records (line items, address, totals) are saved to `localStorage`
  keyed by order number, so the confirmation page survives a refresh
  instead of only working via one-time router state.
- **Card fields**: format-only validation (digit grouping, expiry not in the
  past, 3-4 digit CVC). No Luhn check, no real gateway, no data is persisted
  beyond the current session's `localStorage` order record. This is stated
  on-screen per the brief.
- **Shipping method**: the brief lists "shipping method" as one of checkout's
  four sections, but only ever specifies one flat-rate/free-over-$35 policy,
  no second (e.g. expedited) tier with its own price. Checkout shows that one
  method as a pre-selected, non-interactive option displaying the computed
  price, rather than inventing an unpriced second choice.
- **Tax**: not modeled. A real integration would need a tax service; noted in
  `docs/GOING-LIVE.md`.
- **Gift wrap**: the $2 add-on is applied per line item (once per cart row,
  not multiplied by that row's quantity), matching "available on any item in
  the cart" read as a per-item toggle rather than a per-unit charge.

## Content / assets

- **Logo**: the source PNG is a fine hand-drawn floral line illustration with
  soft shading on the sunflower center. That level of illustrative detail
  can't be traced into a clean, faithful SVG by hand without real
  vectorization tooling (the result would look noticeably worse than the
  original), so the PNG is used directly, resized to 480px wide and
  compressed (133 KB vs. the original 296 KB) with explicit width/height to
  avoid layout shift. The full-resolution original is kept at
  `docs/source-assets/logo-original.png` for reference. If the client has a
  vector source file (.ai/.eps/.svg) from their original designer, swapping
  it in later is a one-file change.
- **Product photography**: of the 7 images referenced in the reference file,
  5 are used as real placeholders (3" and 2.25" Custom Photo Magnets, 3" and
  2.25" Save the Date Magnets, Logo/QR Magnets). Two were downloaded but not
  used: the keychains photo actually shows text/quote keychains, not photo
  keychains (would misrepresent the product), and the baby blanket photo is
  a Wix marketing graphic with a "Baby Blankets" title and torn-paper border
  baked into the image itself, which would visually clash with this site's
  design. Both of those products use the stylized SVG placeholder instead.
  All originals are kept at `docs/source-assets/` in case the client wants
  them cropped or reused differently. `docs/PHOTO-SHOT-LIST.md` (Phase 4)
  lists what the client should shoot to replace every placeholder.
- **Reviews**: placeholder reviews use initials-style names ("Sarah M.") per
  the brief, clearly marked `// TODO: replace with real reviews` in code.

## Out of scope for this mockup (documented, not built)

- Real payment processing, real photo upload/storage, real email sending,
  real scheduling/deposit collection, tax calculation, inventory, and
  authentication are all mocked or omitted, as instructed. Each has a
  corresponding note and rough effort estimate in `docs/GOING-LIVE.md`
  (written in Phase 4).
