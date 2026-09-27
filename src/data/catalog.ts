// Typed product catalog. Source data (pricing, options, copy) is drawn from
// tlc84-site-reference.md; every gap it left is logged in docs/ASSUMPTIONS.md.

export type Size = '2.25"' | '3"'

export type CategorySlug = 'custom' | 'gifts' | 'faith' | 'sports' | 'pins' | 'baby'

export interface PackTier {
  quantity: number
  /** Total price for this tier, in dollars. */
  price: number
}

export interface OptionChoice {
  value: string
  label: string
}

export interface OptionGroup {
  id: string
  label: string
  choices: OptionChoice[]
}

export interface TextField {
  id: string
  label: string
  placeholder: string
}

interface ProductCommon {
  slug: string
  name: string
  categories: CategorySlug[]
  /** One-line, benefit-led hook shown on the product page. */
  hook: string
  /** Exactly three supporting details, shown as bullets. */
  bullets: [string, string, string]
  /** Paths under /images/products/. Empty means "use the stylized SVG placeholder." */
  images: string[]
  /** Text rendered on the stylized SVG placeholder when `images` is empty. */
  placeholderLabel: string
}

/** Custom Photo Magnets, Keychains, Pins: N independently-photographed slots per pack. */
export interface PhotoPackProduct extends ProductCommon {
  kind: 'photo-pack'
  sizes: Size[]
  packTiers: Partial<Record<Size, PackTier[]>>
}

/** Save the Date and Logo/QR Magnets: one photo or logo, reproduced at bulk quantity. */
export interface PhotoBulkProduct extends ProductCommon {
  kind: 'photo-bulk'
  sizes: Size[]
  bulkTiers: Partial<Record<Size, PackTier[]>>
  logoOrQr?: boolean
  textFields?: TextField[]
}

/** Sport Fan, Patriotic, Christmas Coloring: pack pricing, but a fixed design, not a photo. */
export interface DesignPackProduct extends ProductCommon {
  kind: 'design-pack'
  sizes: Size[]
  packTiers: Partial<Record<Size, PackTier[]>>
  optionGroups: OptionGroup[]
  /** If true, choosing "Pin" restricts the size choice to 3" only. */
  magnetPinToggle?: boolean
}

/** Birth Month, Bible Verse: a single unit price by size, plus a design pick. */
export interface DesignSelectProduct extends ProductCommon {
  kind: 'design-select'
  sizes: Size[]
  unitPrice: Partial<Record<Size, number>>
  optionGroups: OptionGroup[]
  bundle?: { quantity: number; price: number; label: string }
}

/** Punny Gift Set, ABC Kit, Baby Blanket: one flat price, no size selector. */
export interface FixedProduct extends ProductCommon {
  kind: 'fixed'
  price: number
  optionGroups?: OptionGroup[]
  nameAddon?: { label: string; price: number }
}

export type Product =
  | PhotoPackProduct
  | PhotoBulkProduct
  | DesignPackProduct
  | DesignSelectProduct
  | FixedProduct

export function isPhotoProduct(p: Product): p is PhotoPackProduct | PhotoBulkProduct {
  return p.kind === 'photo-pack' || p.kind === 'photo-bulk'
}

const MONTHS: OptionChoice[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
].map((m) => ({ value: m.toLowerCase(), label: m }))

const VERSE_DESIGNS: OptionChoice[] = [
  'Always Loved', 'Be Still', 'Beautiful', 'Chosen', 'Enough', 'Faith over Fear',
  'Fearfully & Wonderfully Made', 'Grace', 'Joy', 'Love', 'Love Never Fails',
  'Rejoice Always', 'Strong', 'Victorious', 'Walk by Faith',
].map((v) => ({ value: v.toLowerCase().replace(/\s+/g, '-'), label: v }))

const SPORTS: OptionChoice[] = [
  'Band', 'Baseball', 'Basketball', 'Cheer', 'Football', 'Soccer', 'Volleyball', 'Other',
].map((s) => ({ value: s.toLowerCase(), label: s }))

