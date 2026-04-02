import { useState } from 'react'
import { Database } from 'lucide-react'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchRightContent from './WorkbenchRightContent'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import DatabaseTable from './DatabaseTable'
import DatabaseRowEditForm from './DatabaseRowEditForm'
import type { TreeNode } from '~/types/workbench'

function buildEditedValues(row: TreeNode | null): Record<string, string> {
  if (!row?.children) return {}

  const values: Record<string, string> = {}
  for (const col of row.children) {
    values[col.name] =
      col.value !== null && col.value !== undefined ? String(col.value) : ''
  }
  return values
}

type WorkbenchDatabaseProps = {
  list: TreeNode[]
  isVisible: boolean
}

export default function WorkbenchDatabase({
  list,
  isVisible,
}: WorkbenchDatabaseProps) {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [selectedRow, setSelectedRow] = useState<TreeNode | null>(null)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({})

  function handleSelectNode(node: TreeNode | null) {
    if (node?.type === 'row') {
      const parentTable = list.find((table) =>
        table.children?.some((r) => r === node),
      )
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

  function handleSelectRow(row: TreeNode | null) {
    setSelectedRow(row)
    setEditedValues(buildEditedValues(row))
  }

  return (
    <WorkbenchContainer className={isVisible ? '' : 'hidden'}>
      <WorkbenchContents>
        <div className="flex min-h-0 flex-1 flex-col @md:flex-row">
          <WorkbenchLeftSidebar
            key={list.map((n) => n.name).join(':')}
            list={list}
            listLabel="Tables"
            listIcon={Database}
            selectedNode={selectedNode}
            selectedRow={selectedRow}
            onSelect={handleSelectNode}
            pagination={{ depths: [1], pageSize: 10 }}
            truncateNames={true}
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
                {selectedNode?.children ? (
                  <DatabaseTable
                    node={selectedNode}
                    selectedRow={selectedRow}
                    onSelectRow={handleSelectRow}
                  />
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
