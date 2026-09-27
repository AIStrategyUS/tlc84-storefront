import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FixedProduct } from '@/data/catalog'
import { categoryLabel } from '@/data/categories'
import ProductLayout from '../ProductLayout'
import OptionSelect from '../OptionSelect'
import QuantityStepper from '../QuantityStepper'
import ProductPlaceholder from '../ProductPlaceholder'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/pricing'
import { restoreOptionValues } from '@/lib/editRestore'
import { useCart, type CartItem } from '@/context/CartContext'

export default function FixedView({ product, editItem }: { product: FixedProduct; editItem?: CartItem }) {
  const { addItem, updateItem, openDrawer } = useCart()
  const navigate = useNavigate()
  const [optionValues, setOptionValues] = useState<Record<string, string>>(() => {
    const defaults = Object.fromEntries((product.optionGroups ?? []).map((g) => [g.id, g.choices[0]?.value ?? '']))
    return editItem
      ? { ...defaults, ...restoreOptionValues(product.optionGroups ?? [], editItem.optionsSummary) }
      : defaults
  })
  const [nameAddonEnabled, setNameAddonEnabled] = useState(
    () => Boolean(product.nameAddon) && Boolean(editItem?.optionsSummary.some((s) => s.startsWith(product.nameAddon!.label))),
  )
  const [customName, setCustomName] = useState(editItem?.textValues?.name ?? '')
  const [quantity, setQuantity] = useState(editItem?.quantity ?? 1)
  const [adding, setAdding] = useState(false)

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

    const item = {
      slug: product.slug,
      name: product.name,
      packLabel: 'Single',
      quantity,
      unitPrice,
      optionsSummary,
      giftWrap: editItem?.giftWrap ?? false,
      textValues: nameAddonEnabled && customName ? { name: customName } : undefined,
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
        {adding ? 'Saving...' : editItem ? 'Save changes' : 'Add to cart'}
      </Button>
    </div>
  )

  return <ProductLayout product={product} visual={visual} buyBox={buyBox} />
}
