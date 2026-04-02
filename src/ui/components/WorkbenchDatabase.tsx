import { useState } from 'react'
import { Database } from 'lucide-react'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchRightContent from './WorkbenchRightContent'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import DatabaseTable from './DatabaseTable'
import DatabaseRowEditForm from './DatabaseRowEditForm'
import type { TreeNode } from '~/types/workbench'
import type { PaginationConfig } from './WorkbenchLeftSidebar'
import { buildEditedValues } from '~/utils/database'

const DB_PAGINATION: PaginationConfig = {
  depths: [1],
  pageSize: 10,
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
            list={list}
            listLabel="Tables"
            listIcon={Database}
            selectedNode={selectedNode}
            selectedRow={selectedRow}
            onSelect={handleSelectNode}
            pagination={DB_PAGINATION}
            truncateNames={true}
          />

          <WorkbenchRightContent
            title={
              selectedNode ? (
                <div className="flex flex-1 flex-row gap-3">
                  <p>
                    Table:{' '}
                    <span className="font-bold">{selectedNode.name}</span>
                  </p>
                  <p className="text-text-muted text-sm">
                    {`${selectedNode.children?.length ?? 0} ${selectedNode.type === 'table' ? 'rows' : 'columns'}`}
                  </p>
                </div>
              ) : (
                'Tables'
              )
            }
          >
            <div className="flex flex-col gap-3">
              <div className="px-4 py-3">
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