const ROLES: OptionChoice[] = ['Athlete', 'Mom', 'Dad', 'Grandma', 'Grandpa'].map((r) => ({
  value: r.toLowerCase(),
  label: r,
}))

const BLANKET_COLORS: OptionChoice[] = [
  'Baby Blue & Baby Blue', 'Baby Blue & Gray', 'Baby Blue & White',
  'Pink & Gray', 'Pink & Pink', 'Pink & White',
  'Seafoam & Gray', 'Seafoam & White',
  'Yellow & Gray', 'Yellow & White', 'Yellow & Yellow',
  'Blue/Pink/Purple Color Splash', 'White',
].map((c) => ({ value: c.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label: c }))

// Standard magnet/pin pack pricing, reused across several products.
const MAGNET_3IN_TIERS: PackTier[] = [
  { quantity: 1, price: 6.98 },
  { quantity: 4, price: 24 },
  { quantity: 8, price: 40 },
]
const MAGNET_225IN_TIERS: PackTier[] = [
  { quantity: 1, price: 4.98 },
  { quantity: 4, price: 16 },
  { quantity: 8, price: 28 },
]
const BULK_3IN_TIERS: PackTier[] = [
  { quantity: 50, price: 196 },
  { quantity: 100, price: 249 },
  { quantity: 200, price: 349 },
]
const BULK_225IN_TIERS: PackTier[] = [
  { quantity: 50, price: 149 },
  { quantity: 100, price: 199 },
  { quantity: 200, price: 299 },
]

