# The Legacy Collective (tlc84.com) - Site Reference

Extracted from the live Wix site on 2026-09-27. Use as source data for the rebuild. Do not reuse Wix markup; the current page is 1.47 MB of HTML.

## Business summary
- Family-run, Tennessee-based maker of custom photo magnets, keychains, and pins. Started at local craft shows in memory of "Papa."
- Three revenue lines on the site today: (1) online product sales, (2) onsite magnet-making events (weddings, showers, birthdays, corporate), (3) QuickBooks bookkeeping by Jennifer (Certified QuickBooks ProAdvisor).
- Contact: thelegacycollective84@gmail.com. Instagram @tlc842025. Facebook page id 61579779443234.
- Tagline in use: "Rooted in Love, Growing in Purpose" / "Hand crafted goods & services to cultivate an everlasting legacy."

## Brand tokens (from computed styles on the live site)
Colors
- Cream background: #FFFAF1 (rgb 255,250,241)
- Forest green (primary, buttons, headings): #17371A (rgb 23,55,26)
- Mid green (accents, badges): #3F7652 (rgb 63,118,82)
- Sage tint (section backgrounds): #D4E9CF (rgb 212,233,207)
- Gray-green (cards, borders): #E1E7E3 (rgb 225,231,227)
- Deep green (text on light): #052812 (rgb 5,40,18)
- White: #FFFFFF

Fonts currently used
- Display serif: Fraunces (120pt Light) for large headings
- Body/UI: Avenir Light and Futura Book (Wix-hosted); fallback Helvetica/Arial
- Suggested open-source equivalents: Fraunces (Google Fonts, keep), Inter or Figtree for body

Logo
- Circular line-art wreath with sunflowers, script "Legacy" and small caps "COLLECTIVE" inside.
- File: https://static.wixstatic.com/media/b32584_27cd1159d37040358b85675635beee41~mv2.png

## Current site structure
- Nav: About (anchors to home), Contact (anchors to home), Book Online, Shop, Log In, Cart
- Home: hero (renders blank on first paint), Featured Product grid, Our Story, Building the Legacy (3 cards: Handcrafted Gifts / Onsite Magnet Events / Accounting), Get in Touch form, footer
- /shop: category sections (Custom Magnets section is rendered twice), then a filterable grid with a single junk-drawer filter panel (Color Variation, Customize, Design, Gift Set, Gift Wrapping, Month, Quantity, Sport all shown at once)
- /product-page/<slug>: image, description, TWO fields both labeled "Quantity *" (one is the price-tier dropdown, one is the cart counter), single "Choose Image" upload regardless of pack size, Add to Cart, accordions (Product Info, Return & Refund, Shipping)
- /book-online: three service cards with Book Now
- /booking-form: empty without JS
- Footer: logo, email, social icons, Privacy / Accessibility / Shipping / Terms / Refund links

## Catalog (name | slug | image id on static.wixstatic.com/media/ | known pricing)
Custom (photo / logo / date)
- 3" Custom Photo Magnets | 3-inch-custom-photo-magnets | 3a584e_7f56c358dd51421dadd11ca5603d50d7~mv2.jpg | 1 for $6.98, 4 for $24.00, 8 for $40.00
- 2.25" Custom Photo Magnets | custom-photo-magnets | 3a584e_599539b6b31a4cd59fa8cb4804da45dd~mv2.jpg | 1 for $4.98 (4/6/12 tiers exist, prices not shown in grid)
- 2.25" Custom Photo Keychains | 2-25-custom-photo-keychains | 3a584e_6a276e1252c1457da31592892949a320~mv2.jpg
- 3" Save the Date Magnets | 3-inch-save-the-date-magnets | 3a584e_06d96facaa3843afa7d07216367dde6f~mv2.jpg | bulk tiers 50/$196, 100/$249, 200/$349
- 2.25" Save the Date Magnets | save-the-date-magnet-single | 3a584e_c32f36544bdf41f5b079c72d9f099a51~mv2.jpg | bulk tiers 50/$149, 100/$199, 200/$299
- 3" Logo/QR Code Magnet | personalized-qr-code-magnets | 3a584e_dbf0a0a76d7f4aee9bba49a321f6604b~mv2.jpg | bulk tiers as above
- 2.25" Logo/QR Code Magnets | 2-25-logo-qr-code-magnets | 3a584e_dbf0a0a76d7f4aee9bba49a321f6604b~mv2.jpg
- 3" Birth Month Flower Magnets | 3-birth-month-flower-magnet | month options at $6.98
- 2.25" Birth Month Flower Magnets | 2-25-birth-flowers-magnets | month options at $4.98
- 3" Patriotic Magnets (NEW) | 3-patriotic-magnets
- Christmas Coloring Magnets | christmas-coloring-magnets
- ABC 123 Magnet Kit | abc-123-magnet-kit | Kit $42.00, Kit with custom name $46.00
- 2.25" Punny Magnet Gift Set | 2-25-punny-magnet-gift-set | Gift set of six $16.00

