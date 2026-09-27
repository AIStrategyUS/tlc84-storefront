import type { CartItem } from '@/context/CartContext'

export interface ShippingAddress {
  fullName: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
}

export interface OrderRecord {
  orderId: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  email: string
  shippingAddress: ShippingAddress
}

const STORAGE_KEY = 'tlc84-orders-v1'

export function generateOrderId(): string {
  return `TLC-${100000 + Math.floor(Math.random() * 900000)}`
}

export function saveOrder(order: OrderRecord): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const all = raw ? (JSON.parse(raw) as Record<string, OrderRecord>) : {}
    all[order.orderId] = order
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    // Storage unavailable: the order still shows once via router state.
  }
}

export function getOrder(orderId: string): OrderRecord | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const all = JSON.parse(raw) as Record<string, OrderRecord>
    return all[orderId]
  } catch {
    return undefined
  }
}
