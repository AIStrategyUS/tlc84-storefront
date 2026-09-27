import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Shop() {
  useSeo('Shop', 'Custom photo magnets, keychains, pins, and gift sets.')
  return (
    <ComingSoon
      title="The full shop is on its way"
      description="Product listings, category filters, and the photo customizer land in Phase 2."
      phaseNote="Coming in Phase 2"
    />
  )
}
