import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import type { CartItem } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'
import { formatPrice, GIFT_WRAP_PRICE } from '@/lib/pricing'
import QuantityStepper from '@/components/product/QuantityStepper'
import ProductPlaceholder from '@/components/product/ProductPlaceholder'

export default function CartLineItem({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const { removeItem, setQuantity, setGiftWrap, closeDrawer } = useCart()

  const details = [item.size, item.packLabel, ...item.optionsSummary].filter(Boolean)

  return (
    <div className="flex gap-4 py-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-mist bg-white">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <ProductPlaceholder label={item.name} basePx={80} />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base text-forest">{item.name}</h3>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-sage/60 hover:text-forest"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {details.length > 0 && <p className="text-xs text-ink/60">{details.join(' · ')}</p>}

        <Link
          to={`/product/${item.slug}`}
          state={{ editItem: item }}
          onClick={closeDrawer}
          className="text-xs font-medium text-moss underline underline-offset-2 hover:text-forest"
        >
          Edit
        </Link>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <QuantityStepper value={item.quantity} onChange={(q) => setQuantity(item.id, q)} />
          <span className="font-display text-base text-forest">
            {formatPrice((item.unitPrice + (item.giftWrap ? GIFT_WRAP_PRICE : 0)) * item.quantity)}
          </span>
        </div>

        {!compact && (
          <label className="mt-1 flex min-h-[32px] items-center gap-2 text-xs text-ink/70">
            <input
              type="checkbox"
              checked={item.giftWrap}
              onChange={(e) => setGiftWrap(item.id, e.target.checked)}
              className="h-4 w-4 rounded border-mist text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss"
            />
            Gift wrap (+{formatPrice(GIFT_WRAP_PRICE)})
          </label>
        )}
      </div>
    </div>
  )
}
