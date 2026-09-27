import type { TextField } from '@/data/catalog'

export default function TextOverlay({ fields, values }: { fields: TextField[]; values: Record<string, string> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[12%] flex flex-col items-center gap-0.5 px-6 text-center">
      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
        Save the Date
      </p>
      {fields.map((field) => (
        <p
          key={field.id}
          className={
            field.id === 'names'
              ? 'font-display text-sm text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'
              : 'text-[10px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'
          }
        >
          {values[field.id]?.trim() || field.placeholder}
        </p>
      ))}
    </div>
  )
}
