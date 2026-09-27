import type { PackTier } from '@/data/catalog'
import { formatPrice, savingsPercent } from '@/lib/pricing'

export default function PackTiles({
  tiers,
  selected,
  onSelect,
  formatLabel,
  singleUnitPrice,
}: {
  tiers: PackTier[]
  selected: number
  onSelect: (quantity: number) => void
  formatLabel: (quantity: number) => string
  singleUnitPrice?: number
}) {
  return (
    <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Pack size">
      {tiers.map((tier) => {
        const isSelected = tier.quantity === selected
        const savings = savingsPercent(tier.price, tier.quantity, singleUnitPrice)
        return (
          <button
            key={tier.quantity}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(tier.quantity)}
            className={`flex min-h-[64px] flex-col items-center justify-center gap-0.5 rounded-2xl border px-2 py-3 text-center transition-colors ${
              isSelected ? 'border-forest bg-forest text-cream' : 'border-mist bg-white text-ink hover:border-forest'
            }`}
          >
            <span className="text-sm font-semibold">{formatLabel(tier.quantity)}</span>
            <span className={`text-xs ${isSelected ? 'text-cream/85' : 'text-ink/70'}`}>{formatPrice(tier.price)}</span>
            {savings !== null && (
              <span className={`text-[11px] font-medium ${isSelected ? 'text-cream' : 'text-moss'}`}>
                Save {savings}%
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
