import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AddedToCartNotice({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-sage/60 px-4 py-3 text-sm font-medium text-forest" role="status">
      <span className="flex items-center gap-2">
        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        Added to your cart
      </span>
      <Link to="/cart" className="underline underline-offset-2 hover:no-underline">
        View cart
      </Link>
    </div>
  )
}
