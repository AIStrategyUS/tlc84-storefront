import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Size } from '@/data/catalog'
import { GIFT_WRAP_PRICE } from '@/lib/pricing'

export interface CropState {
  crop: { x: number; y: number }
  zoom: number
  rotation: number
  croppedAreaPixels: { x: number; y: number; width: number; height: number } | null
}

export interface CartItemSlot extends CropState {
  /** Downscaled working copy of the uploaded image, as a data URL. */
  imageDataUrl: string
}

export interface CartItem {
  id: string
  slug: string
  name: string
  size?: Size
  /** e.g. "Single", "Pack of 4", "Set of 3", "Bulk of 100" */
  packLabel: string
  /** How many of this exact configuration. */
  quantity: number
  /** Price for one unit of this configuration (before the quantity multiplier). */
  unitPrice: number
  optionsSummary: string[]
  /** Composite preview generated with canvas at Add to Cart time. */
  thumbnail?: string
  giftWrap: boolean
  slots?: CartItemSlot[]
  textValues?: Record<string, string>
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'SET_QUANTITY'; id: string; quantity: number }
  | { type: 'SET_GIFT_WRAP'; id: string; giftWrap: boolean }
  | { type: 'CLEAR_CART' }

const STORAGE_KEY = 'tlc84-cart-v1'

function loadInitialState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { items: JSON.parse(raw) as CartItem[] }
  } catch {
    // Corrupt or unavailable storage: start with an empty cart.
  }
  return { items: [] }
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { items: [...state.items, action.item] }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'SET_QUANTITY':
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i,
        ),
      }
    case 'SET_GIFT_WRAP':
      return {
        items: state.items.map((i) => (i.id === action.id ? { ...i, giftWrap: action.giftWrap } : i)),
      }
    case 'CLEAR_CART':
      return { items: [] }
  }
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  setGiftWrap: (id: string, giftWrap: boolean) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  // Read localStorage synchronously during init (not in an effect), so the
  // first render already has the real cart. Hydrating via a mount effect
  // instead would race the persist effect below: it would fire first with
  // the empty initial state and clobber localStorage before the hydrated
  // data ever got dispatched.
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // Storage full or unavailable (e.g. private browsing): cart still works for this session.
    }
  }, [state.items])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce(
      (sum, i) => sum + (i.unitPrice + (i.giftWrap ? GIFT_WRAP_PRICE : 0)) * i.quantity,
      0,
    )
    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', item: { ...item, id: crypto.randomUUID() } }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      setQuantity: (id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity }),
      setGiftWrap: (id, giftWrap) => dispatch({ type: 'SET_GIFT_WRAP', id, giftWrap }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
