/**
 * Resolves a path under /public (e.g. "images/products/x.jpg") against the
 * app's configured base URL, so it still works when served from a GitHub
 * Pages project path like /tlc84-storefront/.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
