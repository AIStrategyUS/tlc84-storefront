import { PRODUCTS, type Product } from '@/data/catalog'
import ProductCard from './ProductCard'
import ReviewsSection from '@/components/trust/ReviewsSection'
import FaqAccordion from '@/components/trust/FaqAccordion'

function relatedProducts(product: Product): Product[] {
  return PRODUCTS.filter((p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c))).slice(
    0,
    4,
  )
}

export default function ProductDetails({ product }: { product: Product }) {
  const related = relatedProducts(product)

  return (
    <div className="mt-16 border-t border-mist pt-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-forest">Details</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {product.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="text-moss">•</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl text-forest">How it's made</h2>
          <p className="mt-3 text-sm text-ink/80">
            Shape: round. Sturdy metal base with strong magnetic backing, finished with a high-gloss
            mylar covering that keeps your photo vibrant and protected.
          </p>
        </div>
      </div>

      <details className="mt-8 rounded-2xl border border-mist bg-white p-5">
        <summary className="cursor-pointer font-display text-lg text-forest">Shipping and returns</summary>
        <div className="mt-3 space-y-2 text-sm text-ink/80">
          <p>
            Orders go into production within 1 business day of receiving your photos. Standard
            delivery is 3 to 5 business days within the USA; bulk orders may need extra production
            time.
          </p>
          <p>
            Custom orders are not eligible for general returns or exchanges. If your order arrives
            damaged, contact us within 7 days with photos for a replacement or refund. We can't
            offer refunds for photo quality issues like blur or low resolution, so we flag that at
            upload if your photo may be too small to print sharp.
          </p>
        </div>
      </details>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 font-display text-2xl text-forest">You might also like</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 border-t border-mist pt-14">
        <ReviewsSection />
      </div>

      <div className="mt-14">
        <FaqAccordion />
      </div>
    </div>
  )
}
