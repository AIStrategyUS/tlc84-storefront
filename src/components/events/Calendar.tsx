import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateKey } from '@/data/events'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(a: Date, b: Date): boolean {
  return formatDateKey(a) === formatDateKey(b)
}

interface CalendarProps {
  selected: Date | null
  onSelect: (date: Date) => void
  minDate: Date
  maxDate: Date
  unavailableDates: Set<string>
}

export default function Calendar({ selected, onSelect, minDate, maxDate, unavailableDates }: CalendarProps) {
  const [viewedMonth, setViewedMonth] = useState(() => startOfMonth(minDate))

  const minMonth = startOfMonth(minDate)
  const maxMonth = startOfMonth(maxDate)
  const canGoPrev = viewedMonth > minMonth
  const canGoNext = viewedMonth < maxMonth

  const firstOfMonth = startOfMonth(viewedMonth)
  const daysInMonth = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()

  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), i + 1)),
  ]

  const monthLabel = viewedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="rounded-2xl border border-mist bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewedMonth(new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-forest hover:bg-sage/60 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="font-display text-lg text-forest">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setViewedMonth(new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 1))}
          disabled={!canGoNext}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-forest hover:bg-sage/60 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink/50">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />
          const dayOfWeek = date.getDay()
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
          const key = formatDateKey(date)
          const isPast = date < minDate
          const isBeyondWindow = date > maxDate
          const isUnavailable = unavailableDates.has(key)
          const isDisabled = isPast || isBeyondWindow || isUnavailable
          const isSelected = selected ? isSameDay(date, selected) : false

          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(date)}
              aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              aria-pressed={isSelected}
              className={`flex aspect-square items-center justify-center rounded-full text-sm transition-colors ${
                isSelected
                  ? 'bg-forest font-semibold text-cream'
                  : isDisabled
                    ? 'cursor-not-allowed text-ink/25 line-through'
                    : isWeekend
                      ? 'bg-sage/50 text-ink hover:bg-sage'
                      : 'text-ink hover:bg-sage/50'
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink/60">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-sage/50" /> Weekend
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-forest" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-ink/25 line-through">00</span> Unavailable
        </span>
      </div>
    </div>
  )
}
