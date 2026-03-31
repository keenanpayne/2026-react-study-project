/**
 * @function cx
 * @description Join class names with a space
 * @param {...Array<string | false | null | undefined>} values - The class names to join
 * @returns {string} The joined class names
 */
export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}
