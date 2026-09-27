import type { Size } from '@/data/catalog'
import { asset } from '@/lib/assets'
import ProductFrame, { type ProductType } from './ProductFrame'
import ProductPlaceholder from './ProductPlaceholder'

/**
 * The non-customizable product-page visual: a real reference photo when the
 * product has one, framed the same way the customizer frames a live photo,
 * or the stylized placeholder otherwise.
 */
export default function ProductVisual({
  images,
  name,
  placeholderLabel,
  size,
  productType,
  basePx = 260,
}: {
  images: string[]
  name: string
  placeholderLabel: string
  size?: Size
  productType?: ProductType
  basePx?: number
}) {
  if (images.length === 0) {
    return <ProductPlaceholder label={placeholderLabel} size={size} productType={productType} basePx={basePx} />
  }
  return (
    <ProductFrame size={size} productType={productType} basePx={basePx}>
      <img src={asset(images[0])} alt={name} className="h-full w-full object-cover" />
    </ProductFrame>
  )
}
