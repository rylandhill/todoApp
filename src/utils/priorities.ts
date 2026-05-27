/**
 * Returns all missing positive priorities between 1 and the current max.
 */
export const getMissingPriorities = (priorities: readonly number[]): number[] => {
  if (priorities.length === 0) {
    return []
  }

  const used = new Set(priorities.filter((value) => Number.isInteger(value) && value > 0))

  if (used.size === 0) {
    return []
  }

  const maxPriority = Math.max(...used)
  const missing: number[] = []

  for (let priority = 1; priority <= maxPriority; priority += 1) {
    if (!used.has(priority)) {
      missing.push(priority)
    }
  }

  return missing
}

/**
 * Compresses sorted priority values into display-friendly ranges.
 */
export const compressPriorityRanges = (priorities: readonly number[]): string[] => {
  if (priorities.length === 0) {
    return []
  }

  const uniqueSorted = Array.from(
    new Set(priorities.filter((value) => Number.isInteger(value) && value > 0)),
  ).sort((a, b) => a - b)

  if (uniqueSorted.length === 0) {
    return []
  }

  const ranges: string[] = []
  let rangeStart = uniqueSorted[0]
  let previous = uniqueSorted[0]

  for (let index = 1; index < uniqueSorted.length; index += 1) {
    const current = uniqueSorted[index]
    if (current === previous + 1) {
      previous = current
      continue
    }

    ranges.push(rangeStart === previous ? `${rangeStart}` : `${rangeStart}-${previous}`)
    rangeStart = current
    previous = current
  }

  ranges.push(rangeStart === previous ? `${rangeStart}` : `${rangeStart}-${previous}`)
  return ranges
}

/**
 * Formats missing priorities as a comma-separated range string.
 */
export const formatMissingPriorityRanges = (priorities: readonly number[]): string => {
  const compressed = compressPriorityRanges(priorities)
  return compressed.length ? compressed.join(', ') : 'None'
}
