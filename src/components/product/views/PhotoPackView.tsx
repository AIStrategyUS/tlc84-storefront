import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PhotoPackProduct, Size } from '@/data/catalog'
import { categoryLabel } from '@/data/categories'
import ProductLayout from '../ProductLayout'
import SizeSelector from '../SizeSelector'
import PackTiles from '../PackTiles'
import { Button } from '@/components/ui/Button'
import PhotoSlot from '@/components/customizer/PhotoSlot'
import {
  EMPTY_SLOT,
  resizeSlots,
  fullImageCrop,
  slotStateFromCartSlot,
  measureSlotImage,
  type SlotState,
} from '@/components/customizer/types'
import type { ProductType } from '@/components/product/ProductFrame'
import { renderCroppedThumbnail, composeThumbnailGrid } from '@/lib/image'
import { formatPrice, savingsPercent } from '@/lib/pricing'
import { useCart, type CartItem } from '@/context/CartContext'

const PRODUCT_TYPE_BY_SLUG: Record<string, ProductType> = {
  'custom-photo-magnets': 'magnet',
  'custom-photo-keychains': 'keychain',
  'custom-photo-pins': 'pin',
}

export default function PhotoPackView({ product, editItem }: { product: PhotoPackProduct; editItem?: CartItem }) {
  const { addItem, updateItem, openDrawer } = useCart()
  const navigate = useNavigate()
  const [size, setSize] = useState<Size>(editItem?.size ?? product.sizes[0])
  const tiers = product.packTiers[size] ?? []
  const [quantity, setQuantityState] = useState(editItem?.slots?.length ?? tiers[0]?.quantity ?? 1)
  const [slots, setSlots] = useState<SlotState[]>(() =>
    editItem?.slots
      ? editItem.slots.map(slotStateFromCartSlot)
      : resizeSlots([], tiers[0]?.quantity ?? 1),
  )
  const [adding, setAdding] = useState(false)

  // Cart-stored slots start with a placeholder resolution so the low-res
  // warning can't false-positive before the image has actually loaded.
  useEffect(() => {
    if (!editItem?.slots) return
    let cancelled = false
    Promise.all(slots.map(measureSlotImage)).then((measured) => {
      if (!cancelled) setSlots(measured)
    })
    return () => {
      cancelled = true
    }
    // Only run once, for the initial edit-seeded slots.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const productType = PRODUCT_TYPE_BY_SLUG[product.slug] ?? 'magnet'
  const singleUnitPrice = product.packTiers[size]?.find((t) => t.quantity === 1)?.price
  const selectedTier = tiers.find((t) => t.quantity === quantity) ?? tiers[0]
  const perItemPrice = selectedTier ? selectedTier.price / selectedTier.quantity : 0
  const savings = selectedTier ? savingsPercent(selectedTier.price, selectedTier.quantity, singleUnitPrice) : null

  function handleSizeChange(nextSize: Size) {
    setSize(nextSize)
  }

  function handleQuantityChange(q: number) {
    setQuantityState(q)
    setSlots((prev) => resizeSlots(prev, q))
  }

  function handleSlotChange(index: number, next: SlotState) {
    setSlots((prev) => prev.map((s, i) => (i === index ? next : s)))
  }

  function handleUseForAll(sourceIndex: number) {
    const source = slots[sourceIndex]
    if (!source.workingImageUrl) return
    setSlots((prev) =>
      prev.map((s, i) =>
        i === sourceIndex
          ? s
          : {
              ...EMPTY_SLOT,
              workingImageUrl: source.workingImageUrl,
              naturalWidth: source.naturalWidth,
              naturalHeight: source.naturalHeight,
            },
      ),
    )
  }

  const allFilled = slots.length > 0 && slots.every((s) => s.workingImageUrl)

  async function handleAddToCart() {
    if (!allFilled || !selectedTier) return
    setAdding(true)
    try {
      const thumbs = await Promise.all(
        slots.map((s) => renderCroppedThumbnail(s.workingImageUrl!, s.croppedAreaPixels ?? fullImageCrop(s), s.rotation)),
      )
      const thumbnail = await composeThumbnailGrid(thumbs)
      const item = {
        slug: product.slug,
        name: product.name,
        size,
        packLabel: selectedTier.quantity === 1 ? 'Single' : `Pack of ${selectedTier.quantity}`,
        quantity: 1,
        unitPrice: selectedTier.price,
        optionsSummary: [],
        thumbnail,
        giftWrap: editItem?.giftWrap ?? false,
        slots: slots.map((s) => ({
          imageDataUrl: s.workingImageUrl!,
          crop: s.crop,
          zoom: s.zoom,
          rotation: s.rotation,
          croppedAreaPixels: s.croppedAreaPixels,
        })),
      }
      if (editItem) {
        updateItem(editItem.id, item)
        navigate('/cart')
      } else {
        addItem(item)
        openDrawer()
      }
    } finally {
      setAdding(false)
    }
  }

  // Always 2 columns: at this component's fixed frame size, 4 across would
  // overflow the visual pane on mobile (and even at desktop widths, since
  // the pane is only half the page). 2x2 for a 4-pack, 2x4 for an 8-pack.
  const gridCols = slots.length <= 1 ? 'grid-cols-1' : 'grid-cols-2'

  const visual = (
    <div className={`grid ${gridCols} gap-5`}>
      {slots.map((slot, i) => (
        <PhotoSlot
          key={i}
          size={size}
          productType={productType}
          basePx={slots.length > 1 ? 130 : 260}
          value={slot}
          onChange={(next) => handleSlotChange(i, next)}
          label={slots.length > 1 ? `Photo ${i + 1}` : undefined}
          onUseForAll={slots.length > 1 ? () => handleUseForAll(i) : undefined}
        />
      ))}
    </div>
  )

  const buyBox = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss">{categoryLabel(product.categories[0])}</p>
        <h1 className="mt-1 font-display text-3xl text-forest">{product.name}</h1>
        <p className="mt-3 text-ink/80">{product.hook}</p>
      </div>

      <SizeSelector sizes={product.sizes} selected={size} onSelect={handleSizeChange} />

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Pack size</p>
        <PackTiles
          tiers={tiers}
          selected={quantity}
          onSelect={handleQuantityChange}
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

      {!allFilled && <p className="text-sm text-ink/60">Add a photo to every slot to continue.</p>}

      <Button onClick={handleAddToCart} disabled={!allFilled || adding} className="w-full sm:w-auto">
        {adding ? 'Saving...' : editItem ? 'Save changes' : 'Add to cart'}
      </Button>
    </div>
  )

  return <ProductLayout product={product} visual={visual} buyBox={buyBox} />
}
