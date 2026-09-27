import { useState } from 'react'
import QRCode from 'qrcode'
import type { PhotoBulkProduct, Size } from '@/data/catalog'
import { categoryLabel } from '@/data/categories'
import ProductLayout from '../ProductLayout'
import SizeSelector from '../SizeSelector'
import PackTiles from '../PackTiles'
import AddedToCartNotice from '../AddedToCartNotice'
import { Button } from '@/components/ui/Button'
import PhotoSlot from '@/components/customizer/PhotoSlot'
import QrPreview from '@/components/customizer/QrPreview'
import TextOverlay from '@/components/customizer/TextOverlay'
import { EMPTY_SLOT, fullImageCrop, type SlotState } from '@/components/customizer/types'
import { renderCroppedThumbnail } from '@/lib/image'
import { formatPrice } from '@/lib/pricing'
import { useCart } from '@/context/CartContext'

type UploadMode = 'upload' | 'qr'

export default function PhotoBulkView({ product }: { product: PhotoBulkProduct }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<Size>(product.sizes[0])
  const tiers = product.bulkTiers[size] ?? []
  const [quantity, setQuantity] = useState(tiers[0]?.quantity ?? 50)
  const [slot, setSlot] = useState<SlotState>(EMPTY_SLOT)
  const [mode, setMode] = useState<UploadMode>('upload')
  const [qrUrl, setQrUrl] = useState('')
  const [textValues, setTextValues] = useState<Record<string, string>>({})
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const selectedTier = tiers.find((t) => t.quantity === quantity) ?? tiers[0]
  const isQrMode = Boolean(product.logoOrQr) && mode === 'qr'
  const canAdd = isQrMode ? qrUrl.trim().length > 0 : Boolean(slot.workingImageUrl)

  function handleSizeChange(nextSize: Size) {
    setSize(nextSize)
    setAdded(false)
  }

  async function handleAddToCart() {
    if (!canAdd || !selectedTier) return
    setAdding(true)
    try {
      let thumbnail: string | undefined
      let slotsData: Parameters<typeof addItem>[0]['slots']

      if (isQrMode) {
        thumbnail = await QRCode.toDataURL(qrUrl, { width: 400, margin: 1 })
      } else if (slot.workingImageUrl) {
        thumbnail = await renderCroppedThumbnail(slot.workingImageUrl, slot.croppedAreaPixels ?? fullImageCrop(slot), slot.rotation)
        slotsData = [
          {
            imageDataUrl: slot.workingImageUrl,
            crop: slot.crop,
            zoom: slot.zoom,
            rotation: slot.rotation,
            croppedAreaPixels: slot.croppedAreaPixels,
          },
        ]
      }

      addItem({
        slug: product.slug,
        name: product.name,
        size,
        packLabel: `Bulk of ${selectedTier.quantity}`,
        quantity: 1,
        unitPrice: selectedTier.price,
        optionsSummary: isQrMode ? [`QR link: ${qrUrl}`] : [],
        thumbnail,
        giftWrap: false,
        slots: slotsData,
        textValues: { ...textValues, ...(isQrMode ? { url: qrUrl } : {}) },
      })
      setAdded(true)
    } finally {
      setAdding(false)
    }
  }

  const visual = (
    <div className="flex flex-col items-center gap-4">
      {product.logoOrQr && (
        <div className="flex gap-2 rounded-full border border-mist bg-white p-1">
          {(['upload', 'qr'] as UploadMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors ${
                mode === m ? 'bg-forest text-cream' : 'text-ink/70 hover:text-forest'
              }`}
            >
              {m === 'upload' ? 'Upload a logo' : 'Generate a QR code'}
            </button>
          ))}
        </div>
      )}

      {isQrMode ? (
        <>
          <QrPreview url={qrUrl} size={size} basePx={280} />
          <label className="w-full max-w-xs">
            <span className="mb-1.5 block text-sm font-medium text-ink">Link</span>
            <input
              type="url"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              placeholder="https://yourbusiness.com"
              className="min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss"
            />
          </label>
        </>
      ) : (
        <PhotoSlot
          size={size}
          productType="magnet"
          basePx={280}
          value={slot}
          onChange={setSlot}
          label={product.logoOrQr ? 'logo' : 'photo'}
          overlay={product.textFields ? <TextOverlay fields={product.textFields} values={textValues} /> : undefined}
        />
      )}
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
        <p className="mb-2 text-sm font-medium text-ink">Quantity</p>
        <PackTiles tiers={tiers} selected={quantity} onSelect={setQuantity} formatLabel={(q) => `${q} pieces`} />
      </div>

      {!isQrMode &&
        product.textFields?.map((field) => (
          <label key={field.id} className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">{field.label}</span>
            <input
              type="text"
              value={textValues[field.id] ?? ''}
              onChange={(e) => setTextValues((v) => ({ ...v, [field.id]: e.target.value }))}
              placeholder={field.placeholder}
              className="min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss sm:w-64"
            />
          </label>
        ))}

      <div className="rounded-xl bg-sage/40 px-4 py-3 text-sm text-ink">
        <span className="font-display text-xl text-forest">{formatPrice(selectedTier?.price ?? 0)}</span> total for{' '}
        {selectedTier?.quantity} pieces
      </div>

      {!canAdd && (
        <p className="text-sm text-ink/60">
          {isQrMode ? 'Add a link to generate your QR code.' : `Add a ${product.logoOrQr ? 'logo' : 'photo'} to continue.`}
        </p>
      )}

      <Button onClick={handleAddToCart} disabled={!canAdd || adding} className="w-full sm:w-auto">
        {adding ? 'Adding...' : 'Add to cart'}
      </Button>

      <AddedToCartNotice show={added} />
    </div>
  )

  return <ProductLayout product={product} visual={visual} buyBox={buyBox} />
}
