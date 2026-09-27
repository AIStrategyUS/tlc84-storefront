import type { Size } from '@/data/catalog'

export interface PixelCrop {
  x: number
  y: number
  width: number
  height: number
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

/** Minimum acceptable shorter-side pixel dimension per size, per the client's photo-quality policy. */
export function shortSideThreshold(size: Size): number {
  return size === '3"' ? 800 : 600
}

export function isLowResolution(naturalWidth: number, naturalHeight: number, size: Size): boolean {
  return Math.min(naturalWidth, naturalHeight) < shortSideThreshold(size)
}

/**
 * Reads an uploaded file and returns a downscaled JPEG data URL sized for
 * on-screen editing and localStorage persistence, plus the file's true
 * original dimensions (used for the low-resolution warning, which must
 * reflect what the customer actually uploaded, not our working copy).
 */
export async function fileToWorkingImage(
  file: File,
  maxDimension = 1600,
): Promise<{ dataUrl: string; naturalWidth: number; naturalHeight: number }> {
  const objectUrl = URL.createObjectURL(file)
  try {
    const img = await loadImage(objectUrl)
    const { naturalWidth, naturalHeight } = img
    const scale = Math.min(1, maxDimension / Math.max(naturalWidth, naturalHeight))
    const width = Math.round(naturalWidth * scale)
    const height = Math.round(naturalHeight * scale)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas not supported')
    ctx.drawImage(img, 0, 0, width, height)
    return { dataUrl: canvas.toDataURL('image/jpeg', 0.85), naturalWidth, naturalHeight }
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

function rotatedBoxSize(width: number, height: number, rotationDeg: number) {
  const rotRad = (rotationDeg * Math.PI) / 180
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * Renders the cropped, rotated region of an image to a fixed-size square
 * JPEG data URL. `pixelCrop` is react-easy-crop's croppedAreaPixels, which
 * is expressed against the rotated image's bounding box, so the image is
 * rotated onto an offscreen canvas first before the crop rectangle is cut
 * out of it.
 */
export async function renderCroppedThumbnail(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation: number,
  outputSize = 400,
): Promise<string> {
  const image = await loadImage(imageSrc)
  const { width: boxWidth, height: boxHeight } = rotatedBoxSize(image.width, image.height, rotation)

  const rotatedCanvas = document.createElement('canvas')
  rotatedCanvas.width = boxWidth
  rotatedCanvas.height = boxHeight
  const rotatedCtx = rotatedCanvas.getContext('2d')
  if (!rotatedCtx) throw new Error('Canvas not supported')
  rotatedCtx.translate(boxWidth / 2, boxHeight / 2)
  rotatedCtx.rotate((rotation * Math.PI) / 180)
  rotatedCtx.translate(-image.width / 2, -image.height / 2)
  rotatedCtx.drawImage(image, 0, 0)

  const outCanvas = document.createElement('canvas')
  outCanvas.width = outputSize
  outCanvas.height = outputSize
  const outCtx = outCanvas.getContext('2d')
  if (!outCtx) throw new Error('Canvas not supported')
  outCtx.drawImage(
    rotatedCanvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize,
  )
  return outCanvas.toDataURL('image/jpeg', 0.9)
}

/**
 * Combines 1-8 square thumbnails into a single composite image, so a
 * multi-slot pack still shows as one cart-line thumbnail.
 */
export async function composeThumbnailGrid(images: string[], cellSize = 200): Promise<string> {
  if (images.length === 0) return ''
  if (images.length === 1) return images[0]

  const columns = images.length <= 4 ? 2 : 4
  const rows = Math.ceil(images.length / columns)
  const canvas = document.createElement('canvas')
  canvas.width = columns * cellSize
  canvas.height = rows * cellSize
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')
  ctx.fillStyle = '#FFFAF1'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const loaded = await Promise.all(images.map(loadImage))
  loaded.forEach((img, i) => {
    const col = i % columns
    const row = Math.floor(i / columns)
    ctx.drawImage(img, col * cellSize, row * cellSize, cellSize, cellSize)
  })
  return canvas.toDataURL('image/jpeg', 0.85)
}
