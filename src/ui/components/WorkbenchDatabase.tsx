import { useState, type KeyboardEvent } from 'react'
import { Database } from 'lucide-react'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchRightContent from './WorkbenchRightContent'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import DatabaseRowEditForm from './DatabaseRowEditForm'
import { type MockWorkbenchFileTreeNode } from '~/data/MockWorkbenchCodebase'

function buildEditedValues(
  row: MockWorkbenchFileTreeNode | null,
): Record<string, string> {
  if (!row?.children) return {}

  const values: Record<string, string> = {}
  for (const col of row.children) {
    values[col.name] =
      col.value !== null && col.value !== undefined ? String(col.value) : ''
  }
  return values
}

type WorkbenchDatabaseProps = {
  list: MockWorkbenchFileTreeNode[]
  isVisible: boolean
}

export default function WorkbenchDatabase(props: WorkbenchDatabaseProps) {
  const [selectedNode, setSelectedNode] =
    useState<MockWorkbenchFileTreeNode | null>(null)
  const [selectedRow, setSelectedRow] =
    useState<MockWorkbenchFileTreeNode | null>(null)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({})

  function findParentTable(
    row: MockWorkbenchFileTreeNode,
  ): MockWorkbenchFileTreeNode | undefined {
    return props.list.find((table) => table.children?.some((r) => r === row))
  }

  function handleSelectNode(node: MockWorkbenchFileTreeNode | null) {
    if (node?.type === 'row') {
      const parentTable = findParentTable(node)
      if (parentTable) {
        setSelectedNode(parentTable)
        handleSelectRow(node)
        return
      }
    }

    setSelectedNode(node)
    setSelectedRow(null)
    setEditedValues({})
  }

  function handleSelectRow(row: MockWorkbenchFileTreeNode | null) {
    setSelectedRow(row)
    setEditedValues(buildEditedValues(row))
  }

  return (
    <WorkbenchContainer className={props.isVisible ? '' : 'hidden'}>
      <WorkbenchContents>
        <div className="flex min-h-0 flex-1 flex-col @md:flex-row">
          <WorkbenchLeftSidebar
            list={props.list}
            listLabel="Tables"
            listIcon={Database}
            selectedNode={selectedNode}
            selectedRow={selectedRow}
            onSelect={handleSelectNode}
          />

          <WorkbenchRightContent>
            <div className="flex flex-col gap-3">
              <header className="divider-bottom flex flex-col gap-0.5 px-5 py-2">
                <h2 className="font-medium">
                  {selectedNode ? (
                    <>
                      Table:{' '}
                      <span className="font-bold">{selectedNode.name}</span>
                    </>
                  ) : (
                    'Tables'
                  )}
                </h2>

                <p className="text-sm">
                  {selectedNode
                    ? `${selectedNode.children?.length ?? 0} ${selectedNode.type === 'table' ? 'rows' : 'columns'}`
                    : 'View and manage database tables and records. Ask Bolt to create or modify tables.'}
                </p>
              </header>

              <div className="px-4 py-2">
                {selectedNode?.children && selectedNode.children.length > 0 ? (
                  <div className="panel-card overflow-x-auto rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="section-header">
                          {selectedNode.children[0].children?.map((col) => (
                            <th
                              key={col.id ?? col.name}
                              className="text-text-secondary px-4 py-2 text-left font-medium whitespace-nowrap"
                            >
                              {col.name}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {selectedNode.children.map((row) => {
                          const isSelected = selectedRow === row
                          return (
                            <tr
                              key={row.id ?? row.name}
                              tabIndex={0}
                              aria-selected={isSelected}
                              onClick={() =>
                                handleSelectRow(isSelected ? null : row)
                              }
                              onKeyDown={(
                                e: KeyboardEvent<HTMLTableRowElement>,
                              ) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleSelectRow(isSelected ? null : row)
                                }
                              }}
                              className={`divider-bottom cursor-pointer last:border-b-0 ${
                                isSelected
                                  ? 'bg-selected'
                                  : 'hover:bg-surface-raised'
                              }`}
                            >
                              {row.children?.map((col) => (
                                <td
                                  key={col.id ?? col.name}
                                  className="text-text-secondary px-4 py-2 whitespace-nowrap"
                                >
                                  {col.value !== null &&
                                  col.value !== undefined ? (
                                    String(col.value)
                                  ) : (
                                    <span className="text-text-faint">
                                      NULL
                                    </span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : selectedNode ? (
                  <p className="text-text-muted text-sm">
                    No rows in this table.
                  </p>
                ) : null}
              </div>

              {selectedRow?.children && (
                <div className="px-4 pb-4">
                  <DatabaseRowEditForm
                    selectedRow={selectedRow}
                    editedValues={editedValues}
                    onValueChange={(name, value) =>
                      setEditedValues((prev) => ({ ...prev, [name]: value }))
                    }
                    onClose={() => handleSelectRow(null)}
                    onSave={() => handleSelectRow(null)}
                  />
                </div>
              )}
            </div>
          </WorkbenchRightContent>
        </div>
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}
