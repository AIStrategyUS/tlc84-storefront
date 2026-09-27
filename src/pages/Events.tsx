import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Events() {
  useSeo('Onsite Magnet Events', 'Book onsite magnet-making for your wedding, shower, or party in Middle Tennessee.')
  return (
    <ComingSoon
      title="Event packages are on their way"
      description="Tiers, what's included, and the booking flow land in Phase 4."
      phaseNote="Coming in Phase 4"
    />
  )
}
