import ProductFrame, { type ProductType } from './ProductFrame'
import type { Size } from '@/data/catalog'

const PALETTES = [
  { bg: '#D4E9CF', text: '#17371A' }, // sage / forest
  { bg: '#17371A', text: '#FFFAF1' }, // forest / cream
  { bg: '#3F7652', text: '#FFFAF1' }, // moss / cream
  { bg: '#E1E7E3', text: '#052812' }, // mist / ink
]

function paletteFor(label: string) {
  let hash = 0
  for (let i = 0; i < label.length; i++) hash = (hash * 31 + label.charCodeAt(i)) >>> 0
  return PALETTES[hash % PALETTES.length]
}

interface ProductPlaceholderProps {
  label: string
  size?: Size
  productType?: ProductType
  basePx?: number
  className?: string
}

/** Stylized brand-colored SVG-style placeholder for products with no photo yet. */
export default function ProductPlaceholder({
  label,
  size = '3"',
  productType = 'magnet',
  basePx,
  className,
}: ProductPlaceholderProps) {
  const palette = paletteFor(label)
  return (
    <ProductFrame size={size} productType={productType} basePx={basePx} className={className}>
      <div
        className="flex h-full w-full items-center justify-center p-4 text-center font-display leading-tight"
        style={{ backgroundColor: palette.bg, color: palette.text, fontSize: '0.95rem' }}
      >
        {label}
      </div>
    </ProductFrame>
  )
}
