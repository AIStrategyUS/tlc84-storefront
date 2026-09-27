import { FREE_SHIPPING_THRESHOLD, formatPrice } from '@/lib/pricing'

export default function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const percent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div>
      <p className="text-sm text-ink/80">
        {remaining > 0 ? (
          <>
            Add <span className="font-semibold text-forest">{formatPrice(remaining)}</span> more for free
            shipping
          </>
        ) : (
          <span className="font-semibold text-forest">You've got free shipping</span>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-moss transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
