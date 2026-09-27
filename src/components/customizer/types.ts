import type { PixelCrop } from '@/lib/image'

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
