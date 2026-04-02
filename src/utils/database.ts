import type { TreeNode } from '~/types/workbench'

export function buildEditedValues(
  row: TreeNode | null,
): Record<string, string> {
  if (!row?.children) return {}

  const values: Record<string, string> = {}
  for (const col of row.children) {
    values[col.name] =
      col.value !== null && col.value !== undefined ? String(col.value) : ''
  }
  return values
}
