import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Checkout() {
  useSeo('Checkout', 'A demo checkout. No payment is processed and nothing is stored.')
  return (
    <ComingSoon
      title="Checkout is on its way"
      description="A single-page demo checkout lands in Phase 3."
      phaseNote="Coming in Phase 3"
    />
  )
}
