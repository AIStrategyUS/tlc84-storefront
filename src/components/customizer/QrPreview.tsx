import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import type { Size } from '@/data/catalog'
import ProductFrame from '@/components/product/ProductFrame'

export default function QrPreview({ url, size, basePx }: { url: string; size: Size; basePx?: number }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!url.trim()) {
      setDataUrl(null)
      return
    }
    QRCode.toDataURL(url, { margin: 1, width: 400, color: { dark: '#17371A', light: '#FFFFFF' } })
      .then((d) => {
        if (!cancelled) setDataUrl(d)
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null)
      })
    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <ProductFrame size={size} basePx={basePx}>
      <div className="flex h-full w-full items-center justify-center bg-white p-6">
        {dataUrl ? (
          <img src={dataUrl} alt="QR code preview" className="h-full w-full object-contain" />
        ) : (
          <span className="px-4 text-center text-xs text-ink/50">Enter a link to generate a QR code</span>
        )}
      </div>
    </ProductFrame>
  )
}
