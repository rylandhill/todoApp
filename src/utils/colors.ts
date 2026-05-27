const AUTO_COLOR_PALETTE = [
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F59E0B',
  '#22C55E',
  '#EF4444',
  '#06B6D4',
  '#A855F7',
  '#84CC16',
  '#F97316',
  '#6366F1',
]

export const normalizeHexColor = (value: string): string => {
  const trimmed = value.trim().toUpperCase()
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

export const pickUnusedColor = (usedColors: readonly string[]): string => {
  const normalizedUsed = new Set(usedColors.map(normalizeHexColor))
  const fromPalette = AUTO_COLOR_PALETTE.find(
    (candidate) => !normalizedUsed.has(candidate),
  )

  if (fromPalette) {
    return fromPalette
  }

  let seed = 0
  while (seed < 1000) {
    const generated = `#${((seed * 2654435761) % 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`

    if (!normalizedUsed.has(generated)) {
      return generated
    }

    seed += 1
  }

  return '#FFFFFF'
}
