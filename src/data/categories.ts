import type { CategorySlug } from './catalog'

export const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: 'custom', label: 'Custom' },
  { slug: 'gifts', label: 'Gifts' },
  { slug: 'faith', label: 'Faith' },
  { slug: 'sports', label: 'Sports' },
  { slug: 'pins', label: 'Pins' },
  { slug: 'baby', label: 'Baby' },
]

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug
}
