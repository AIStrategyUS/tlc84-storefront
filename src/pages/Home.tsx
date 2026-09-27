import { Camera, MapPin, ShieldCheck, Sparkles, Truck, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { useSeo } from '@/lib/useSeo'
import ReviewsSection from '@/components/trust/ReviewsSection'
import FaqAccordion from '@/components/trust/FaqAccordion'

const PROMISES = [
  { icon: MapPin, label: 'Family-made in Middle Tennessee' },
  { icon: Truck, label: 'Ships in 3 to 5 business days' },
  { icon: ShieldCheck, label: 'Photo quality guarantee' },
]

const CATEGORIES = [
  { label: 'Custom Magnets', hint: 'Your photos, in metal and gloss' },
  { label: 'Gift Sets', hint: 'Faith, sports, and birth-month picks' },
  { label: 'Keychains & Pins', hint: 'The same keepsake, on the go' },
  { label: 'Save the Dates', hint: 'Announce it in something they keep' },
]

const HOW_IT_WORKS = [
  {
    icon: Upload,
    title: 'Upload your photo',
    body: 'Drag in a picture from your phone or computer. No account needed.',
  },
  {
    icon: Sparkles,
    title: 'See it on the product',
    body: 'Preview the exact crop on your magnet, keychain, or pin before you buy.',
  },
  {
    icon: Truck,
    title: 'We print and ship',
    body: 'Your order goes into production within 1 business day and ships in 3 to 5.',
  },
]

export default function Home() {
  useSeo(
    'Custom Photo Magnets, Keychains & Pins',
    'Upload a photo, see it on your product before you buy, and get it in 3 to 5 days. Family-made in Middle Tennessee.',
  )

  return (
    <>
      <section className="container-page grid items-center gap-12 py-12 sm:py-16 md:grid-cols-2 md:py-24">
        <div className="max-w-xl">
          <p className="mb-3 font-medium uppercase tracking-[0.2em] text-moss">
            Rooted in love, growing in purpose
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-forest sm:text-5xl">
            Turn your favorite photo into a keepsake they carry every day
          </h1>
          <p className="mt-5 text-lg text-ink/80">
            Custom photo magnets, keychains, and pins, made by hand in Middle Tennessee. Upload
            your photo and see it on the real product before you ever pay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/shop" variant="primary">
              Shop custom magnets
            </ButtonLink>
            <ButtonLink to="/events" variant="outline">
              Book an event
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80" aria-hidden="true">
          <div className="absolute -left-4 top-6 h-20 w-20 rounded-full bg-sage shadow-card sm:h-24 sm:w-24" />
          <div className="absolute -right-2 bottom-8 h-16 w-16 rounded-full bg-mist shadow-card sm:h-20 sm:w-20" />
          <div className="absolute inset-6 rounded-full bg-white shadow-soft ring-[10px] ring-white sm:inset-8">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-sage to-mist">
              <Camera className="h-16 w-16 text-moss sm:h-20 sm:w-20" />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-cream shadow-soft">
            from $4.98
          </div>
        </div>
      </section>

      <section className="border-y border-mist bg-sage/40">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-3">
          {PROMISES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-forest">Shop by collection</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              to="/shop"
              className="flex flex-col gap-2 rounded-2xl border border-mist bg-white px-5 py-6 shadow-card transition-colors hover:border-forest"
            >
              <span className="font-display text-lg text-forest">{category.label}</span>
              <span className="text-xs text-ink/70">{category.hint}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-forest py-16 text-cream sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-3">
          {HOW_IT_WORKS.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-cream/75">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 rounded-3xl bg-sage/40 p-8 sm:p-12 md:grid-cols-2">
          <div>
            <p className="mb-2 font-medium uppercase tracking-[0.2em] text-moss">Onsite events</p>
            <h2 className="font-display text-3xl text-forest">
              Bring the magnet bar to your next celebration
            </h2>
            <p className="mt-4 text-ink/80">
              We set up onsite at weddings, showers, and parties so guests walk away with a
              magnet made from a photo taken that day.
            </p>
            <ButtonLink to="/events" variant="primary" className="mt-6">
              See event packages
            </ButtonLink>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { tier: 'Up to 50 guests', price: '$375' },
              { tier: 'Up to 100 guests', price: '$750' },
              { tier: 'Up to 200 guests', price: '$925' },
            ].map((tier) => (
              <div key={tier.tier} className="rounded-2xl bg-white px-3 py-5 shadow-card">
                <p className="font-display text-xl text-forest">{tier.price}</p>
                <p className="mt-1 text-xs text-ink/70">{tier.tier}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <ReviewsSection />
      </section>

      <div className="border-t border-mist bg-sage/20">
        <div className="container-page py-16 sm:py-20">
          <FaqAccordion />
        </div>
      </div>

      <section className="container-page pb-20 pt-16 sm:pt-20">
        <div className="rounded-3xl border border-mist bg-white p-8 text-center shadow-card sm:p-12">
          <h2 className="font-display text-3xl text-forest">
            Ready to make something they will keep forever?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink/80">
            Pick a product, upload a photo, and see exactly what you are getting before you buy.
          </p>
          <ButtonLink to="/shop" variant="primary" className="mt-6">
            Start designing
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
