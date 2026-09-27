export const GIFT_WRAP_PRICE = 2
export const FREE_SHIPPING_THRESHOLD = 35
export const FLAT_SHIPPING_RATE = 5.95

export function computeShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2).replace(/\.00$/, '')}`
}

export function formatPriceCents(amount: number): string {
  return `$${amount.toFixed(2)}`
}

/**
 * Percent saved buying `tierPrice` for `quantity` units versus buying that
 * many units one at a time at `singleUnitPrice`. Returns null when there's
 * nothing to compare (single-unit tier, or no baseline price).
 */
export function savingsPercent(
  tierPrice: number,
  quantity: number,
  singleUnitPrice: number | undefined,
): number | null {
  if (!singleUnitPrice || quantity <= 1) return null
  const fullPrice = singleUnitPrice * quantity
  if (fullPrice <= tierPrice) return null
  return Math.round((1 - tierPrice / fullPrice) * 100)
}
