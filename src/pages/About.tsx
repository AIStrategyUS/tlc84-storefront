import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function About() {
  useSeo('Our Story', 'How The Legacy Collective started, and why we make what we make.')
  return (
    <ComingSoon
      title="Our story is on its way"
      description="The full story and family photo land in Phase 4."
      phaseNote="Coming in Phase 4"
    />
  )
}
