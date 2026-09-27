import { ButtonLink } from './Button'

interface ComingSoonProps {
  title: string
  description: string
  phaseNote: string
}

/**
 * Placeholder for routes not yet built out. Keeps every nav link and CTA
 * pointing somewhere real instead of a dead link while phases are still in
 * progress; each page that uses this swaps it for real content in its
 * scheduled phase.
 */
export default function ComingSoon({ title, description, phaseNote }: ComingSoonProps) {
  return (
    <div className="container-page py-20 text-center sm:py-28">
      <p className="mb-3 font-medium uppercase tracking-[0.2em] text-moss">{phaseNote}</p>
      <h1 className="font-display text-3xl text-forest sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink/80">{description}</p>
      <ButtonLink to="/" variant="outline" className="mt-8">
        Back to home
      </ButtonLink>
    </div>
  )
}
