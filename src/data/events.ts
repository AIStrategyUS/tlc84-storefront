export interface ServiceTier {
  id: string
  label: string
  guestCount: string
  duration: string
  price: number
}

export const SERVICE_TIERS: ServiceTier[] = [
  { id: 'small', label: 'Up to 50 guests', guestCount: '50', duration: '2 hours', price: 375 },
  { id: 'medium', label: 'Up to 100 guests', guestCount: '100', duration: '2 hours', price: 750 },
  { id: 'large', label: 'Up to 200 guests', guestCount: '200', duration: '3 hours', price: 925 },
]

export const TIME_SLOTS = ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM']

export const BOOKING_WINDOW_DAYS = 90

// Fixed day-offsets (0 = today) within the booking window that are already
// booked. Relative to "today" rather than absolute dates, so the mock
// calendar always looks realistic no matter when this is viewed, without
// using Math.random (which would make it look different on every reload).
// A real integration would replace this with live availability from a
// scheduling provider (e.g. Calendly, Cal.com, or a custom API).
const UNAVAILABLE_OFFSETS = [2, 5, 11, 18, 23, 30, 36, 41, 52, 58, 63, 70, 74, 81]

export function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function getUnavailableDateKeys(): Set<string> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const keys = new Set<string>()
  for (const offset of UNAVAILABLE_OFFSETS) {
    const d = new Date(today)
    d.setDate(d.getDate() + offset)
    keys.add(formatDateKey(d))
  }
  return keys
}

export function generateBookingReference(): string {
  return `TLC-EVT-${10000 + Math.floor(Math.random() * 90000)}`
}
