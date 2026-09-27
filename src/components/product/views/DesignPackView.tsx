import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DesignPackProduct, Size } from '@/data/catalog'
import { categoryLabel } from '@/data/categories'
import ProductLayout from '../ProductLayout'
import SizeSelector from '../SizeSelector'
import PackTiles from '../PackTiles'
import OptionSelect from '../OptionSelect'
import ProductVisual from '../ProductVisual'
import { Button } from '@/components/ui/Button'
import { formatPrice, savingsPercent } from '@/lib/pricing'
import { parseQuantityFromLabel, restoreOptionValues } from '@/lib/editRestore'
import { useCart, type CartItem } from '@/context/CartContext'

function initialMagnetOrPin(editItem?: CartItem): 'magnet' | 'pin' {
  const line = editItem?.optionsSummary.find((s) => s.startsWith('Format: '))
  return line?.endsWith('Pin') ? 'pin' : 'magnet'
}

export default function DesignPackView({ product, editItem }: { product: DesignPackProduct; editItem?: CartItem }) {
  const { addItem, updateItem, openDrawer } = useCart()
  const navigate = useNavigate()
  const [magnetOrPin, setMagnetOrPin] = useState<'magnet' | 'pin'>(() => initialMagnetOrPin(editItem))
  const [size, setSize] = useState<Size>(editItem?.size ?? product.sizes[0])
  const [optionValues, setOptionValues] = useState<Record<string, string>>(() => {
    const defaults = Object.fromEntries(product.optionGroups.map((g) => [g.id, g.choices[0]?.value ?? '']))
    return editItem ? { ...defaults, ...restoreOptionValues(product.optionGroups, editItem.optionsSummary) } : defaults
  })
  const tiers = product.packTiers[size] ?? []
  const [quantity, setQuantity] = useState(editItem ? parseQuantityFromLabel(editItem.packLabel) : (tiers[0]?.quantity ?? 1))
  const [adding, setAdding] = useState(false)

  const sizes = product.magnetPinToggle && magnetOrPin === 'pin' ? product.sizes.filter((s) => s === '3"') : product.sizes
  const singleUnitPrice = product.packTiers[size]?.find((t) => t.quantity === 1)?.price
  const selectedTier = tiers.find((t) => t.quantity === quantity) ?? tiers[0]
  const perItemPrice = selectedTier ? selectedTier.price / selectedTier.quantity : 0
  const savings = selectedTier ? savingsPercent(selectedTier.price, selectedTier.quantity, singleUnitPrice) : null

  function handleMagnetPinChange(next: 'magnet' | 'pin') {
    setMagnetOrPin(next)
    if (next === 'pin' && size !== '3"') setSize('3"')
  }

  function handleAddToCart() {
    if (!selectedTier) return
    setAdding(true)
    const optionsSummary = product.optionGroups.map((g) => {
      const choice = g.choices.find((c) => c.value === optionValues[g.id])
      return `${g.label}: ${choice?.label ?? ''}`
    })
    if (product.magnetPinToggle) optionsSummary.push(`Format: ${magnetOrPin === 'pin' ? 'Pin' : 'Magnet'}`)

    const item = {
      slug: product.slug,
      name: product.name,
      size,
      packLabel: selectedTier.quantity === 1 ? 'Single' : `Pack of ${selectedTier.quantity}`,
      quantity: 1,
      unitPrice: selectedTier.price,
      optionsSummary,
      giftWrap: editItem?.giftWrap ?? false,
    }
    if (editItem) {
      updateItem(editItem.id, item)
      navigate('/cart')
    } else {
      addItem(item)
      openDrawer()
    }
    setAdding(false)
  }

  const selectedLabels = product.optionGroups
    .map((g) => g.choices.find((c) => c.value === optionValues[g.id])?.label)
    .filter(Boolean)
  const placeholderLabel = selectedLabels.length > 0 ? selectedLabels.join(' ') : product.placeholderLabel

  const visual = (
    <ProductVisual
      images={product.images}
      name={product.name}
      placeholderLabel={placeholderLabel}
      size={size}
      productType={product.magnetPinToggle && magnetOrPin === 'pin' ? 'pin' : 'magnet'}
      basePx={260}
    />
  )

  const buyBox = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss">{categoryLabel(product.categories[0])}</p>
        <h1 className="mt-1 font-display text-3xl text-forest">{product.name}</h1>
        <p className="mt-3 text-ink/80">{product.hook}</p>
      </div>

      {product.magnetPinToggle && (
        <div className="flex gap-2" role="radiogroup" aria-label="Format">
          {(['magnet', 'pin'] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={magnetOrPin === option}
              onClick={() => handleMagnetPinChange(option)}
              className={`flex min-h-[44px] items-center justify-center rounded-full border px-4 text-sm font-medium capitalize transition-colors ${
                magnetOrPin === option
                  ? 'border-forest bg-forest text-cream'
                  : 'border-mist bg-white text-ink/80 hover:border-forest'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <SizeSelector sizes={sizes} selected={size} onSelect={setSize} />
      {product.magnetPinToggle && magnetOrPin === 'pin' && (
        <p className="-mt-4 text-xs text-ink/60">Pins are 3" only.</p>
      )}

      {product.optionGroups.map((group) => (
        <OptionSelect
          key={group.id}
          group={group}
          value={optionValues[group.id] ?? ''}
          onChange={(value) => setOptionValues((v) => ({ ...v, [group.id]: value }))}
        />
      ))}

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Pack size</p>
        <PackTiles
          tiers={tiers}
          selected={quantity}
          onSelect={setQuantity}
          formatLabel={(q) => (q === 1 ? 'Single' : `Pack of ${q}`)}
          singleUnitPrice={singleUnitPrice}
        />
      </div>

      <div className="rounded-xl bg-sage/40 px-4 py-3 text-sm text-ink">
        <span className="font-display text-xl text-forest">{formatPrice(selectedTier?.price ?? 0)}</span> total
        {selectedTier && selectedTier.quantity > 1 && (
          <span className="ml-2 text-ink/70">
            ({formatPrice(perItemPrice)} each{savings !== null ? `, save ${savings}%` : ''})
          </span>
        )}
      </div>

      <Button onClick={handleAddToCart} disabled={adding} className="w-full sm:w-auto">
        {adding ? 'Saving...' : editItem ? 'Save changes' : 'Add to cart'}
      </Button>
    </div>
  )

  return <ProductLayout product={product} visual={visual} buyBox={buyBox} />
}
