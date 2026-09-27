import type { ReactNode } from 'react'
import type { Size } from '@/data/catalog'

export type ProductType = 'magnet' | 'keychain' | 'pin'

// 2.25" relative to 3", so the two sizes render at their true relative scale.
const SIZE_RATIO: Record<Size, number> = { '3"': 1, '2.25"': 0.75 }

interface ProductFrameProps {
  size?: Size
  productType?: ProductType
  /** Diameter, in px, of a 3" product. 2.25" scales down from this. */
  basePx?: number
  children: ReactNode
  className?: string
}

/**
 * The photorealistic circular product frame shared by the customizer's live
 * preview and the stylized placeholder: a thin metal rim, a soft gloss
 * highlight arc, and a drop shadow. Keychains get a ring at the top; pins
 * get a small pin-back badge.
 */
export default function ProductFrame({
  size = '3"',
  productType = 'magnet',
  basePx = 240,
  children,
  className = '',
}: ProductFrameProps) {
  const diameter = Math.round(basePx * SIZE_RATIO[size])

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: diameter, height: diameter }}>
      {productType === 'keychain' && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3/4 rounded-full border-[3px] border-mist bg-cream"
          style={{ width: diameter * 0.22, height: diameter * 0.22 }}
        />
      )}

      <div className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-soft ring-[6px] ring-white">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 45%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-black/10" />
      </div>

      {productType === 'pin' && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border-2 border-white bg-mist shadow-card"
          style={{ width: diameter * 0.3, height: diameter * 0.3 }}
        >
          <div className="h-1/3 w-1/3 rounded-full bg-forest/70" />
        </div>
      )}
    </div>
  )
}
