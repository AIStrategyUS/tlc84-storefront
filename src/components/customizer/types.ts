import type { CartItemSlot } from '@/context/CartContext'
import { loadImage, type PixelCrop } from '@/lib/image'

export interface SlotState {
  workingImageUrl: string | null
  naturalWidth: number
  naturalHeight: number
  crop: { x: number; y: number }
  zoom: number
  rotation: number
  croppedAreaPixels: PixelCrop | null
}

export const EMPTY_SLOT: SlotState = {
  workingImageUrl: null,
  naturalWidth: 0,
  naturalHeight: 0,
  crop: { x: 0, y: 0 },
  zoom: 1,
  rotation: 0,
  croppedAreaPixels: null,
}

/** Resizes a slots array to `length`, keeping existing slots and padding with empties. */
export function resizeSlots(slots: SlotState[], length: number): SlotState[] {
  if (length <= slots.length) return slots.slice(0, length)
  return [...slots, ...Array.from({ length: length - slots.length }, () => ({ ...EMPTY_SLOT }))]
}

/** Fallback crop rect covering the whole image, for a slot that was never interactively cropped. */
export function fullImageCrop(slot: SlotState): PixelCrop {
  return { x: 0, y: 0, width: slot.naturalWidth || 1, height: slot.naturalHeight || 1 }
}

/**
 * Rebuilds an editable SlotState from a saved cart-item slot, when a
 * shopper reopens the customizer via "Edit." The stored image is already
 * the downscaled working copy, and since that downscale never upscales, a
 * photo that was originally smaller than the working-copy cap keeps its
 * true original dimensions here too, so the low-resolution check stays
 * accurate. Width/height start at a large placeholder and are corrected
 * once the image actually loads, so the warning can't false-positive
 * during that brief window.
 */
export function slotStateFromCartSlot(slot: CartItemSlot): SlotState {
  return {
    workingImageUrl: slot.imageDataUrl,
    naturalWidth: 9999,
    naturalHeight: 9999,
    crop: slot.crop,
    zoom: slot.zoom,
    rotation: slot.rotation,
    croppedAreaPixels: slot.croppedAreaPixels,
  }
}

export async function measureSlotImage(slot: SlotState): Promise<SlotState> {
  if (!slot.workingImageUrl) return slot
  const img = await loadImage(slot.workingImageUrl)
  return { ...slot, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight }
}
