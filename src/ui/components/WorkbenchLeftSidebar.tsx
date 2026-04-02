import { useState, useMemo, type ReactNode, type KeyboardEvent } from 'react'
import type { TreeNode } from '~/types/workbench'
import WorkbenchFileTree from './WorkbenchFileTree'
import WorkbenchFile from './WorkbenchFile'
import Button from './Button'
import CollapseToggle from './CollapseToggle'
import SearchInput from './SearchInput'
import { SearchCode, type LucideIcon } from 'lucide-react'
import Pagination from './Pagination'
import { useCollapsible } from '~/hooks/useCollapsible'
import { cx } from '~/utils/cx'

function computeInitialExpanded(
  nodes: TreeNode[],
  parentPath: string,
): Set<string> {
  const expanded = new Set<string>()

  for (const node of nodes) {
    const path = parentPath ? `${parentPath}/${node.name}` : node.name

    if (node.children?.length) {
      const childExpanded = computeInitialExpanded(node.children, path)

      const hasSelectedChild = node.children.some((c) => c.selected)
      const shouldExpand =
        node.open || hasSelectedChild || childExpanded.size > 0

      if (shouldExpand) {
        expanded.add(path)
        childExpanded.forEach((p) => expanded.add(p))
      }
    }
  }

  return expanded
}

function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
  const lowerQuery = query.toLowerCase()

  return nodes.reduce<TreeNode[]>((acc, node) => {
    const nameMatches = node.name.toLowerCase().includes(lowerQuery)

    if (node.children?.length) {
      if (nameMatches) {
        acc.push(node)
      } else {
        const filteredChildren = filterTree(node.children, query)

        if (filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren })
        }
      }
    } else if (nameMatches) {
      acc.push(node)
    }

    return acc
  }, [])
}

function collectAllPaths(nodes: TreeNode[], parentPath: string): Set<string> {
  const paths = new Set<string>()

  for (const node of nodes) {
    const path = parentPath ? `${parentPath}/${node.name}` : node.name

    if (node.children?.length) {
      paths.add(path)
      collectAllPaths(node.children, path).forEach((p) => paths.add(p))
    }
  }

  return paths
}

type PaginationConfig = {
  depths: number[]
  pageSize: number
}

type WorkbenchLeftSidebarProps = {
  list: TreeNode[]
  listLabel: string
  listIcon: LucideIcon
  selectedNode?: TreeNode | null
  selectedRow?: TreeNode | null
  onSelect?: (node: TreeNode) => void
  pagination?: PaginationConfig
  truncateNames?: boolean
}

