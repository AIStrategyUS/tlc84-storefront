import { useEffect } from 'react'

const SITE_NAME = 'The Legacy Collective'

/**
 * Sets the document title and meta description for the current route.
 * Restores the previous values on unmount so navigating away (e.g. into a
 * modal-like route) doesn't leave a stale title behind.
 */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? undefined
    if (description && meta) meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (previousDescription && meta) meta.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
