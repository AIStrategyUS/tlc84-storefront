import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the element matching the URL's #hash once it's actually in the
 * DOM. Needed because content here renders client-side: the browser's own
 * anchor-scroll on load fires before React has rendered anything, so it
 * silently does nothing without this.
 */
export function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])
}
