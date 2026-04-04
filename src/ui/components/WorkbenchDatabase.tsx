import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import {
  ChevronsUpDown,
  Database,
  ListFilter,
  Plus,
  RefreshCw,
  ShieldCheck,
  Terminal,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
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

const POLICIES_DATA = [
  {
    policyname: 'Users can create posts',
    roles: '{authenticated}',
    cmd: 'INSERT',
  },
  {
    policyname: 'Users can delete own posts',
    roles: '{authenticated}',
    cmd: 'DELETE',
  },
  {
    policyname: 'Users can update own posts',
    roles: '{authenticated}',
    cmd: 'UPDATE',
  },
  {
    policyname: 'Users can view own posts',
    roles: '{authenticated}',
    cmd: 'SELECT',
  },
] as const

const TABLE_MENU_CONFIG = [
  { label: 'View Policies' as const, icon: ShieldCheck },
  { label: 'Add a Row' as const, icon: Plus },
  { label: 'Refresh' as const, icon: RefreshCw },
  { label: 'Query' as const, icon: Terminal },
  { label: 'Filter' as const, icon: ListFilter },
] as const satisfies readonly { label: string; icon: LucideIcon }[]

type TableMenuItem = (typeof TABLE_MENU_CONFIG)[number]['label']

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

const MOCK_FILTER_COLUMNS = ['id', 'created_at', 'email'] as const

function TableFilterMenu() {
  const closeCtx = useDropdownTriggerClose()
  const searchId = useId()
  const [columnVisible, setColumnVisible] = useState<
    Record<(typeof MOCK_FILTER_COLUMNS)[number], boolean>
  >({
    id: true,
    created_at: false,
    email: true,
  })
  const [search, setSearch] = useState('')

  function handleClear() {
    setSearch('')
    setColumnVisible({ id: true, created_at: false, email: true })
  }

  return (
    <Dropdown align="left" className="w-60 p-3">
      <p className="text-text-secondary mb-3 text-sm font-medium">
        Filter rows
      </p>

      <div className="mb-3 flex flex-col gap-2">
        <p className="text-text-muted text-xs font-medium">Columns</p>
        {MOCK_FILTER_COLUMNS.map((name) => (
          <label
            key={name}
            className="text-text-secondary flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={columnVisible[name]}
              onChange={() =>
                setColumnVisible((prev) => ({
                  ...prev,
                  [name]: !prev[name],
                }))
              }
              className="border-border-strong rounded border"
            />
            {name}
          </label>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label
          className="text-text-muted text-xs font-medium"
          htmlFor={searchId}
        >
          Search
        </label>
        <input
          id={searchId}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="input-base"
          autoComplete="off"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          size="sm"
          radius="md"
          variant="ghost"
          onClick={() => {
            handleClear()
            closeCtx?.close()
          }}
        >
          Clear
        </Button>
        <Button
          type="button"
          size="sm"
          radius="md"
          variant="primary"
          onClick={() => closeCtx?.close()}
        >
          Apply
        </Button>
      </div>
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
  const [activeTableMenu, setActiveTableMenu] = useState<TableMenuItem | null>(
    null,
  )
  const [addRowValues, setAddRowValues] = useState<Record<string, string>>({})

  function handleSelectNode(node: TreeNode | null, path?: string) {
    if (node?.type === 'row' && path) {
      const parentTable = list.find((table) =>
        table.children?.some((r) => r === node),
      )
      if (parentTable) {
        const parentPath = path.substring(0, path.lastIndexOf('/'))
        if (parentTable !== selectedNode) setActiveTableMenu(null)
        setSelectedNode(parentTable)
        setSelectedNodePath(parentPath || parentTable.name)
        handleSelectRow(node, path)
        return
      }
    }

    if (node !== selectedNode) setActiveTableMenu(null)
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
        <>
          {selectedNode && (
            <nav
              aria-label="Table actions"
              className="divider-bottom flex items-center gap-1 px-2 py-1"
            >
              {TABLE_MENU_CONFIG.map(({ label, icon: Icon }) => {
                if (label === 'Filter') {
                  if (activeTableMenu) return null
                  return (
                    <DropdownTrigger
                      key={label}
                      size="md"
                      radius="md"
                      wrapperClassName="shrink-0"
                      dropdown={<TableFilterMenu />}
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="stroke-icon-muted shrink-0"
                      />
                      {label}
                    </DropdownTrigger>
                  )
                }

                return (
                  <Button
                    key={label}
                    size="md"
                    radius="md"
                    variant={activeTableMenu === label ? 'selected' : 'ghost'}
                    aria-pressed={activeTableMenu === label}
                    onClick={() => {
                      if (label === 'Refresh') return
                      setActiveTableMenu((prev) =>
                        prev === label ? null : label,
                      )
                      if (label === 'Add a Row') {
                        const columns =
                          selectedNode?.children?.[0]?.children ?? []
                        const empty: Record<string, string> = {}
                        for (const col of columns) empty[col.name] = ''
                        setAddRowValues(empty)
                      }
                    }}
                  >
                    <Icon
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="stroke-icon-muted shrink-0"
                    />
                    {label}
                  </Button>
                )
              })}
            </nav>
          )}

          <div className="flex flex-col">
            {activeTableMenu ? (
              <div className="p-3">
                {activeTableMenu === 'View Policies' ? (
                  <div className="panel-card overflow-x-auto rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="section-header">
                          <th
                            scope="col"
                            className="text-text-secondary px-4 py-2 text-left font-medium whitespace-nowrap"
                          >
                            policyname
                          </th>
                          <th
                            scope="col"
                            className="text-text-secondary px-4 py-2 text-left font-medium whitespace-nowrap"
                          >
                            roles
                          </th>
                          <th
                            scope="col"
                            className="text-text-secondary px-4 py-2 text-left font-medium whitespace-nowrap"
                          >
                            cmd
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {POLICIES_DATA.map((policy) => (
                          <tr
                            key={policy.policyname}
                            className="divider-bottom last:border-b-0"
                          >
                            <td className="text-text-secondary px-4 py-2 whitespace-nowrap">
                              {policy.policyname}
                            </td>
                            <td className="text-text-secondary px-4 py-2 whitespace-nowrap">
                              {policy.roles}
                            </td>
                            <td className="text-text-secondary px-4 py-2 whitespace-nowrap">
                              {policy.cmd}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : activeTableMenu === 'Add a Row' &&
                  selectedNode?.children?.[0]?.children ? (
                  <DatabaseRowEditForm
                    title="Add Row"
                    selectedRow={{
                      name: 'new',
                      type: 'row',
                      children: selectedNode.children[0].children.map(
                        (col) => ({
                          name: col.name,
                          type: col.type,
                          value: col.value,
                        }),
                      ),
                    }}
                    editedValues={addRowValues}
                    onValueChange={(name, value) =>
                      setAddRowValues((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }
                    onClose={() => setActiveTableMenu(null)}
                    onSave={() => setActiveTableMenu(null)}
                  />
                ) : (
                  <p className="text-text-muted text-sm">
                    {activeTableMenu} content goes here.
                  </p>
                )}
              </div>
            ) : (
              <>
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
                        setEditedValues((prev) => ({
                          ...prev,
                          [name]: value,
                        }))
                      }
                      onClose={() => handleSelectRow(null)}
                      onSave={() => handleSelectRow(null)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
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

      <div className="border-border-strong flex flex-col items-center justify-center rounded-lg border p-3 @md:py-10 @lg:py-15">
        <Database
          size={36}
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

        <div className="mt-3 space-y-1 @md:mt-6 @lg:mt-9">
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
  return (
    <div className="space-y-3 p-6 md:space-y-6">
      <header>
        <h2 className="mb-1.5 text-xl font-semibold">Advanced Settings</h2>

        <p>Manage database connections and ownership.</p>

        <p>
          Connect an existing Supabase project or claim a Bolt-managed database.
        </p>

        <div className="mt-3 flex flex-col justify-between @md:mt-6 @md:flex-row @md:items-center @lg:mt-9">
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              Connect to an existing database
            </p>

            <p className="text-text-muted text-sm">
              Connect to a different Supabase project to manage your data.
            </p>

            <p className="text-warning flex flex-col gap-1.5 text-sm @md:flex-row @md:items-center">
              <TriangleAlert
                size={16}
                strokeWidth={1.5}
                className="shrink-0"
                aria-hidden="true"
              />
              To connect a project, you must first link your Supabase account in{' '}
              <span className="font-medium underline">
                Personal Settings → Applications
              </span>
            </p>
          </div>

          <div>
            <Button size="md" radius="md" variant="primary">
              Connect
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-row items-center justify-between @md:mt-6 @lg:mt-9">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Claim in Supabase</p>

            <p className="text-text-muted text-sm">
              Move this database into your own Supabase account.
            </p>
          </div>

          <Button size="md" radius="md" variant="subtle">
            Claim
          </Button>
        </div>
      </header>
    </div>
  )
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
