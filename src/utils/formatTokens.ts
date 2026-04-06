export function formatTokens(tokens: number): string {
  const n = Math.max(0, tokens)
  const scales = [
    { threshold: 1e9, suffix: 'B' },
    { threshold: 1e6, suffix: 'M' },
    { threshold: 1e3, suffix: 'k' },
  ] as const

  const toCompactUnitValue = (value: number, divideBy: number): number =>
    +(value / divideBy).toFixed(1)

  const scale = scales.find(({ threshold }) => n >= threshold)

  return scale
    ? `${toCompactUnitValue(n, scale.threshold)}${scale.suffix}`
    : n.toString()
}
