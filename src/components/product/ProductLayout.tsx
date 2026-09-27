import type { ReactNode } from 'react'
import type { Product } from '@/data/catalog'
import ProductDetails from './ProductDetails'

export default function ProductLayout({
  product,
  visual,
  buyBox,
}: {
  product: Product
  visual: ReactNode
  buyBox: ReactNode
}) {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex items-start justify-center rounded-3xl bg-sage/30 p-6 sm:p-10">{visual}</div>
        <div>{buyBox}</div>
      </div>
      <ProductDetails product={product} />
    </div>
  )
}
