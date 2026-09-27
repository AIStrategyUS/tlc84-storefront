import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Policies() {
  useSeo('Shipping, Returns & Policies', 'Shipping, returns, privacy, and terms.')
  return (
    <ComingSoon
      title="Policies are on their way"
      description="Shipping, returns, privacy, and terms sections land in Phase 4."
      phaseNote="Coming in Phase 4"
    />
  )
}
