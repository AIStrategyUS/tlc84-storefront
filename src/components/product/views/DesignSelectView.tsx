import { useState } from 'react'
import type { DesignSelectProduct, Size } from '@/data/catalog'
import { categoryLabel } from '@/data/categories'
import ProductLayout from '../ProductLayout'
import SizeSelector from '../SizeSelector'
import PackTiles from '../PackTiles'
import OptionSelect from '../OptionSelect'
import QuantityStepper from '../QuantityStepper'
import AddedToCartNotice from '../AddedToCartNotice'
import ProductPlaceholder from '../ProductPlaceholder'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/pricing'
import { useCart } from '@/context/CartContext'

export default function DesignSelectView({ product }: { product: DesignSelectProduct }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<Size>(product.sizes[0])
  const [optionValues, setOptionValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.optionGroups.map((g) => [g.id, g.choices[0]?.value ?? ''])),
  )
  const unitPrice = product.unitPrice[size] ?? 0
  const [bundleQuantity, setBundleQuantity] = useState(1)
  const [simpleQuantity, setSimpleQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const tiers = product.bundle ? [{ quantity: 1, price: unitPrice }, { quantity: product.bundle.quantity, price: product.bundle.price }] : []
  const selectedTier = tiers.find((t) => t.quantity === bundleQuantity) ?? tiers[0]

  function handleAddToCart() {
    setAdding(true)
    const optionsSummary = product.optionGroups.map((g) => {
      const choice = g.choices.find((c) => c.value === optionValues[g.id])
      return `${g.label}: ${choice?.label ?? ''}`
    })

    if (product.bundle && selectedTier) {
      addItem({
        slug: product.slug,
        name: product.name,
        size,
        packLabel: selectedTier.quantity === 1 ? 'Single' : product.bundle.label,
        quantity: 1,
        unitPrice: selectedTier.price,
        optionsSummary,
        giftWrap: false,
      })
    } else {
      addItem({
        slug: product.slug,
        name: product.name,
        size,
        packLabel: 'Single',
        quantity: simpleQuantity,
        unitPrice,
        optionsSummary,
        giftWrap: false,
      })
    }
    setAdded(true)
    setAdding(false)
  }

  const selectedLabels = product.optionGroups
    .map((g) => g.choices.find((c) => c.value === optionValues[g.id])?.label)
    .filter(Boolean)
  const placeholderLabel = selectedLabels.length > 0 ? selectedLabels.join(', ') : product.placeholderLabel

  const visual = <ProductPlaceholder label={placeholderLabel} size={size} basePx={260} />

  const buyBox = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss">{categoryLabel(product.categories[0])}</p>
        <h1 className="mt-1 font-display text-3xl text-forest">{product.name}</h1>
        <p className="mt-3 text-ink/80">{product.hook}</p>
      </div>

      <SizeSelector sizes={product.sizes} selected={size} onSelect={setSize} />

      {product.optionGroups.map((group) => (
        <OptionSelect
          key={group.id}
          group={group}
          value={optionValues[group.id] ?? ''}
          onChange={(value) => setOptionValues((v) => ({ ...v, [group.id]: value }))}
        />
      ))}

      {product.bundle ? (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Quantity</p>
          <PackTiles
            tiers={tiers}
            selected={bundleQuantity}
            onSelect={setBundleQuantity}
            formatLabel={(q) => (q === 1 ? 'Single' : product.bundle!.label)}
            singleUnitPrice={unitPrice}
          />
        </div>
      ) : (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Quantity</p>
          <QuantityStepper value={simpleQuantity} onChange={setSimpleQuantity} />
        </div>
      )}

      <div className="rounded-xl bg-sage/40 px-4 py-3 text-sm text-ink">
        <span className="font-display text-xl text-forest">
          {formatPrice(product.bundle ? (selectedTier?.price ?? 0) : unitPrice * simpleQuantity)}
        </span>{' '}
        total
      </div>

      <Button onClick={handleAddToCart} disabled={adding} className="w-full sm:w-auto">
        {adding ? 'Adding...' : 'Add to cart'}
      </Button>

      <AddedToCartNotice show={added} />
    </div>
  )

  return <ProductLayout product={product} visual={visual} buyBox={buyBox} />
}
