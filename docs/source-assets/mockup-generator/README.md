# Digital mockup generator

`mockup.html` is the source for the 8 stylized product photos used for
products that have no real photo anywhere in the reference material
(Custom Photo Pins, Birth Month Flower Magnets, Bible Verse Magnets, Sport
Fan Magnets and Pins, Patriotic Magnets, Christmas Coloring Magnets, Punny
Magnet Gift Set, ABC 123 Magnet Kit).

These are **not real product photos**. They're a CSS/SVG composition
designed to look consistent with the client's real photos (glossy circular
magnets, drop shadows, scattered on a warm neutral surface) while
depicting each product's actual theme, so the shop grid doesn't have a
jarring mix of real photos next to flat placeholder circles. They should
be replaced with real photography per `docs/PHOTO-SHOT-LIST.md` as soon as
the client can shoot it.

## How they were generated

Each product is a query-string variant of the same page
(`mockup.html?p=<product-slug>`), rendered to a 1200x1200 PNG with headless
Chrome and then compressed to JPEG:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --window-size=1200,1200 \
  --virtual-time-budget=2000 \
  --screenshot="birth-month-flower-magnets.png" \
  "file://$(pwd)/mockup.html?p=birth-month-flower-magnets"
```

The slugs recognized by the `layouts` object in `mockup.html` match the
product slugs in `src/data/catalog.ts` exactly.
