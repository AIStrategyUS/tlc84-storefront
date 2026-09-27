import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Bulk() {
  useSeo('Bulk & Business Orders', 'Volume pricing for realtors, churches, schools, and teams.')
  return (
    <ComingSoon
      title="Bulk pricing is on its way"
      description="Tiered pricing, use cases, and a quote request form land in Phase 4."
      phaseNote="Coming in Phase 4"
    />
  )
}
