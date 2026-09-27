import type { OptionGroup } from '@/data/catalog'

/** Pulls the first number out of a pack label ("Pack of 4" -> 4, "Single" -> 1). */
export function parseQuantityFromLabel(label: string): number {
  const match = label.match(/\d+/)
  return match ? parseInt(match[0], 10) : 1
}

/**
 * Reverses ProductOptionsSummary-style strings ("Sport: Soccer") back into
 * an { [groupId]: choiceValue } map, for seeding a product page's option
 * state when editing an existing cart line.
 */
export function restoreOptionValues(optionGroups: OptionGroup[], optionsSummary: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const group of optionGroups) {
    const prefix = `${group.label}: `
    const line = optionsSummary.find((s) => s.startsWith(prefix))
    if (!line) continue
    const labelText = line.slice(prefix.length)
    const choice = group.choices.find((c) => c.label === labelText)
    if (choice) result[group.id] = choice.value
  }
  return result
}
