import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function EventsBook() {
  useSeo('Book an Event', 'Choose a date and time for your onsite magnet-making event.')
  return (
    <ComingSoon
      title="Booking is on its way"
      description="Pick a date, choose a time, and confirm your event. Lands in Phase 4."
      phaseNote="Coming in Phase 4"
    />
  )
}
