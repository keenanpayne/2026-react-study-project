import { twMerge } from 'tailwind-merge'

/**
 * @function cx
 * @description Join class names and merge conflicting Tailwind utilities
 * @param {...Array<string | false | null | undefined>} values - The class names to join
 * @returns {string} The merged class names
 */
export function cx(...values: Array<string | false | null | undefined>) {
  return twMerge(values.filter(Boolean).join(' '))
}
