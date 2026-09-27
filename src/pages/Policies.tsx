import { useSeo } from '@/lib/useSeo'
import { useScrollToHash } from '@/lib/useScrollToHash'

const SECTIONS = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'returns', label: 'Returns' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'terms', label: 'Terms' },
]

export default function Policies() {
  useSeo('Shipping, Returns & Policies', 'Shipping, returns, privacy, and terms for The Legacy Collective.')
  useScrollToHash()

  return (
    <div className="container-page py-14 sm:py-20">
      <h1 className="mb-8 font-display text-4xl text-forest">Policies</h1>

      <nav className="mb-12 flex flex-wrap gap-2" aria-label="Policy sections">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex min-h-[44px] items-center rounded-full border border-mist bg-white px-4 text-sm font-medium text-ink/80 hover:border-forest hover:text-forest"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <div className="mx-auto max-w-2xl space-y-14 text-ink/80">
        <section id="shipping" className="scroll-mt-24">
          <h2 className="mb-4 font-display text-2xl text-forest">Shipping</h2>
          <div className="space-y-3">
            <p>
              Orders go into production within 1 business day of receiving your photos. Standard
              delivery within the USA typically takes 3 to 5 business days after that. Bulk orders
              (save-the-dates, logo/QR magnets, and team orders) need extra production time; we'll
              confirm a timeline when you place a bulk order.
            </p>
            <p>Shipping is a flat $5.95, free on orders of $35 or more.</p>
          </div>
        </section>

        <section id="returns" className="scroll-mt-24">
          <h2 className="mb-4 font-display text-2xl text-forest">Returns and refunds</h2>
          <div className="space-y-3">
            <p>
              Every piece is custom-made for you, so we're not able to offer general returns or
              exchanges. If your order arrives damaged in transit, contact us within 7 days with
              photos and we'll send a replacement or refund.
            </p>
            <p>
              We can't offer refunds for issues caused by the photo you supplied, like blur, low
              resolution, or poor lighting. Our customizer flags photos that may be too small to
              print sharp before you check out, so you can swap in a larger image if needed.
            </p>
          </div>
        </section>

        <section id="privacy" className="scroll-mt-24">
          <h2 className="mb-4 font-display text-2xl text-forest">Privacy</h2>
          <div className="space-y-3">
            <p>
              We collect the information you give us at checkout, such as your name, shipping
              address, and email, to process and ship your order and to contact you about it. We
              don't sell your personal information.
            </p>
            <p>
              Photos you upload are used only to produce your order. This is a demo site: no photos,
              payment details, or order information are actually transmitted or stored on a server.
            </p>
          </div>
        </section>

        <section id="terms" className="scroll-mt-24">
          <h2 className="mb-4 font-display text-2xl text-forest">Terms of service</h2>
          <div className="space-y-3">
            <p>
              By placing an order, you confirm you have the right to use any photo, logo, or image
              you upload. We reserve the right to decline an order if the content submitted is
              unlawful or infringes on someone else's rights.
            </p>
            <p>
              Prices and product availability are subject to change without notice. Continued use of
              this site means you accept these terms.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
