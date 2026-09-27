import { useCart } from '@/context/CartContext'
import { computeShipping, formatPrice } from '@/lib/pricing'
import { useSeo } from '@/lib/useSeo'
import { ButtonLink } from '@/components/ui/Button'
import CartLineItem from '@/components/cart/CartLineItem'
import FreeShippingProgress from '@/components/cart/FreeShippingProgress'

export default function Cart() {
  useSeo('Cart', 'Review your custom magnets, keychains, and pins.')
  const { items, subtotal } = useCart()
  const shipping = computeShipping(subtotal)

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center sm:py-28">
        <h1 className="font-display text-3xl text-forest">Your cart is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-ink/80">
          Pick a product and upload a photo to see it before you buy.
        </p>
        <ButtonLink to="/shop" variant="primary" className="mt-8">
          Start shopping
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="mb-8 font-display text-3xl text-forest sm:text-4xl">Your cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-mist rounded-2xl border border-mist bg-white px-5">
          {items.map((item) => (
            <CartLineItem key={item.id} item={item} />
          ))}
        </div>

        <div className="h-fit space-y-5 rounded-2xl border border-mist bg-white p-6 lg:sticky lg:top-24">
          <FreeShippingProgress subtotal={subtotal} />

          <div className="space-y-2 border-t border-mist pt-4 text-sm text-ink/80">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-forest">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-mist pt-2 font-display text-lg text-forest">
              <span>Total</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
          </div>

          <ButtonLink to="/checkout" variant="primary" className="w-full">
            Checkout
          </ButtonLink>
          <ButtonLink to="/shop" variant="outline" className="w-full">
            Continue shopping
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
