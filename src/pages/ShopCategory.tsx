import { useParams } from 'react-router-dom'
import ComingSoon from '@/components/ui/ComingSoon'
import { useSeo } from '@/lib/useSeo'

export default function ShopCategory() {
  const { category } = useParams<{ category: string }>()
  useSeo(category ? `Shop ${category}` : 'Shop', 'Custom photo magnets, keychains, pins, and gift sets.')
  return (
    <ComingSoon
      title="This collection is on its way"
      description="Category pages land in Phase 2, alongside the full product catalog."
      phaseNote="Coming in Phase 2"
    />
  )
}
