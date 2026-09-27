import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Cart() {
  useSeo('Cart', 'Review your custom magnets, keychains, and pins.')
  return (
    <ComingSoon
      title="Your cart is on its way"
      description="The cart, checkout, and order confirmation flow land in Phase 3."
      phaseNote="Coming in Phase 3"
    />
  )
}
