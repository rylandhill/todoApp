/**
 * Generates a random color using three 0-255 channel values.
 */
export const pickUnusedColor = (): string => {
  const channel = () => Math.floor(Math.random() * 256)
  const red = channel()
  const green = channel()
  const blue = channel()

  return `#${red.toString(16).padStart(2, '0')}${green
    .toString(16)
    .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`.toUpperCase()
}
