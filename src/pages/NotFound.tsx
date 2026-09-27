import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function NotFound() {
  useSeo('Page Not Found', 'The page you are looking for does not exist.')
  return (
    <ComingSoon
      title="We can't find that page"
      description="The link may be old or mistyped. Head back home and we'll get you sorted."
      phaseNote="404"
    />
  )
}
