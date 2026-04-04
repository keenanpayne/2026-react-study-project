import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronsUpDown, Database } from 'lucide-react'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchRightContent from './WorkbenchRightContent'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import DatabaseTable from './DatabaseTable'
import DatabaseRowEditForm from './DatabaseRowEditForm'
import type { TreeNode } from '~/types/workbench'
import type { PaginationConfig } from './WorkbenchLeftSidebar'
import { buildEditedValues } from '~/utils/database'
import { joinTreePath } from '~/utils/tree'
import { useCollapsible } from '~/hooks/useCollapsible'
import type { WorkbenchDatabaseSection } from '~/types/navigation'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownTrigger from './DropdownTrigger'
import Button from './Button'
import BoltLogo from './BoltLogo'

const DB_PAGINATION: PaginationConfig = {
  depths: [1],
  pageSize: 10,
}

const LOG_TYPE_OPTIONS = [
  'Server Function Logs',
  'Authentication Logs',
  'PostgreSQL Logs',
  'Realtime Logs',
] as const

type LogTypeOption = (typeof LOG_TYPE_OPTIONS)[number]

function LogsTypeMenu({
  value,
  onChange,
}: {
  value: LogTypeOption
  onChange: (next: LogTypeOption) => void
}) {
  const closeCtx = useDropdownTriggerClose()

  return (
    <Dropdown align="left" className="w-55">
      <DropdownList>
        {LOG_TYPE_OPTIONS.map((label) => (
          <DropdownItem
            key={label}
            size="md"
            title={label}
            selected={label === value}
            onSelect={() => {
              onChange(label)
              closeCtx?.close()
            }}
          />
        ))}
      </DropdownList>
    </Dropdown>
  )
}

