import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PRODUCTS, startingPrice, type CategorySlug } from '@/data/catalog'
import { CATEGORIES, categoryLabel } from '@/data/categories'
import ProductCard from '@/components/product/ProductCard'
import { useSeo } from '@/lib/useSeo'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name: A to Z',
}

export default function Shop() {
  const { category } = useParams<{ category?: string }>()
  const [sort, setSort] = useState<SortOption>('featured')

  const activeCategory = CATEGORIES.some((c) => c.slug === category) ? (category as CategorySlug) : undefined

  useSeo(
    activeCategory ? `Shop ${categoryLabel(activeCategory)}` : 'Shop',
    'Custom photo magnets, keychains, pins, and gift sets. Upload a photo and see it before you buy.',
  )

  const products = useMemo(() => {
    const base = activeCategory ? PRODUCTS.filter((p) => p.categories.includes(activeCategory)) : PRODUCTS
    const sorted = [...base]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => startingPrice(a) - startingPrice(b))
        break
      case 'price-desc':
        sorted.sort((a, b) => startingPrice(b) - startingPrice(a))
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
        break
    }
    return sorted
  }, [activeCategory, sort])

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl text-forest sm:text-4xl">
          {activeCategory ? categoryLabel(activeCategory) : 'Shop all'}
        </h1>
        <p className="mt-2 text-ink/70">
          Upload a photo and see it on the product before you buy. Every custom piece ships in 3 to 5
          business days.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="list" aria-label="Categories">
          <Link
            to="/shop"
            className={`flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors ${
              !activeCategory
                ? 'border-forest bg-forest text-cream'
                : 'border-mist bg-white text-ink/80 hover:border-forest'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/shop/${c.slug}`}
              className={`flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                activeCategory === c.slug
                  ? 'border-forest bg-forest text-cream'
                  : 'border-mist bg-white text-ink/80 hover:border-forest'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <label className="flex min-h-[44px] items-center gap-2 text-sm text-ink/70">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="min-h-[44px] rounded-full border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-ink/70">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
