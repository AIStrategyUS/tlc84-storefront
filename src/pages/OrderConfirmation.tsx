import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function OrderConfirmation() {
  useSeo('Order Confirmed', 'Your order confirmation and what happens next.')
  return (
    <ComingSoon
      title="Order confirmation is on its way"
      description="Order details and a what-happens-next timeline land in Phase 3."
      phaseNote="Coming in Phase 3"
    />
  )
}
