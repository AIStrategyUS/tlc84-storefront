import { useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import {
  BOOKING_WINDOW_DAYS,
  SERVICE_TIERS,
  TIME_SLOTS,
  generateBookingReference,
  getUnavailableDateKeys,
} from '@/data/events'
import { formatPrice } from '@/lib/pricing'
import { useSeo } from '@/lib/useSeo'
import { Button, ButtonLink } from '@/components/ui/Button'
import Calendar from '@/components/events/Calendar'

type Step = 'tier' | 'datetime' | 'details' | 'review' | 'confirmed'

const STEP_LABELS: { id: Step; label: string }[] = [
  { id: 'tier', label: 'Package' },
  { id: 'datetime', label: 'Date & time' },
  { id: 'details', label: 'Details' },
  { id: 'review', label: 'Review' },
]

interface EventDetails {
  eventType: string
  venueAddress: string
  guestCount: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

const INITIAL_DETAILS: EventDetails = {
  eventType: '',
  venueAddress: '',
  guestCount: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
}

function validateDetails(details: EventDetails): Partial<Record<keyof EventDetails, string>> {
  const errors: Partial<Record<keyof EventDetails, string>> = {}
  if (!details.eventType.trim()) errors.eventType = 'Required'
  if (!details.venueAddress.trim()) errors.venueAddress = 'Required'
  if (!details.guestCount.trim()) errors.guestCount = 'Required'
  if (!details.contactName.trim()) errors.contactName = 'Required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.contactEmail)) errors.contactEmail = 'Enter a valid email address'
  return errors
}

const inputClass =
  'min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss'

export default function EventsBook() {
  useSeo('Book an Event', 'Choose a date and time for your onsite magnet-making event.')

  const [step, setStep] = useState<Step>('tier')
  const [tierId, setTierId] = useState(SERVICE_TIERS[0].id)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetails] = useState<EventDetails>(INITIAL_DETAILS)
  const [errors, setErrors] = useState<Partial<Record<keyof EventDetails, string>>>({})
  const [bookingRef, setBookingRef] = useState<string | null>(null)

  const tier = SERVICE_TIERS.find((t) => t.id === tierId)!
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + BOOKING_WINDOW_DAYS)
  const unavailableDates = getUnavailableDateKeys()

  function update<K extends keyof EventDetails>(key: K, value: string) {
    setDetails((d) => ({ ...d, [key]: value }))
  }

  function handleDetailsSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validateDetails(details)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setStep('review')
  }

  function handleConfirm() {
    setBookingRef(generateBookingReference())
    setStep('confirmed')
  }

  if (step === 'confirmed' && bookingRef) {
    return (
      <div className="container-page max-w-2xl py-16 text-center sm:py-24">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-forest" aria-hidden="true" />
        <p className="font-medium uppercase tracking-[0.2em] text-moss">Booked</p>
        <h1 className="mt-2 font-display text-3xl text-forest sm:text-4xl">Your event is booked</h1>
        <p className="mt-3 text-ink/80">
          Booking reference <span className="font-semibold text-forest">{bookingRef}</span>
        </p>

        <div className="mt-8 space-y-2 rounded-2xl border border-mist bg-white p-6 text-left text-sm text-ink/80">
          <div className="flex justify-between">
            <span>Package</span>
            <span className="font-medium text-forest">
              {tier.label} · {formatPrice(tier.price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-medium text-forest">
              {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span className="font-medium text-forest">{time}</span>
          </div>
          <div className="flex justify-between">
            <span>Venue</span>
            <span className="font-medium text-forest">{details.venueAddress}</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-ink/60">
          We've sent a confirmation to {details.contactEmail}. We'll follow up to finalize details.
        </p>

        <ButtonLink to="/" variant="outline" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="container-page max-w-2xl py-10 sm:py-14">
      <h1 className="mb-2 font-display text-3xl text-forest sm:text-4xl">Book your event</h1>
      <p className="mb-8 text-ink/70">Middle Tennessee only. Contact us for other areas.</p>

      <ol className="mb-10 flex items-center gap-2 text-xs font-medium text-ink/50 sm:text-sm">
        {STEP_LABELS.map((s, i) => {
          const isActive = s.id === step
          const isDone = STEP_LABELS.findIndex((x) => x.id === step) > i
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  isActive ? 'bg-forest text-cream' : isDone ? 'bg-moss text-cream' : 'bg-mist text-ink/60'
                }`}
              >
                {i + 1}
              </span>
              <span className={isActive ? 'text-forest' : ''}>{s.label}</span>
              {i < STEP_LABELS.length - 1 && <span className="h-px flex-1 bg-mist" />}
            </li>
          )
        })}
      </ol>

      {step === 'tier' && (
        <div className="space-y-6">
          <div className="space-y-3">
            {SERVICE_TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTierId(t.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
                  tierId === t.id ? 'border-forest bg-sage/30' : 'border-mist bg-white hover:border-forest'
                }`}
              >
                <div>
                  <p className="font-display text-lg text-forest">{t.label}</p>
                  <p className="text-sm text-ink/60">{t.duration}</p>
                </div>
                <span className="font-display text-xl text-forest">{formatPrice(t.price)}</span>
              </button>
            ))}
          </div>
          <Button onClick={() => setStep('datetime')} className="w-full sm:w-auto">
            Continue
          </Button>
        </div>
      )}

      {step === 'datetime' && (
        <div className="space-y-6">
          <Calendar selected={date} onSelect={setDate} minDate={today} maxDate={maxDate} unavailableDates={unavailableDates} />

          {date && (
            <div>
              <p className="mb-2 text-sm font-medium text-ink">Time</p>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                      time === slot ? 'border-forest bg-forest text-cream' : 'border-mist bg-white text-ink/80 hover:border-forest'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('tier')}>
              Back
            </Button>
            <Button onClick={() => setStep('details')} disabled={!date || !time}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Event type</span>
            <input
              type="text"
              value={details.eventType}
              onChange={(e) => update('eventType', e.target.value)}
              placeholder="Wedding, baby shower, birthday..."
              className={inputClass}
            />
            {errors.eventType && <span className="mt-1 block text-xs text-red-700">{errors.eventType}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Venue address</span>
            <input
              type="text"
              value={details.venueAddress}
              onChange={(e) => update('venueAddress', e.target.value)}
              className={inputClass}
            />
            {errors.venueAddress && <span className="mt-1 block text-xs text-red-700">{errors.venueAddress}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Estimated guest count</span>
            <input
              type="text"
              inputMode="numeric"
              value={details.guestCount}
              onChange={(e) => update('guestCount', e.target.value)}
              className={inputClass}
            />
            {errors.guestCount && <span className="mt-1 block text-xs text-red-700">{errors.guestCount}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Your name</span>
            <input
              type="text"
              value={details.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              className={inputClass}
            />
            {errors.contactName && <span className="mt-1 block text-xs text-red-700">{errors.contactName}</span>}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
              <input
                type="email"
                value={details.contactEmail}
                onChange={(e) => update('contactEmail', e.target.value)}
                className={inputClass}
              />
              {errors.contactEmail && <span className="mt-1 block text-xs text-red-700">{errors.contactEmail}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Phone (optional)</span>
              <input
                type="tel"
                value={details.contactPhone}
                onChange={(e) => update('contactPhone', e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setStep('datetime')}>
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      )}

      {step === 'review' && (
        <div className="space-y-6">
          <div className="space-y-3 rounded-2xl border border-mist bg-white p-6 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/70">Package</span>
              <span className="font-medium text-forest">
                {tier.label} · {formatPrice(tier.price)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70">Date</span>
              <span className="font-medium text-forest">
                {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70">Time</span>
              <span className="font-medium text-forest">{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70">Event type</span>
              <span className="font-medium text-forest">{details.eventType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70">Venue</span>
              <span className="font-medium text-forest">{details.venueAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70">Guests</span>
              <span className="font-medium text-forest">{details.guestCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70">Contact</span>
              <span className="font-medium text-forest">
                {details.contactName} · {details.contactEmail}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('details')}>
              Back
            </Button>
            <Button onClick={handleConfirm}>Confirm booking</Button>
          </div>
        </div>
      )}
    </div>
  )
}
