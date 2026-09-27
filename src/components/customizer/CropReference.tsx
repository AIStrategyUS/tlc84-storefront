import { rotatedBoxSize, type PixelCrop } from '@/lib/image'

interface CropReferenceProps {
  imageUrl: string
  naturalWidth: number
  naturalHeight: number
  rotation: number
  croppedAreaPixels: PixelCrop | null
  size?: number
}

/**
 * A small static reference showing the whole uploaded photo with the actual
 * crop circle highlighted on it. The live circular editor only ever shows
 * what's already inside the circle, so on its own it can't answer "what part
 * of my photo is getting cut off" — this can, since it's drawn from the same
 * croppedAreaPixels react-easy-crop uses to render the live preview.
 */
export default function CropReference({
  imageUrl,
  naturalWidth,
  naturalHeight,
  rotation,
  croppedAreaPixels,
  size = 56,
}: CropReferenceProps) {
  // react-easy-crop can briefly report a degenerate croppedAreaPixels while its
  // internal container is still settling (e.g. React StrictMode's dev-only
  // double-mount) — skip that frame rather than render NaN into inline styles.
  if (
    !croppedAreaPixels ||
    !naturalWidth ||
    !naturalHeight ||
    ![croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height].every(Number.isFinite)
  ) {
    return null
  }

  const { width: boxWidth, height: boxHeight } = rotatedBoxSize(naturalWidth, naturalHeight, rotation)
  const scale = size / Math.max(boxWidth, boxHeight)
  const thumbWidth = boxWidth * scale
  const thumbHeight = boxHeight * scale

  return (
    <div
      aria-hidden="true"
      className="relative shrink-0 overflow-hidden rounded-md bg-ink/5"
      style={{ width: thumbWidth, height: thumbHeight }}
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute max-w-none"
        style={{
          width: naturalWidth * scale,
          height: naturalHeight * scale,
          left: (thumbWidth - naturalWidth * scale) / 2,
          top: (thumbHeight - naturalHeight * scale) / 2,
          transform: `rotate(${rotation}deg)`,
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full ring-2 ring-white"
        style={{
          left: croppedAreaPixels.x * scale,
          top: croppedAreaPixels.y * scale,
          width: croppedAreaPixels.width * scale,
          height: croppedAreaPixels.height * scale,
          boxShadow: '0 0 0 999px rgba(5, 40, 18, 0.55)',
        }}
      />
    </div>
  )
}
