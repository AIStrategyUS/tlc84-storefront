import { Heart } from 'lucide-react'
import { useSeo } from '@/lib/useSeo'

const OUR_STORY = `Our story began with a simple desire: to honor the memory of our beloved Papa by creating something that would carry his spirit forward. What started with our mom and grandma sharing their crafts at local shows has grown into a vision much bigger than us. We believe each of us has unique gifts, whether it's creativity, precision, or care, and together, those gifts can build something that lasts. This business is more than products or services; it's about legacy, purpose, and connection. By blending artistry, skill, and heart, we hope to serve our community today while creating a foundation that endures for generations.`

export default function About() {
  useSeo('Our Story', 'How The Legacy Collective started, and why we make what we make.')

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-center font-medium uppercase tracking-[0.2em] text-moss">Our story</p>
        <h1 className="text-center font-display text-4xl text-forest sm:text-5xl">
          Rooted in love, growing in purpose
        </h1>

        {/* TODO: replace with the family's own photo once available */}
        <div className="mx-auto mt-10 flex aspect-[4/3] max-w-xl items-center justify-center rounded-3xl bg-sage/40">
          <div className="text-center text-forest/70">
            <Heart className="mx-auto mb-2 h-8 w-8" aria-hidden="true" />
            <p className="text-sm">Family photo coming soon</p>
          </div>
        </div>

        <p className="mt-10 whitespace-pre-line text-lg leading-relaxed text-ink/80">{OUR_STORY}</p>

        <p className="mt-10 text-center font-display text-xl text-forest">
          Family-made in Pittsburgh, PA.
        </p>
      </div>
    </div>
  )
}
