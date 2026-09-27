import type { Size } from '@/data/catalog'

export default function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: Size[]
  selected: Size
  onSelect: (size: Size) => void
}) {
  if (sizes.length <= 1) return null
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Size">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          role="radio"
          aria-checked={selected === size}
          onClick={() => onSelect(size)}
          className={`flex min-h-[44px] min-w-[60px] items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors ${
            selected === size
              ? 'border-forest bg-forest text-cream'
              : 'border-mist bg-white text-ink/80 hover:border-forest'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
