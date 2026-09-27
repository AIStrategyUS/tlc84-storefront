import { useEffect } from 'react'

/** Injects a JSON-LD <script> into <head> for the life of the component, for structured data like Product schema. */
export function useJsonLd(data: object) {
  const json = JSON.stringify(data)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = json
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [json])
}