export const PRODUCTS: Product[] = [
  {
    kind: 'photo-pack',
    slug: 'custom-photo-magnets',
    name: 'Custom Photo Magnets',
    categories: ['custom'],
    hook: 'Turn any photo into a magnet strong enough for the fridge and pretty enough for the mantel.',
    bullets: [
      'High-gloss mylar finish over a sturdy metal base',
      'Choose 2.25" or 3", in packs of 1, 4, or 8',
      'Upload your photo and see the exact crop before you order',
    ],
    images: ['images/products/custom-photo-magnets-3in.jpg', 'images/products/custom-photo-magnets-225in.jpg'],
    placeholderLabel: 'Photo Magnet',
    sizes: ['2.25"', '3"'],
    packTiers: { '3"': MAGNET_3IN_TIERS, '2.25"': MAGNET_225IN_TIERS },
  },
  {
    kind: 'photo-pack',
    slug: 'custom-photo-keychains',
    name: 'Custom Photo Keychains',
    categories: ['custom'],
    hook: 'Carry the people, and pets, you love wherever you go.',
    bullets: [
      'The same glossy, full-color print as our magnets, built for a keyring',
      '2.25" size, sold as a single or in packs of 4 or 8',
      'An easy gift for grandparents, new parents, or yourself',
    ],
    images: [],
    placeholderLabel: 'Photo Keychain',
    sizes: ['2.25"'],
    packTiers: { '2.25"': MAGNET_225IN_TIERS },
  },
  {
    kind: 'photo-pack',
    slug: 'custom-photo-pins',
    name: 'Custom Photo Pins',
    categories: ['custom', 'pins'],
    hook: 'A wearable version of your favorite memory.',
    bullets: [
      '3" round pin with a secure pin-back closure',
      'Great for backpacks, jackets, lanyards, and gift exchanges',
      'Upload a photo and preview it before it ships',
    ],
    images: [],
    placeholderLabel: 'Photo Pin',
    sizes: ['3"'],
    packTiers: { '3"': MAGNET_3IN_TIERS },
  },
  {
    kind: 'photo-bulk',
    slug: 'save-the-date-magnets',
    name: 'Save the Date Magnets',
    categories: ['custom'],
    hook: 'Announce your date in something guests keep on the fridge, not the recycling bin.',
    bullets: [
      'Your photo plus names and the date, printed in full color',
      'Ordered in bulk, 50, 100, or 200, to match your guest list',
      'Choose 2.25" or 3" and preview your exact design before you order',
    ],
    images: ['images/products/save-the-date-3in.jpg', 'images/products/save-the-date-225in.jpg'],
    placeholderLabel: 'Save the Date',
    sizes: ['2.25"', '3"'],
    bulkTiers: { '3"': BULK_3IN_TIERS, '2.25"': BULK_225IN_TIERS },
    textFields: [
      { id: 'names', label: 'Names', placeholder: 'Katie & Quintin' },
      { id: 'date', label: 'Date', placeholder: 'March 13, 2027' },
    ],
  },
  {
    kind: 'photo-bulk',
    slug: 'logo-qr-magnets',
    name: 'Logo / QR Code Magnets',
    categories: ['custom'],
    hook: 'Put your business, or your wedding hashtag, in everyone’s pocket.',
    bullets: [
      'Upload a logo or paste a link to generate a scannable QR code',
      'Bulk pricing for 50, 100, or 200, in 2.25" or 3"',
      'A practical favor for weddings, or a real marketing piece for businesses',
    ],
    images: ['images/products/logo-qr-magnets.jpg'],
    placeholderLabel: 'Logo / QR Magnet',
    sizes: ['2.25"', '3"'],
    bulkTiers: { '3"': BULK_3IN_TIERS, '2.25"': BULK_225IN_TIERS },
    logoOrQr: true,
  },
  {
    kind: 'design-select',
    slug: 'birth-month-flower-magnets',
    name: 'Birth Month Flower Magnets',
    categories: ['gifts'],
    hook: 'A small, meaningful gift built around the month someone was born.',
    bullets: [
      'Botanical art for every birth month, printed in full color',
      'Choose 2.25" or 3"',
      'A simple gift for a birthday, new baby, or Mother’s Day',
    ],
    images: [],
    placeholderLabel: 'Birth Month',
    sizes: ['2.25"', '3"'],
    unitPrice: { '3"': 6.98, '2.25"': 4.98 },
    optionGroups: [{ id: 'month', label: 'Birth month', choices: MONTHS }],
  },
  {
    kind: 'design-select',
    slug: 'bible-verse-magnets',
    name: 'Bible Verse Magnets',
    categories: ['faith', 'gifts'],
    hook: 'A verse to hold onto, somewhere you will actually see it every day.',
    bullets: [
      'Fifteen designs to choose from, including Be Still and Fearfully & Wonderfully Made',
      'Buy a single magnet, or a set of 3 for less',
      'Choose 2.25" or 3"',
    ],
    images: [],
    placeholderLabel: 'Bible Verse',
    sizes: ['2.25"', '3"'],
    unitPrice: { '3"': 6.98, '2.25"': 4.98 },
    optionGroups: [{ id: 'design', label: 'Verse design', choices: VERSE_DESIGNS }],
    bundle: { quantity: 3, price: 16, label: 'Set of 3' },
  },
  {
    kind: 'design-pack',
    slug: 'sport-fan-magnets-and-pins',
    name: 'Sport Fan Magnets and Pins',
    categories: ['sports', 'pins', 'gifts'],
    hook: 'Show team spirit for the athlete, or the parent cheering them on.',
    bullets: [
      'Pick the sport and the role: Athlete, Mom, Dad, Grandma, or Grandpa',
      'Choose magnet or pin, in 2.25" or 3" (pins are 3" only)',
      'A quick gift for a team, a senior night, or a proud parent',
    ],
    images: [],
    placeholderLabel: 'Sport Fan',
    sizes: ['2.25"', '3"'],
    packTiers: { '3"': MAGNET_3IN_TIERS, '2.25"': MAGNET_225IN_TIERS },
    optionGroups: [
      { id: 'sport', label: 'Sport', choices: SPORTS },
      { id: 'role', label: 'Role', choices: ROLES },
    ],
    magnetPinToggle: true,
  },
  {
    kind: 'design-pack',
    slug: 'patriotic-magnets',
    name: 'Patriotic Magnets',
    categories: ['gifts'],
    hook: 'Stars, stripes, and a little hometown pride.',
    bullets: [
      'Ready-made patriotic design, no photo needed',
      'Choose 2.25" or 3", single or in packs',
      'A quick, no-fuss gift or Fourth of July favor',
    ],
    images: [],
    placeholderLabel: 'Patriotic',
    sizes: ['2.25"', '3"'],
    packTiers: { '3"': MAGNET_3IN_TIERS, '2.25"': MAGNET_225IN_TIERS },
    optionGroups: [],
  },
  {
    kind: 'design-pack',
    slug: 'christmas-coloring-magnets',
    name: 'Christmas Coloring Magnets',
    categories: ['gifts'],
    hook: 'A magnet the kids can color before it goes on the fridge.',
    bullets: [
      'Printable-style coloring design in a durable, glossy finish',
      'Choose 2.25" or 3", single or in packs',
      'A sweet stocking stuffer or classroom gift',
    ],
    images: [],
    placeholderLabel: 'Christmas',
    sizes: ['2.25"', '3"'],
    packTiers: { '3"': MAGNET_3IN_TIERS, '2.25"': MAGNET_225IN_TIERS },
    optionGroups: [],
  },
  {
    kind: 'fixed',
    slug: 'punny-magnet-gift-set',
    name: 'Punny Magnet Gift Set',
    categories: ['gifts'],
    hook: 'Six magnets, six puns, zero regrets.',
    bullets: [
      'A ready-made gift set of 6 punny magnets',
      'No customization needed, just add to cart',
      'A quick, funny gift for a coworker or a hostess',
    ],
    images: [],
    placeholderLabel: 'Punny Set',
    price: 16,
  },
  {
    kind: 'fixed',
    slug: 'abc-123-magnet-kit',
    name: 'ABC 123 Magnet Kit',
    categories: ['gifts', 'baby'],
    hook: 'Letters and numbers a toddler can stick, stack, and rearrange.',
    bullets: [
      'A full magnet alphabet and number set for learning play',
      'Add a custom name plaque to make it personal',
      'A durable gift that holds up to little hands',
    ],
    images: [],
    placeholderLabel: 'ABC 123',
    price: 42,
    nameAddon: { label: 'Add a custom name plaque', price: 4 },
  },
  {
    kind: 'fixed',
    slug: 'baby-blanket',
    name: 'Baby Blanket',
    categories: ['baby'],
    hook: 'A soft, minky blanket that makes a nursery gift feel finished.',
    bullets: [
      'Minky polka-dot fabric on both sides, about 27" x 30"',
      'Choose from a range of color combinations',
      'A ready-to-give baby shower gift, no customization needed',
    ],
    images: [],
    placeholderLabel: 'Baby Blanket',
    price: 40,
    optionGroups: [{ id: 'color', label: 'Color', choices: BLANKET_COLORS }],
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.categories.includes(category))
}

/**
 * Lowest entry-point price across a product's sizes, for "from $X" display.
 * For pack tiers this is each size's smallest pack (usually a single unit),
 * not the cheapest per-unit rate buried in a bulk tier: a shopper can't
 * actually check out at that rate without buying the bigger pack.
 */
export function startingPrice(product: Product): number {
  switch (product.kind) {
    case 'photo-pack':
    case 'design-pack': {
      const entryPrices = product.sizes.flatMap((size) => {
        const tiers = product.packTiers[size]
        if (!tiers || tiers.length === 0) return []
        const smallest = tiers.reduce((min, t) => (t.quantity < min.quantity ? t : min))
        return [smallest.price / smallest.quantity]
      })
      return Math.min(...entryPrices)
    }
    case 'photo-bulk': {
      const totals = product.sizes.flatMap((size) => product.bulkTiers[size]?.map((t) => t.price) ?? [])
      return Math.min(...totals)
    }
    case 'design-select': {
      const prices = product.sizes.map((size) => product.unitPrice[size]).filter((n): n is number => n != null)
      if (product.bundle) prices.push(product.bundle.price)
      return Math.min(...prices)
    }
    case 'fixed':
      return product.price
  }
}
