import { useParams } from 'react-router-dom'
import { Camera, CheckCircle2, Package, Truck } from 'lucide-react'
import { getOrder } from '@/lib/orders'
import { formatPrice, GIFT_WRAP_PRICE } from '@/lib/pricing'
import { useSeo } from '@/lib/useSeo'
import { ButtonLink } from '@/components/ui/Button'
import ProductPlaceholder from '@/components/product/ProductPlaceholder'

const TIMELINE = [
  {
    icon: CheckCircle2,
    title: 'Order received',
    body: "We've got your order and your photos.",
  },
  {
    icon: Package,
    title: 'Processed within 1 business day',
    body: 'Your order goes into production as soon as we receive your photos.',
  },
  {
    icon: Truck,
    title: 'Ships in 3 to 5 business days',
    body: "We'll email you a shipping confirmation once it's on its way.",
  },
]

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>()
  const order = orderId ? getOrder(orderId) : undefined

  useSeo('Order Confirmed', 'Your order confirmation and what happens next.')

  if (!order) {
    return (
      <div className="container-page py-20 text-center sm:py-28">
        <h1 className="font-display text-3xl text-forest">We can't find that order</h1>
        <p className="mx-auto mt-3 max-w-md text-ink/80">
          The order link may be old or mistyped.
        </p>
        <ButtonLink to="/shop" variant="primary" className="mt-8">
          Start shopping
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="container-page max-w-3xl py-14 sm:py-20">
      <div className="text-center">
        <p className="font-medium uppercase tracking-[0.2em] text-moss">Thank you</p>
        <h1 className="mt-2 font-display text-3xl text-forest sm:text-4xl">Your order is confirmed</h1>
        <p className="mt-3 text-ink/80">
          Order <span className="font-semibold text-forest">{order.orderId}</span> · confirmation sent to{' '}
          {order.email}
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-mist bg-white p-6">
        <h2 className="mb-4 font-display text-lg text-forest">What you ordered</h2>
        <div className="divide-y divide-mist">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-mist bg-white">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <ProductPlaceholder label={item.name} basePx={64} />
                )}
              </div>
              <div className="flex-1 text-sm">
                <p className="text-ink">{item.name}</p>
                <p className="text-xs text-ink/60">
                  {[item.size, item.packLabel].filter(Boolean).join(' · ')} × {item.quantity}
                </p>
              </div>
              <span className="text-sm font-medium text-forest">
                {formatPrice((item.unitPrice + (item.giftWrap ? GIFT_WRAP_PRICE : 0)) * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1 border-t border-mist pt-4 text-sm text-ink/80">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-display text-base text-forest">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {TIMELINE.map(({ icon: Icon, title, body }) => (
          <div key={title}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/60 text-forest">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-base text-forest">{title}</h3>
            <p className="mt-1 text-sm text-ink/70">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-mist bg-white p-6">
        <h2 className="mb-2 font-display text-lg text-forest">Shipping to</h2>
        <p className="text-sm text-ink/80">
          {order.shippingAddress.fullName}
          <br />
          {order.shippingAddress.address1}
          {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ''}
          <br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-sage/40 p-8 text-center">
        <Camera className="h-6 w-6 text-forest" aria-hidden="true" />
        <p className="text-ink/80">
          Share your magnets with us on Instagram{' '}
          <a
            href="https://instagram.com/tlc842025"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-forest underline underline-offset-2"
          >
            @tlc842025
          </a>{' '}
          once they arrive.
        </p>
        <ButtonLink to="/shop" variant="outline">
          Continue shopping
        </ButtonLink>
      </div>
    </div>
  )
}
