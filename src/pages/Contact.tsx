import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function Contact() {
  useSeo('Contact', 'Get in touch with The Legacy Collective.')
  return (
    <ComingSoon
      title="The contact page is on its way"
      description="A contact form and details land in Phase 4."
      phaseNote="Coming in Phase 4"
    />
  )
}