export default function WorkbenchLeftSidebar({
  list,
  listLabel,
  listIcon: ListIcon,
  selectedNode,
  selectedRow,
  onSelect,
  pagination,
  truncateNames,
}: WorkbenchLeftSidebarProps) {
  const { isExpanded: panelExpanded, toggle: togglePanel } = useCollapsible()
  const [expanded, setExpanded] = useState<Set<string>>(() =>
    computeInitialExpanded(list, ''),
  )
  const [searchActive, setSearchActive] = useState(false)
  const [query, setQuery] = useState('')
  const [pageMap, setPageMap] = useState<Record<string, number>>({})

  function updateQuery(newQuery: string) {
    setQuery(newQuery)
    setPageMap({})
  }

  const filteredList = useMemo(
    () => (query ? filterTree(list, query) : list),
    [list, query],
  )

  const searchExpanded = useMemo(
    () => (query ? collectAllPaths(filteredList, '') : null),
    [filteredList, query],
  )

  function toggle(path: string) {
    if (searchExpanded) return

    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  function closeSearch() {
    setSearchActive(false)
    updateQuery('')
  }

  function handleSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      closeSearch()
    }
  }

  function handleSearchBlur() {
    if (!query) {
      closeSearch()
    }
  }

  function renderChildList(
    children: TreeNode[],
    depth: number,
    parentPath: string,
  ): ReactNode {
    const shouldPaginate =
      pagination?.depths.includes(depth) &&
      children.length > pagination.pageSize

    const page = pageMap[parentPath] ?? 0
    const pageSize = pagination?.pageSize ?? children.length
    const totalPages = shouldPaginate
      ? Math.ceil(children.length / pageSize)
      : 1
    const displayItems = shouldPaginate
      ? children.slice(page * pageSize, (page + 1) * pageSize)
      : children

    return (
      <>
        {shouldPaginate && (
          <Pagination
            page={page}
            totalPages={totalPages}
            depth={depth}
            label={parentPath || listLabel}
            onPageChange={(p) =>
              setPageMap((prev) => ({ ...prev, [parentPath]: p }))
            }
          />
        )}
        <WorkbenchFileTree>
          {renderItems(displayItems, depth, parentPath)}
        </WorkbenchFileTree>
      </>
    )
  }

  function renderItems(
    items: TreeNode[],
    depth: number,
    parentPath: string,
  ): ReactNode {
    return items.map((node) => {
      const path = parentPath ? `${parentPath}/${node.name}` : node.name
      const hasChildren = !!node.children?.length
      const isExpandable = hasChildren && node.expandable !== false
      const isExpanded = searchExpanded
        ? searchExpanded.has(path)
        : expanded.has(path)

      return (
        <WorkbenchFile
          key={path}
          name={node.name}
          type={node.type}
          open={isExpanded}
          selected={
            node.selected || node === selectedNode || node === selectedRow
          }
          depth={depth}
          hasChildren={isExpandable}
          truncate={truncateNames}
          onToggle={() => toggle(path)}
          onClick={() => onSelect?.(node)}
        >
          {isExpandable && isExpanded
            ? renderChildList(node.children!, depth + 1, path)
            : undefined}
        </WorkbenchFile>
      )
    })
  }

  return (
    <aside
      className={cx(
        'border-border-default relative min-w-0 border-r border-b transition-[flex-grow] duration-150 ease-out @md:border-b-0',
        panelExpanded
          ? 'overflow-auto @md:flex-5 @lg:flex-4 @2xl:flex-3'
          : 'h-10 flex-none overflow-hidden @md:h-auto @md:min-w-10 @md:flex-0',
      )}
    >
      <header
        className={`section-header sticky top-0 left-0 z-10 h-10 rounded-tl-xl px-1 py-1`}
      >
        <nav
          aria-label="File browser"
          className="flex items-center justify-between gap-1.5"
        >
          {panelExpanded && (
            <div className="flex items-center gap-1.5">
              <Button size="md" radius="lg" variant="selected">
                <ListIcon size={18} strokeWidth={1.5} aria-hidden="true" />
                <span className="font-medium">{listLabel}</span>
              </Button>

              {searchActive ? (
                <SearchInput
                  value={query}
                  onChange={updateQuery}
                  placeholder="Search"
                  focusOnMount
                  onKeyDown={handleSearchKeyDown}
                  onBlur={handleSearchBlur}
                  className="h-8 min-w-0 flex-1 px-2 text-sm font-medium placeholder:font-medium"
                  icon={
                    <SearchCode
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  }
                />
              ) : (
                <Button
                  size="md"
                  radius="lg"
                  onClick={() => setSearchActive(true)}
                >
                  <SearchCode size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-medium">Search</span>
                </Button>
              )}
            </div>
          )}

          <CollapseToggle
            isExpanded={panelExpanded}
            onToggle={togglePanel}
            direction="horizontal"
            controls="sidebar-panel"
            label="file browser"
          />
        </nav>
      </header>

      <div
        id="sidebar-panel"
        className={cx(
          'overflow-hidden transition-opacity duration-150 ease-out',
          panelExpanded ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {query && filteredList.length === 0 ? (
          <p role="status" className="text-text-muted px-3 py-2 text-sm">
            No items match
          </p>
        ) : (
          renderChildList(filteredList, 0, '')
        )}
      </div>
    </aside>
  )
}
