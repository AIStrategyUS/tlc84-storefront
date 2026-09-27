import { useParams } from 'react-router-dom'
import { getProduct, type Product } from '@/data/catalog'
import { useSeo } from '@/lib/useSeo'
import NotFound from './NotFound'
import PhotoPackView from '@/components/product/views/PhotoPackView'
import PhotoBulkView from '@/components/product/views/PhotoBulkView'
import DesignPackView from '@/components/product/views/DesignPackView'
import DesignSelectView from '@/components/product/views/DesignSelectView'
import FixedView from '@/components/product/views/FixedView'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProduct(slug) : undefined

  if (!product) return <NotFound />

  // Keyed on slug: navigating between products fully remounts this subtree,
  // so each kind-specific view can freely own its own local state and hooks.
  return <ProductPageContent key={product.slug} product={product} />
}

function ProductPageContent({ product }: { product: Product }) {
  useSeo(product.name, product.hook)

  switch (product.kind) {
    case 'photo-pack':
      return <PhotoPackView product={product} />
    case 'photo-bulk':
      return <PhotoBulkView product={product} />
    case 'design-pack':
      return <DesignPackView product={product} />
    case 'design-select':
      return <DesignSelectView product={product} />
    case 'fixed':
      return <FixedView product={product} />
  }
}
