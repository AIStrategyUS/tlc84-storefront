import { Star } from 'lucide-react'
import { REVIEWS } from '@/data/reviews'

/** Content only — no outer container or padding, so callers can nest this inside their own layout. */
export default function ReviewsSection() {
  return (
    <>
      <h2 className="mb-10 text-center font-display text-3xl text-forest">What people are saying</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((review) => (
          <div key={review.name} className="rounded-2xl border border-mist bg-white p-5 shadow-card">
            <div className="mb-2 flex gap-0.5 text-moss" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: review.rating }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="text-sm text-ink/80">{review.text}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink/50">{review.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
