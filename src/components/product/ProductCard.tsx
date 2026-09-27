import { Link } from 'react-router-dom'
import type { Product } from '@/data/catalog'
import { startingPrice } from '@/data/catalog'
import { formatPrice } from '@/lib/pricing'
import { asset } from '@/lib/assets'
import ProductPlaceholder from './ProductPlaceholder'

function sizeBadge(product: Product): string | undefined {
  if (!('sizes' in product)) return undefined
  return product.sizes.join(' & ')
}

export default function ProductCard({ product }: { product: Product }) {
  const price = startingPrice(product)
  const badge = sizeBadge(product)
  const [primaryImage, secondaryImage] = product.images

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-mist bg-white shadow-card">
        {primaryImage ? (
          <>
            <img
              src={asset(primaryImage)}
              alt={product.name}
              loading="lazy"
              width={600}
              height={600}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                secondaryImage ? 'group-hover:opacity-0' : ''
              }`}
            />
            {secondaryImage && (
              <img
                src={asset(secondaryImage)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={600}
                height={600}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <ProductPlaceholder label={product.placeholderLabel} basePx={180} />
        )}

        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-1 text-xs font-medium text-forest shadow-card">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="font-display text-lg text-forest">{product.name}</h3>
        <p className="text-sm text-ink/70">from {formatPrice(price)}</p>
      </div>
    </Link>
  )
}
