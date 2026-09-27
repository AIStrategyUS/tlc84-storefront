import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { computeShipping, formatPrice } from '@/lib/pricing'
import { Button } from '@/components/ui/Button'
import CartLineItem from './CartLineItem'
import FreeShippingProgress from './FreeShippingProgress'

export default function CartDrawer() {
  const { items, subtotal, isDrawerOpen, closeDrawer } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Close on any navigation (e.g. the "Edit" link inside a line item), so
  // the drawer never sits open over a page the shopper just navigated to.
  useEffect(() => {
    closeDrawer()
    // Only ever react to the path actually changing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!isDrawerOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isDrawerOpen, closeDrawer])

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const shipping = computeShipping(subtotal)

  return (
    <div
      className={`fixed inset-0 z-50 ${isDrawerOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isDrawerOpen}
    >
      <div
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeDrawer}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-soft transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-mist px-5 py-4">
          <h2 className="font-display text-xl text-forest">Your cart</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sage/60"
          >
            <X className="h-5 w-5 text-forest" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <p className="text-ink/70">Your cart is empty.</p>
            <Button
              variant="outline"
              onClick={() => {
                closeDrawer()
                navigate('/shop')
              }}
            >
              Start shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-mist overflow-y-auto px-5">
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </div>

            <div className="space-y-4 border-t border-mist px-5 py-4">
              <FreeShippingProgress subtotal={subtotal} />
              <div className="flex items-center justify-between text-sm text-ink/80">
                <span>Subtotal</span>
                <span className="font-semibold text-forest">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-ink/80">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    closeDrawer()
                    navigate('/cart')
                  }}
                >
                  View cart
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    closeDrawer()
                    navigate('/checkout')
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
