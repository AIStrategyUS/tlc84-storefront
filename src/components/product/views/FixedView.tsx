import { useState } from 'react'
import type { FixedProduct } from '@/data/catalog'
import { categoryLabel } from '@/data/categories'
import ProductLayout from '../ProductLayout'
import OptionSelect from '../OptionSelect'
import QuantityStepper from '../QuantityStepper'
import AddedToCartNotice from '../AddedToCartNotice'
import ProductPlaceholder from '../ProductPlaceholder'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/pricing'
import { useCart } from '@/context/CartContext'

export default function FixedView({ product }: { product: FixedProduct }) {
  const { addItem } = useCart()
  const [optionValues, setOptionValues] = useState<Record<string, string>>(() =>
    Object.fromEntries((product.optionGroups ?? []).map((g) => [g.id, g.choices[0]?.value ?? ''])),
  )
  const [nameAddonEnabled, setNameAddonEnabled] = useState(false)
  const [customName, setCustomName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const unitPrice = product.price + (nameAddonEnabled && product.nameAddon ? product.nameAddon.price : 0)

  function handleAddToCart() {
    setAdding(true)
    const optionsSummary = (product.optionGroups ?? []).map((g) => {
      const choice = g.choices.find((c) => c.value === optionValues[g.id])
      return `${g.label}: ${choice?.label ?? ''}`
    })
    if (nameAddonEnabled && product.nameAddon) {
      optionsSummary.push(`${product.nameAddon.label}${customName ? `: ${customName}` : ''}`)
    }

    addItem({
      slug: product.slug,
      name: product.name,
      packLabel: 'Single',
      quantity,
      unitPrice,
      optionsSummary,
      giftWrap: false,
      textValues: nameAddonEnabled && customName ? { name: customName } : undefined,
    })
    setAdded(true)
    setAdding(false)
  }

  const selectedLabels = (product.optionGroups ?? [])
    .map((g) => g.choices.find((c) => c.value === optionValues[g.id])?.label)
    .filter(Boolean)
  const placeholderLabel = selectedLabels.length > 0 ? selectedLabels.join(', ') : product.placeholderLabel

  const visual = <ProductPlaceholder label={placeholderLabel} basePx={260} />

  const buyBox = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss">{categoryLabel(product.categories[0])}</p>
        <h1 className="mt-1 font-display text-3xl text-forest">{product.name}</h1>
        <p className="mt-3 text-ink/80">{product.hook}</p>
      </div>

      {(product.optionGroups ?? []).map((group) => (
        <OptionSelect
          key={group.id}
          group={group}
          value={optionValues[group.id] ?? ''}
          onChange={(value) => setOptionValues((v) => ({ ...v, [group.id]: value }))}
        />
      ))}

      {product.nameAddon && (
        <div className="space-y-2">
          <label className="flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={nameAddonEnabled}
              onChange={(e) => setNameAddonEnabled(e.target.checked)}
              className="h-5 w-5 rounded border-mist text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss"
            />
            {product.nameAddon.label} (+{formatPrice(product.nameAddon.price)})
          </label>
          {nameAddonEnabled && (
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Name for the plaque"
              className="min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss sm:w-64"
            />
          )}
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Quantity</p>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <div className="rounded-xl bg-sage/40 px-4 py-3 text-sm text-ink">
        <span className="font-display text-xl text-forest">{formatPrice(unitPrice * quantity)}</span> total
      </div>

      <Button onClick={handleAddToCart} disabled={adding} className="w-full sm:w-auto">
        {adding ? 'Adding...' : 'Add to cart'}
      </Button>

      <AddedToCartNotice show={added} />
    </div>
  )

  return <ProductLayout product={product} visual={visual} buyBox={buyBox} />
}
