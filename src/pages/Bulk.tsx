import { useState } from 'react'
import type { FormEvent } from 'react'
import { Building2, Church, School } from 'lucide-react'
import { formatPrice } from '@/lib/pricing'
import { useSeo } from '@/lib/useSeo'
import { Button } from '@/components/ui/Button'

const TIERS = [
  { quantity: 50, price225: 149, price3: 196 },
  { quantity: 100, price225: 199, price3: 249 },
  { quantity: 200, price225: 299, price3: 349 },
]

const USE_CASES = [
  {
    icon: Building2,
    title: 'Realtors',
    body: 'QR code magnets that link straight to a listing, handed out at open houses and closings.',
  },
  {
    icon: Church,
    title: 'Churches',
    body: 'Bible verse or event magnets for a congregation, a retreat, or a holiday gathering.',
  },
  {
    icon: School,
    title: 'Schools and teams',
    body: 'Team photo magnets for a banquet, senior night, or fundraiser, ordered in bulk.',
  },
]

const PRODUCT_OPTIONS = ['Logo / QR Code Magnets', 'Save the Date Magnets', 'Sport Fan Magnets and Pins', 'Other']

const inputClass =
  'min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss'

export default function Bulk() {
  useSeo(
    'Bulk & Business Orders',
    'Volume pricing on logo, QR, save-the-date, and team magnets for realtors, churches, schools, and businesses.',
  )

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ company: '', quantity: '', product: PRODUCT_OPTIONS[0], neededBy: '' })
  const [fileName, setFileName] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container-page py-20 text-center sm:py-28">
        <h1 className="font-display text-3xl text-forest">Thanks, we've got your request</h1>
        <p className="mx-auto mt-3 max-w-md text-ink/80">
          Someone from our team will follow up within 1 business day with pricing and next steps.
        </p>
      </div>
    )
  }

  return (
    <div>
      <section className="container-page py-14 text-center sm:py-20">
        <p className="mb-3 font-medium uppercase tracking-[0.2em] text-moss">Bulk & business</p>
        <h1 className="mx-auto max-w-2xl font-display text-4xl text-forest sm:text-5xl">
          Volume orders for realtors, churches, schools, and teams
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink/80">
          Logo, QR, save-the-date, or team magnets, ordered by the box instead of the handful.
        </p>
      </section>

      <section className="border-y border-mist bg-sage/30 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="mb-8 text-center font-display text-3xl text-forest">Volume pricing</h2>
          <div className="overflow-hidden rounded-2xl border border-mist bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-sage/40 text-ink/70">
                <tr>
                  <th className="px-5 py-3 font-medium">Quantity</th>
                  <th className="px-5 py-3 font-medium">2.25"</th>
                  <th className="px-5 py-3 font-medium">3"</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {TIERS.map((t) => (
                  <tr key={t.quantity}>
                    <td className="px-5 py-3 font-medium text-forest">{t.quantity} pieces</td>
                    <td className="px-5 py-3">{formatPrice(t.price225)}</td>
                    <td className="px-5 py-3">{formatPrice(t.price3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-ink/60">
            Pricing shown for Logo/QR and Save the Date Magnets. Other bulk products are quoted per request.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="mb-10 text-center font-display text-3xl text-forest">Who orders in bulk</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {USE_CASES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/60 text-forest">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-xl text-forest">{title}</h3>
              <p className="mt-2 text-sm text-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-mist bg-white p-8 shadow-card sm:p-10">
          <h2 className="mb-6 font-display text-2xl text-forest">Request a quote</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Company or organization</span>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className={inputClass}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Quantity</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="e.g. 100"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Product</span>
                <select
                  value={form.product}
                  onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                  className={inputClass}
                >
                  {PRODUCT_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Artwork (optional)</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                className="block w-full text-sm text-ink/70 file:mr-4 file:min-h-[44px] file:rounded-full file:border-0 file:bg-sage/60 file:px-4 file:text-sm file:font-medium file:text-forest hover:file:bg-sage"
              />
              {fileName && <span className="mt-1 block text-xs text-ink/60">Selected: {fileName}</span>}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Needed by (optional)</span>
              <input
                type="date"
                value={form.neededBy}
                onChange={(e) => setForm((f) => ({ ...f, neededBy: e.target.value }))}
                className={inputClass}
              />
            </label>

            <Button type="submit" className="w-full">
              Request a quote
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