Faith Based Magnets
- 2.25" Bible Verse Magnet Set - Favorite Verse 2026 | 2-25-bible-verse-magnet-set-favorite-verse-2026
- 3" Bible Verse Magnets - Favorite Verse 2026 | 3-bible-verse-magnets-favorie-verse-2026
- 3" Floral - Love, Grace, Joy Magnets | 3-floral-love-grace-joy-magnets
- 3" Love, Grace, Joy Magnets | 3-love-grace-joy-magnets
- 3" Bible Verse Magnets - Favorite Verse | 3-bible-verse-magnet-set-favorite-verse
- 3" Bible Verse Magnets - "YOU ARE" | bible-verse-magnets-you-are
- 2.25" Bible Verse Magnet Set - "YOU ARE" | you-are-bible-verse-magnet-set
- 2.25" Bible Verse Magnet Set - Favorite Verse | floral-bible-verse-magnet-set
- 2.25" Elegant Bible Verse Magnet Set | elegant-bible-verse-magnet-set
- Design options seen: Always Loved, Be Still, Beautiful, Chosen, Enough, Faith over Fear, Fearfully & Wonderfully Made, Grace, Joy, Love, Love Never Fails, Rejoice Always, Strong, Victorious, Walk by Faith; set of 3 $16.00

Sports Magnets (sport options: Band, Baseball, Basketball, Cheer, Football, Soccer, Volleyball, Other)
- 3" Sport Magnets | 3-inch-sports-magnets
- 2.25" Sport Magnets | athlete-magents
- 3" Mom Sport Magnets | mom-sport-magnets
- 2.25" Mom Sport Magnets | 2-25-inch-mom-sport-magnets
- 3" Dad Sport Magnets | dad-sport-magnets
- 2.25" Dad Sport Magnets | 2-25-inch-dad-sport-magnets
- 3" Grandma Sport Magnets | grandma-sport-magnets
- 3" Grandpa Sport Magnets | grandpa-sport-magnets

Pins (3" only; 1 pin $6.98, 4 pins $24.00, 8 pins $40.00)
- 3" Custom Pins | 3-custom-pins
- 3" Sport Pins | 3-inch-sports-pins
- 3" Custom Sport Pins | custom-sport-pins
- 3" Dad Sport Pins | 3-inch-dad-sport-pins
- 3" Mom Sport Pins | 3-inch-mom-sport-pins

Baby Blankets
- Baby Blankets | baby-blankets | 3a584e_09886de7980e4ed69bb79104012a5a81~mv2.png | $40.00, Minky polka dot both sides, approx 27" x 30"
- Color options: Baby Blue & Baby Blue, Baby Blue & Gray, Baby Blue & White, Pink & Gray, Pink & Pink, Pink & White, Seafoam & Gray, Seafoam & White, Yellow & Gray, Yellow & White, Yellow & Yellow, Blue/Pink/Purple Color Splash, White

Add-ons seen: Gift Wrapping $2.00

## Services (Onsite Magnet Making)
- Up to 50 guests: 2 hr, $375
- Up to 100 guests: 2 hr, $750
- Up to 200 guests: 3 hr, $925
- Pitch: "We will be there at your next Birthday, Anniversary, Baby Shower, Bridal Shower, or Wedding to capture your special moments and transform them into cherished keepsake magnets."

## Product spec copy (reusable)
- Shape: Round. Sizes: 2.25" and 3". Sturdy metal base with strong magnetic backing. High-gloss mylar covering.
- Photo magnet description: "Turn your favorite memories into keepsakes you can see every day... Printed in vibrant, full color with a glossy finish..."

## Policies (reusable)
- Processing: within 1 business day after receiving images. USA delivery typically 3 to 5 business days. Bulk orders need extra production time.
- Damaged in transit: contact within 7 days with photos for replacement or refund.
- No refunds for customer-supplied photo quality (blur, low res, poor lighting). Recommend high-resolution images.
- Custom orders: no general returns or exchanges.
- Note: Baby Blanket page still shows Wix placeholder text for refund and shipping policies.

## Our Story copy (verbatim, reusable)
"Our story began with a simple desire: to honor the memory of our beloved Papa by creating something that would carry his spirit forward. What started with our mom and grandma sharing their crafts at local shows has grown into a vision much bigger than us. We believe each of us has unique gifts, whether it's creativity, precision, or care, and together, those gifts can build something that lasts. This business is more than products or services; it's about legacy, purpose, and connection. By blending artistry, skill, and heart, we hope to serve our community today while creating a foundation that endures for generations."

## Technical notes on the current site
- Wix, meta robots set to noindex on every page (site is invisible to Google)
- 1.47 MB HTML on the homepage; hero paints blank on first load
- Product cards in the grid show no price
- No sitewide address or phone; no reviews or social proof anywhere
- Photos are phone snapshots of finished magnets on tables, not product photography
