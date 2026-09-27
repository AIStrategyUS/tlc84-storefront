import { useRef, useState } from 'react'
import type { DragEvent, ReactNode } from 'react'
import Cropper from 'react-easy-crop'
import { RotateCw, Upload, X } from 'lucide-react'
import type { Size } from '@/data/catalog'
import type { ProductType } from '@/components/product/ProductFrame'
import ProductFrame from '@/components/product/ProductFrame'
import { fileToWorkingImage, isLowResolution } from '@/lib/image'
import { EMPTY_SLOT, type SlotState } from './types'

interface PhotoSlotProps {
  size: Size
  productType: ProductType
  basePx?: number
  value: SlotState
  onChange: (next: SlotState) => void
  label?: string
  onUseForAll?: () => void
  /** Extra content layered on top of the frame (e.g. Save-the-Date text), pointer-events disabled. */
  overlay?: ReactNode
}

export default function PhotoSlot({
  size,
  productType,
  basePx = 240,
  value,
  onChange,
  label,
  onUseForAll,
  overlay,
}: PhotoSlotProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setIsLoading(true)
    try {
      const { dataUrl, naturalWidth, naturalHeight } = await fileToWorkingImage(file)
      onChange({ ...EMPTY_SLOT, workingImageUrl: dataUrl, naturalWidth, naturalHeight })
    } finally {
      setIsLoading(false)
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggingOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const lowRes = value.workingImageUrl
    ? isLowResolution(value.naturalWidth, value.naturalHeight, size)
    : false

  return (
    <div className="flex flex-col items-center gap-2">
      {value.workingImageUrl ? (
        <ProductFrame size={size} productType={productType} basePx={basePx}>
          <Cropper
            image={value.workingImageUrl}
            crop={value.crop}
            zoom={value.zoom}
            rotation={value.rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={(crop) => onChange({ ...value, crop })}
            onZoomChange={(zoom) => onChange({ ...value, zoom })}
            onRotationChange={(rotation) => onChange({ ...value, rotation })}
            onCropComplete={(_area, croppedAreaPixels) => onChange({ ...value, croppedAreaPixels })}
          />
          {overlay}
        </ProductFrame>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDraggingOver(true)
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
        >
          <ProductFrame size={size} productType={productType} basePx={basePx}>
            <label
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 text-center transition-colors ${
                isDraggingOver ? 'bg-sage' : 'bg-sage/40 hover:bg-sage/60'
              }`}
            >
              <Upload className="h-6 w-6 text-moss" aria-hidden="true" />
              <span className="px-3 text-xs font-medium text-forest">
                {isLoading ? 'Loading...' : label ? `Add ${label.toLowerCase()}` : 'Add photo'}
              </span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
            {overlay}
          </ProductFrame>
        </div>
      )}

      {value.workingImageUrl && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...value, rotation: (value.rotation + 90) % 360 })}
            className="flex min-h-[36px] items-center gap-1 rounded-full border border-mist px-3 text-xs font-medium text-ink/80 hover:border-forest"
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            Rotate
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, crop: { x: 0, y: 0 }, zoom: 1, rotation: 0 })}
            className="flex min-h-[36px] items-center rounded-full border border-mist px-3 text-xs font-medium text-ink/80 hover:border-forest"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_SLOT })}
            aria-label="Remove photo"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink/60 hover:border-forest hover:text-forest"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {lowRes && (
        <p className="max-w-[200px] text-center text-xs text-amber-700">
          This photo may print blurry. A larger photo will look sharper.
        </p>
      )}

      {onUseForAll && value.workingImageUrl && (
        <button
          type="button"
          onClick={onUseForAll}
          className="text-xs font-medium text-moss underline underline-offset-2 hover:text-forest"
        >
          Use this photo for all slots
        </button>
      )}
    </div>
  )
}
