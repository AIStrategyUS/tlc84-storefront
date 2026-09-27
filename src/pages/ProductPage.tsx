import { useLocation, useParams } from 'react-router-dom'
import { getProduct, type Product } from '@/data/catalog'
import type { CartItem } from '@/context/CartContext'
import { useSeo } from '@/lib/useSeo'
import NotFound from './NotFound'
import PhotoPackView from '@/components/product/views/PhotoPackView'
import PhotoBulkView from '@/components/product/views/PhotoBulkView'
import DesignPackView from '@/components/product/views/DesignPackView'
import DesignSelectView from '@/components/product/views/DesignSelectView'
import FixedView from '@/components/product/views/FixedView'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const product = slug ? getProduct(slug) : undefined

  if (!product) return <NotFound />

  const state = location.state as { editItem?: CartItem } | null
  const editItem = state?.editItem?.slug === product.slug ? state.editItem : undefined

  // Keyed on slug + which cart line (if any) is being edited: this forces a
  // full remount whenever either changes, including editing a product from
  // its own already-open page, so each kind-specific view can safely seed
  // its local state from `editItem` in a useState initializer instead of
  // needing to sync props to state after the fact.
  return (
    <ProductPageContent
      key={`${product.slug}-${editItem?.id ?? 'new'}`}
      product={product}
      editItem={editItem}
    />
  )
}

function ProductPageContent({ product, editItem }: { product: Product; editItem?: CartItem }) {
  useSeo(product.name, product.hook)

  switch (product.kind) {
    case 'photo-pack':
      return <PhotoPackView product={product} editItem={editItem} />
    case 'photo-bulk':
      return <PhotoBulkView product={product} editItem={editItem} />
    case 'design-pack':
      return <DesignPackView product={product} editItem={editItem} />
    case 'design-select':
      return <DesignSelectView product={product} editItem={editItem} />
    case 'fixed':
      return <FixedView product={product} editItem={editItem} />
  }
}
