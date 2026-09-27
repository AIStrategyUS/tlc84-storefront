import { useParams } from 'react-router-dom'
import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  useSeo(slug ?? 'Product', 'Upload a photo and see it on your product before you buy.')
  return (
    <ComingSoon
      title="This product page is on its way"
      description="Product detail pages and the photo customizer land in Phase 2."
      phaseNote="Coming in Phase 2"
    />
  )
}
