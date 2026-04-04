import { useId, useReducer, useState } from 'react'
import {
  ChevronsUpDown,
  Database,
  ListFilter,
  Plus,
  RefreshCw,
  Rows3,
  ShieldCheck,
  TableProperties,
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
import { useCollapsiblePair } from '~/hooks/useCollapsible'
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
  { label: 'Table' as const, icon: TableProperties },
  { label: 'Row' as const, icon: Rows3 },
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

const INITIAL_COLUMN_VISIBILITY: Record<
  (typeof MOCK_FILTER_COLUMNS)[number],
  boolean
> = {
  id: true,
  created_at: false,
  email: true,
}

function TableFilterMenu() {
  const closeCtx = useDropdownTriggerClose()
  const searchId = useId()
  const [columnVisible, setColumnVisible] = useState<
    Record<(typeof MOCK_FILTER_COLUMNS)[number], boolean>
  >(INITIAL_COLUMN_VISIBILITY)
  const [search, setSearch] = useState('')

  function handleClear() {
    setSearch('')
    setColumnVisible(INITIAL_COLUMN_VISIBILITY)
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

type DatabaseSectionState = {
  selectedNode: TreeNode | null
  selectedNodePath: string | null
  selectedRow: TreeNode | null
  selectedRowPath: string | null
  editedValues: Record<string, string>
  activeTableMenu: TableMenuItem | null
  addRowValues: Record<string, string>
}

type DatabaseSectionAction =
  | {
      type: 'SELECT_TABLE'
      node: TreeNode | null
      path: string | null
      resetMenu: boolean
    }
  | { type: 'SELECT_ROW'; row: TreeNode; path?: string }
  | { type: 'CLEAR_ROW' }
  | { type: 'SET_TABLE_MENU'; menu: TableMenuItem | null }
  | { type: 'INIT_ADD_ROW'; columns: TreeNode[] }
  | { type: 'UPDATE_EDIT_VALUE'; name: string; value: string }
  | { type: 'UPDATE_ADD_ROW_VALUE'; name: string; value: string }

const INITIAL_DB_SECTION_STATE: DatabaseSectionState = {
  selectedNode: null,
  selectedNodePath: null,
  selectedRow: null,
  selectedRowPath: null,
  editedValues: {},
  activeTableMenu: null,
  addRowValues: {},
}

function databaseSectionReducer(
  state: DatabaseSectionState,
  action: DatabaseSectionAction,
): DatabaseSectionState {
  switch (action.type) {
    case 'SELECT_TABLE':
      return {
        ...state,
        selectedNode: action.node,
        selectedNodePath: action.path,
        selectedRow: null,
        selectedRowPath: null,
        editedValues: {},
        activeTableMenu: action.resetMenu ? 'Table' : state.activeTableMenu,
      }

    case 'SELECT_ROW': {
      const rowPath =
        action.path ??
        (state.selectedNodePath
          ? joinTreePath(state.selectedNodePath, action.row.name)
          : action.row.name)
      return {
        ...state,
        selectedRow: action.row,
        selectedRowPath: rowPath,
        editedValues: buildEditedValues(action.row),
        activeTableMenu: 'Row',
      }
    }

    case 'CLEAR_ROW':
      return {
        ...state,
        selectedRow: null,
        selectedRowPath: null,
        editedValues: {},
        activeTableMenu: 'Table',
      }

    case 'SET_TABLE_MENU':
      return { ...state, activeTableMenu: action.menu }

    case 'INIT_ADD_ROW': {
      const empty: Record<string, string> = {}
      for (const col of action.columns) empty[col.name] = ''
      return { ...state, addRowValues: empty }
    }

    case 'UPDATE_EDIT_VALUE':
      return {
        ...state,
        editedValues: { ...state.editedValues, [action.name]: action.value },
      }

    case 'UPDATE_ADD_ROW_VALUE':
      return {
        ...state,
        addRowValues: { ...state.addRowValues, [action.name]: action.value },
      }
  }
}

function findParentTable(
  list: TreeNode[],
  node: TreeNode,
): TreeNode | undefined {
  return list.find((table) =>
    table.children?.some((r) =>
      r.id != null && node.id != null ? r.id === node.id : r === node,
    ),
  )
}

function DatabaseSection({ list }: { list: TreeNode[] }) {
  const { sidebarExpanded, toggleSidebar, contentExpanded, toggleContent } =
    useCollapsiblePair()

  const [state, dispatch] = useReducer(
    databaseSectionReducer,
    INITIAL_DB_SECTION_STATE,
  )

  const {
    selectedNode,
    selectedNodePath,
    selectedRow,
    selectedRowPath,
    editedValues,
    activeTableMenu,
    addRowValues,
  } = state

  function handleSelectNode(node: TreeNode | null, path?: string) {
    if (node?.type === 'row' && path) {
      const parentTable = findParentTable(list, node)
      if (parentTable) {
        const parentPath = path.substring(0, path.lastIndexOf('/'))
        dispatch({
          type: 'SELECT_TABLE',
          node: parentTable,
          path: parentPath || parentTable.name,
          resetMenu: parentTable !== selectedNode,
        })
        dispatch({ type: 'SELECT_ROW', row: node, path })
        return
      }
    }

    dispatch({
      type: 'SELECT_TABLE',
      node,
      path: path ?? null,
      resetMenu: node !== selectedNode,
    })
  }

  function handleSelectRow(row: TreeNode | null, rowPath?: string) {
    if (!row) {
      dispatch({ type: 'CLEAR_ROW' })
      return
    }
    dispatch({ type: 'SELECT_ROW', row, path: rowPath })
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
        {selectedNode && (
          <nav
            aria-label="Table actions"
            className="divider-bottom flex items-center gap-1 px-2 py-1"
          >
            {TABLE_MENU_CONFIG.map(({ label, icon: Icon }) => {
              if (label === 'Row' && !selectedRow) return null

              if (label === 'Filter') {
                if (
                  activeTableMenu &&
                  activeTableMenu !== 'Table' &&
                  activeTableMenu !== 'Row'
                )
                  return null
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
                    const nextMenu = activeTableMenu === label ? null : label
                    dispatch({ type: 'SET_TABLE_MENU', menu: nextMenu })
                    if (label === 'Add a Row' && nextMenu !== null) {
                      dispatch({
                        type: 'INIT_ADD_ROW',
                        columns: selectedNode?.children?.[0]?.children ?? [],
                      })
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
          {activeTableMenu === 'Table' ? (
            <div className="p-3">
              {selectedNode?.children ? (
                <DatabaseTable
                  node={selectedNode}
                  selectedRow={selectedRow}
                  onSelectRow={handleSelectRow}
                />
              ) : null}
            </div>
          ) : activeTableMenu === 'Row' ? (
            selectedRow?.children ? (
              <div className="p-3">
                <DatabaseRowEditForm
                  selectedRow={selectedRow}
                  editedValues={editedValues}
                  onValueChange={(name, value) =>
                    dispatch({ type: 'UPDATE_EDIT_VALUE', name, value })
                  }
                  onClose={() => dispatch({ type: 'CLEAR_ROW' })}
                  onSave={() => dispatch({ type: 'CLEAR_ROW' })}
                />
              </div>
            ) : null
          ) : activeTableMenu === 'View Policies' ? (
            <div className="p-3">
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
            </div>
          ) : activeTableMenu === 'Add a Row' ? (
            <div className="p-3">
              {selectedNode?.children?.[0]?.children ? (
                <DatabaseRowEditForm
                  title="Add Row"
                  selectedRow={{
                    name: 'new',
                    type: 'row',
                    children: selectedNode.children[0].children.map((col) => ({
                      name: col.name,
                      type: col.type,
                      value: col.value,
                    })),
                  }}
                  editedValues={addRowValues}
                  onValueChange={(name, value) =>
                    dispatch({
                      type: 'UPDATE_ADD_ROW_VALUE',
                      name,
                      value,
                    })
                  }
                  onClose={() =>
                    dispatch({ type: 'SET_TABLE_MENU', menu: null })
                  }
                  onSave={() =>
                    dispatch({ type: 'SET_TABLE_MENU', menu: null })
                  }
                />
              ) : (
                <p className="text-text-muted text-sm">
                  Unable to add a row. This table has no existing rows to infer
                  column structure from.
                </p>
              )}
            </div>
          ) : activeTableMenu ? (
            <div className="p-3">
              <p className="text-text-muted text-sm">
                {activeTableMenu} content goes here.
              </p>
            </div>
          ) : null}
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
  return (
    <WorkbenchContainer className={isVisible ? '' : 'hidden'}>
      <WorkbenchContents>
        <div
          className={`flex min-h-0 flex-1 flex-col ${activeDatabaseSection === 'database' ? '' : 'hidden'}`}
        >
          <DatabaseSection list={list} />
        </div>
        <div
          className={`flex min-h-0 flex-1 flex-col ${activeDatabaseSection === 'logs' ? '' : 'hidden'}`}
        >
          <LogsSection />
        </div>
        <div
          className={`flex min-h-0 flex-1 flex-col ${activeDatabaseSection === 'securityAudit' ? '' : 'hidden'}`}
        >
          <SecurityAuditSection />
        </div>
        <div
          className={`flex min-h-0 flex-1 flex-col ${activeDatabaseSection === 'advanced' ? '' : 'hidden'}`}
        >
          <AdvancedSection />
        </div>
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}
