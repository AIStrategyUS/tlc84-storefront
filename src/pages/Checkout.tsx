import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useCart, type CartItem } from '@/context/CartContext'
import { computeShipping, formatPrice, GIFT_WRAP_PRICE } from '@/lib/pricing'
import { generateOrderId, saveOrder } from '@/lib/orders'
import { useSeo } from '@/lib/useSeo'
import { Button, ButtonLink } from '@/components/ui/Button'
import ProductPlaceholder from '@/components/product/ProductPlaceholder'

interface FormState {
  email: string
  phone: string
  fullName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  cardName: string
  cardNumber: string
  expiry: string
  cvc: string
}

const INITIAL_FORM: FormState = {
  email: '',
  phone: '',
  fullName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {}

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'
  if (!form.fullName.trim()) errors.fullName = 'Required'
  if (!form.address1.trim()) errors.address1 = 'Required'
  if (!form.city.trim()) errors.city = 'Required'
  if (!form.state.trim()) errors.state = 'Required'
  if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim())) errors.zip = 'Enter a valid ZIP code'
  if (!form.cardName.trim()) errors.cardName = 'Required'

  const cardDigits = form.cardNumber.replace(/\D/g, '')
  if (cardDigits.length < 13 || cardDigits.length > 19) errors.cardNumber = 'Enter a valid card number'

  const expiryMatch = form.expiry.match(/^(\d{2})\/(\d{2})$/)
  if (!expiryMatch) {
    errors.expiry = 'Use MM/YY'
  } else {
    const month = parseInt(expiryMatch[1], 10)
    const year = 2000 + parseInt(expiryMatch[2], 10)
    const now = new Date()
    const isPast = year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)
    if (month < 1 || month > 12) errors.expiry = 'Enter a valid month'
    else if (isPast) errors.expiry = 'Card has expired'
  }

  if (!/^\d{3,4}$/.test(form.cvc)) errors.cvc = 'Enter a valid CVC'

  return errors
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  )
}

const inputClass =
  'min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss'

export default function Checkout() {
  useSeo('Checkout', 'A demo checkout. No payment is processed and nothing is stored.')
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [summaryOpen, setSummaryOpen] = useState(false)

  const shipping = computeShipping(subtotal)
  const total = subtotal + shipping

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const orderId = generateOrderId()
    saveOrder({
      orderId,
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      total,
      email: form.email,
      shippingAddress: {
        fullName: form.fullName,
        address1: form.address1,
        address2: form.address2 || undefined,
        city: form.city,
        state: form.state,
        zip: form.zip,
      },
    })
    clearCart()
    navigate(`/order/${orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center sm:py-28">
        <h1 className="font-display text-3xl text-forest">Your cart is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-ink/80">Add something to your cart before checking out.</p>
        <ButtonLink to="/shop" variant="primary" className="mt-8">
          Start shopping
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="mb-6 font-display text-3xl text-forest sm:text-4xl">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          <section>
            <h2 className="mb-4 font-display text-xl text-forest">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone (optional)">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl text-forest">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Full name" error={errors.fullName}>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className={inputClass}
                    autoComplete="name"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Address" error={errors.address1}>
                  <input
                    type="text"
                    value={form.address1}
                    onChange={(e) => update('address1', e.target.value)}
                    className={inputClass}
                    autoComplete="address-line1"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Apt, suite, etc. (optional)">
                  <input
                    type="text"
                    value={form.address2}
                    onChange={(e) => update('address2', e.target.value)}
                    className={inputClass}
                    autoComplete="address-line2"
                  />
                </Field>
              </div>
              <Field label="City" error={errors.city}>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className={inputClass}
                  autoComplete="address-level2"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="State" error={errors.state}>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => update('state', e.target.value)}
                    className={inputClass}
                    autoComplete="address-level1"
                  />
                </Field>
                <Field label="ZIP" error={errors.zip}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.zip}
                    onChange={(e) => update('zip', e.target.value)}
                    className={inputClass}
                    autoComplete="postal-code"
                  />
                </Field>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl text-forest">Shipping method</h2>
            <div className="flex items-center justify-between rounded-xl border border-forest bg-sage/30 px-4 py-3">
              <label className="flex items-center gap-3 text-sm font-medium text-ink">
                <input type="radio" checked readOnly className="h-4 w-4 text-forest" />
                Standard shipping (3 to 5 business days)
              </label>
              <span className="font-semibold text-forest">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl text-forest">Payment</h2>
            <div className="mb-4 flex items-start gap-2 rounded-xl bg-sage/40 px-4 py-3 text-sm text-forest">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Demo checkout. No payment is processed and nothing is stored.
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Name on card" error={errors.cardName}>
                  <input
                    type="text"
                    value={form.cardName}
                    onChange={(e) => update('cardName', e.target.value)}
                    className={inputClass}
                    autoComplete="cc-name"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Card number" error={errors.cardNumber}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cardNumber}
                    onChange={(e) => update('cardNumber', formatCardNumber(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    className={inputClass}
                    autoComplete="cc-number"
                  />
                </Field>
              </div>
              <Field label="Expiry" error={errors.expiry}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.expiry}
                  onChange={(e) => update('expiry', formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  className={inputClass}
                  autoComplete="cc-exp"
                />
              </Field>
              <Field label="CVC" error={errors.cvc}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.cvc}
                  onChange={(e) => update('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  className={inputClass}
                  autoComplete="cc-csc"
                />
              </Field>
            </div>
          </section>

          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Place order · {formatPrice(total)}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border border-mist bg-white lg:sticky lg:top-24">
          <details className="lg:hidden" open={summaryOpen} onToggle={(e) => setSummaryOpen(e.currentTarget.open)}>
            <summary className="cursor-pointer px-6 py-4 font-display text-lg text-forest">
              Order summary · {formatPrice(total)}
            </summary>
            <div className="px-6 pb-6">
              <OrderSummaryBody items={items} subtotal={subtotal} shipping={shipping} total={total} />
            </div>
          </details>
          <div className="hidden p-6 lg:block">
            <h2 className="mb-4 font-display text-lg text-forest">Order summary</h2>
            <OrderSummaryBody items={items} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        </aside>
      </div>
    </div>
  )
}

function OrderSummaryBody({
  items,
  subtotal,
  shipping,
  total,
}: {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-mist bg-white">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <ProductPlaceholder label={item.name} basePx={56} />
              )}
            </div>
            <div className="flex-1 text-sm">
              <p className="text-ink">{item.name}</p>
              <p className="text-xs text-ink/60">
                {item.packLabel} × {item.quantity}
              </p>
            </div>
            <span className="text-sm font-medium text-forest">
              {formatPrice((item.unitPrice + (item.giftWrap ? GIFT_WRAP_PRICE : 0)) * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-2 border-t border-mist pt-4 text-sm text-ink/80">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-mist pt-2 font-display text-lg text-forest">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}