function DatabaseSection({ list }: { list: TreeNode[] }) {
  const sidebarExpandedRef = useRef(true)
  const contentExpandedRef = useRef(true)

  const { isExpanded: sidebarExpanded, toggle: toggleSidebar } = useCollapsible(
    true,
    () => !sidebarExpandedRef.current || contentExpandedRef.current,
  )
  const { isExpanded: contentExpanded, toggle: toggleContent } = useCollapsible(
    true,
    () => !contentExpandedRef.current || sidebarExpandedRef.current,
  )

  useEffect(() => {
    sidebarExpandedRef.current = sidebarExpanded
    contentExpandedRef.current = contentExpanded
  }, [sidebarExpanded, contentExpanded])

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [selectedNodePath, setSelectedNodePath] = useState<string | null>(null)
  const [selectedRow, setSelectedRow] = useState<TreeNode | null>(null)
  const [selectedRowPath, setSelectedRowPath] = useState<string | null>(null)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({})

  function handleSelectNode(node: TreeNode | null, path?: string) {
    if (node?.type === 'row' && path) {
      const parentTable = list.find((table) =>
        table.children?.some((r) => r === node),
      )
      if (parentTable) {
        const parentPath = path.substring(0, path.lastIndexOf('/'))
        setSelectedNode(parentTable)
        setSelectedNodePath(parentPath || parentTable.name)
        handleSelectRow(node, path)
        return
      }
    }

    setSelectedNode(node)
    setSelectedNodePath(path ?? null)
    setSelectedRow(null)
    setSelectedRowPath(null)
    setEditedValues({})
  }

  function handleSelectRow(row: TreeNode | null, rowPath?: string) {
    setSelectedRow(row)
    setSelectedRowPath(
      row
        ? (rowPath ??
            (selectedNodePath
              ? joinTreePath(selectedNodePath, row.name)
              : null))
        : null,
    )
    setEditedValues(buildEditedValues(row))
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col @md:flex-row">
      <WorkbenchLeftSidebar
        list={list}
        listLabel="Tables"
        listIcon={Database}
        selectedNodePath={selectedNodePath}
        selectedRowPath={selectedRowPath}
        onSelect={handleSelectNode}
        pagination={DB_PAGINATION}
        truncateNames={true}
        panelExpanded={sidebarExpanded}
        onPanelToggle={toggleSidebar}
        collapseDisabled={sidebarExpanded && !contentExpanded}
      />

      <WorkbenchRightContent
        title={
          selectedNode ? (
            <div className="flex flex-1 flex-row gap-3">
              <p>
                Table: <span className="font-bold">{selectedNode.name}</span>
              </p>
              <p className="text-text-muted text-sm">
                {`${selectedNode.children?.length ?? 0} ${selectedNode.type === 'table' ? 'rows' : 'columns'}`}
              </p>
            </div>
          ) : (
            'Tables'
          )
        }
        panelExpanded={contentExpanded}
        onPanelToggle={toggleContent}
        collapseDisabled={contentExpanded && !sidebarExpanded}
      >
        <div className="flex flex-col">
          <div className="p-3">
            {selectedNode?.children ? (
              <DatabaseTable
                node={selectedNode}
                selectedRow={selectedRow}
                onSelectRow={handleSelectRow}
              />
            ) : null}
          </div>

          {selectedRow?.children && (
            <div className="px-3 pb-3">
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
  )
}

function LogsSection() {
  const [logType, setLogType] = useState<LogTypeOption>(LOG_TYPE_OPTIONS[0])

  return (
    <div className="space-y-3 p-6 md:space-y-6">
      <header>
        <h2 className="mb-1.5 text-xl font-semibold">Logs</h2>

        <p>
          Monitor database queries, authentication events, and backend services.
        </p>
        <p>Troubleshoot errors and track activity from the past hour.</p>
      </header>

      <DropdownTrigger
        size="md"
        radius="md"
        className="h-9"
        wrapperClassName="shrink-0"
        dropdown={<LogsTypeMenu value={logType} onChange={setLogType} />}
      >
        <span className="max-w-[min(100%,14rem)] truncate text-sm font-medium">
          {logType}
        </span>
        <ChevronsUpDown
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="stroke-icon-muted shrink-0"
        />
      </DropdownTrigger>

      <div className="border-border-strong flex flex-col items-center justify-center rounded-lg border px-3 @md:py-10 @lg:py-15">
        <Database
          size={48}
          className="text-text-muted mb-3"
          strokeWidth={1.5}
        />
        <p className="mb-1 text-sm font-semibold">
          No {logType} available yet.
        </p>
        <p className="text-text-muted text-sm">
          Check back later for activity logs.
        </p>
      </div>
    </div>
  )
}

function SecurityAuditSection() {
  return (
    <div className="space-y-3 p-6 md:space-y-6">
      <header>
        <div className="flex flex-row justify-between gap-3">
          <h2 className="mb-1.5 text-xl font-semibold">Security Audit</h2>

          <Button size="md" radius="md" variant="subtle">
            <BoltLogo wordmark className="h-4" />
            Ask Bolt to fix
          </Button>
        </div>

        <p>
          Identifies vulnerabilities like missing RLS policies and insecure
          permissions.
        </p>

        <p>Use "Ask Bolt to fix" to apply recommended improvements.</p>

        <div className="mt-3 space-y-1.5 @md:mt-6 @lg:mt-9">
          <p className="text-sm font-semibold">
            Leaked Password Protection Disabled{' '}
            <span className="text-warning bg-warning-bg ml-1.5 rounded-full px-3 py-1 text-xs">
              Warning
            </span>
          </p>
          <p className="text-text-muted text-sm">
            Supabase Auth prevents the use of compromised passwords by checking
            against HaveIBeenPwned.org. <br />
            Enable this feature to enhance security.
          </p>
        </div>
      </header>
    </div>
  )
}

function AdvancedSection() {
  return <p className="p-3">Advanced (stub).</p>
}

type WorkbenchDatabaseProps = {
  list: TreeNode[]
  /**
   * Controls CSS visibility rather than mount/unmount. All panes stay mounted
   * to preserve scroll position, selected table/row state, and edit form
   * content across tab switches. Hidden panes use `display: none` via the
   * Tailwind `hidden` class.
   */
  isVisible: boolean
  activeDatabaseSection: WorkbenchDatabaseSection
}

export default function WorkbenchDatabase({
  list,
  isVisible,
  activeDatabaseSection,
}: WorkbenchDatabaseProps) {
  function sectionContent(): ReactNode {
    switch (activeDatabaseSection) {
      case 'database':
        return <DatabaseSection list={list} />
      case 'logs':
        return <LogsSection />
      case 'securityAudit':
        return <SecurityAuditSection />
      case 'advanced':
        return <AdvancedSection />
    }
  }

  return (
    <WorkbenchContainer className={isVisible ? '' : 'hidden'}>
      <WorkbenchContents>{sectionContent()}</WorkbenchContents>
    </WorkbenchContainer>
  )
}
