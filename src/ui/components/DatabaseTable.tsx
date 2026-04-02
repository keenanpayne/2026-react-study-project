import type { KeyboardEvent } from 'react'
import type { TreeNode } from '~/types/workbench'
import { cx } from '~/utils/cx'

type DatabaseTableProps = {
  node: TreeNode
  selectedRow: TreeNode | null
  onSelectRow: (row: TreeNode | null) => void
}

export default function DatabaseTable({
  node,
  selectedRow,
  onSelectRow,
}: DatabaseTableProps) {
  if (!node.children || node.children.length === 0) {
    return <p className="text-text-muted text-sm">No rows in this table.</p>
  }

  const displayRows = selectedRow ? [selectedRow] : node.children

  return (
    <div className="panel-card overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="section-header">
            {node.children[0].children?.map((col) => (
              <th
                key={col.id ?? col.name}
                scope="col"
                className="text-text-secondary px-4 py-2 text-left font-medium whitespace-nowrap"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {displayRows.map((row) => {
            const isSelected = selectedRow === row

            return (
              <tr
                key={row.id ?? row.name}
                tabIndex={0}
                aria-selected={isSelected}
                onClick={() => onSelectRow(isSelected ? null : row)}
                onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectRow(isSelected ? null : row)
                  }
                }}
                className={cx(
                  'divider-bottom cursor-pointer last:border-b-0',
                  isSelected ? 'bg-selected' : 'hover:bg-surface-raised',
                )}
              >
                {row.children?.map((col) => (
                  <td
                    key={col.id ?? col.name}
                    className="text-text-secondary px-4 py-2 whitespace-nowrap"
                  >
                    {col.value !== null && col.value !== undefined ? (
                      String(col.value)
                    ) : (
                      <span className="text-text-muted">NULL</span>
                    )}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
