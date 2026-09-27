import type { OptionGroup } from '@/data/catalog'

export default function OptionSelect({
  group,
  value,
  onChange,
}: {
  group: OptionGroup
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{group.label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss sm:w-64"
      >
        {group.choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </label>
  )
}
