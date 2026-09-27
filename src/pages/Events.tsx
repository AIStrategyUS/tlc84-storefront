import { Camera, MapPin, Sparkles, Users } from 'lucide-react'
import { SERVICE_TIERS } from '@/data/events'
import { formatPrice } from '@/lib/pricing'
import { useSeo } from '@/lib/useSeo'
import { ButtonLink } from '@/components/ui/Button'

const STEPS = [
  {
    icon: Users,
    title: 'Pick a package',
    body: 'Choose the tier that fits your guest count, then pick a date and time.',
  },
  {
    icon: Camera,
    title: 'We set up onsite',
    body: 'Our magnet bar arrives ready to go, with a photographer capturing the moment.',
  },
  {
    icon: Sparkles,
    title: 'Guests leave with a keepsake',
    body: 'Photos print in minutes, right there, so everyone walks away with a magnet made that day.',
  },
]

export default function Events() {
  useSeo(
    'Onsite Magnet Events',
    'Book onsite magnet-making for your wedding, shower, birthday, or corporate event in Pittsburgh, PA.',
  )

  return (
    <div>
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-medium uppercase tracking-[0.2em] text-moss">Onsite magnet events</p>
          <h1 className="font-display text-4xl text-forest sm:text-5xl">
            Turn your event into keepsakes, on the spot
          </h1>
          <p className="mt-5 text-lg text-ink/80">
            We bring our magnet bar to your next birthday, anniversary, baby shower, bridal shower, or
            wedding to capture your special moments and transform them into cherished keepsake magnets.
          </p>
          <ButtonLink to="/events/book" variant="primary" className="mt-8">
            Check availability
          </ButtonLink>
        </div>
      </section>

      <section className="border-y border-mist bg-sage/30 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="mb-8 text-center font-display text-3xl text-forest">Choose your package</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {SERVICE_TIERS.map((tier) => (
              <div key={tier.id} className="rounded-2xl border border-mist bg-white p-6 text-center shadow-card">
                <p className="font-display text-3xl text-forest">{formatPrice(tier.price)}</p>
                <p className="mt-2 text-sm font-medium text-ink">{tier.label}</p>
                <p className="mt-1 text-sm text-ink/60">{tier.duration}</p>
                <ul className="mt-4 space-y-1.5 text-left text-sm text-ink/80">
                  <li>• Onsite magnet-making station</li>
                  <li>• All materials and setup included</li>
                  <li>• Unlimited magnets for the tier's guest count</li>
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ink/60">
            Service area: Pittsburgh, PA. Contact us for other areas.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="mb-10 text-center font-display text-3xl text-forest">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/60 text-forest">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-moss">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-xl text-forest">{title}</h3>
              <p className="mt-2 text-sm text-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="rounded-3xl border border-mist bg-white p-8 text-center shadow-card sm:p-12">
          <MapPin className="mx-auto mb-3 h-6 w-6 text-forest" aria-hidden="true" />
          <h2 className="font-display text-3xl text-forest">Ready to book your date?</h2>
          <p className="mx-auto mt-3 max-w-md text-ink/80">
            Pick a package, choose a date, and we'll take care of the rest.
          </p>
          <ButtonLink to="/events/book" variant="primary" className="mt-6">
            Check availability
          </ButtonLink>
        </div>
      </section>
    </div>
  )
}
