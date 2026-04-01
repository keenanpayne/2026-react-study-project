import { useState, useMemo, type ReactNode, type KeyboardEvent } from 'react'
import type { MockWorkbenchFileTreeNode } from '~/data/MockWorkbenchCodebase'
import WorkbenchFileTree from './WorkbenchFileTree'
import WorkbenchFile from './WorkbenchFile'
import Button from './Button'
import SearchInput from './SearchInput'
import { SearchCode, type LucideIcon } from 'lucide-react'

function computeInitialExpanded(
  nodes: MockWorkbenchFileTreeNode[],
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

function filterTree(
  nodes: MockWorkbenchFileTreeNode[],
  query: string,
): MockWorkbenchFileTreeNode[] {
  const lowerQuery = query.toLowerCase()

  return nodes.reduce<MockWorkbenchFileTreeNode[]>((acc, node) => {
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

function collectAllPaths(
  nodes: MockWorkbenchFileTreeNode[],
  parentPath: string,
): Set<string> {
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

type WorkbenchLeftSidebarProps = {
  list: MockWorkbenchFileTreeNode[]
  listLabel: string
  listIcon: LucideIcon
  selectedNode?: MockWorkbenchFileTreeNode | null
  selectedRow?: MockWorkbenchFileTreeNode | null
  onSelect?: (node: MockWorkbenchFileTreeNode) => void
}

export default function WorkbenchLeftSidebar(props: WorkbenchLeftSidebarProps) {
  const [prevList, setPrevList] = useState(props.list)
  const [expanded, setExpanded] = useState<Set<string>>(() =>
    computeInitialExpanded(props.list, ''),
  )
  const [searchActive, setSearchActive] = useState(false)
  const [query, setQuery] = useState('')

  if (prevList !== props.list) {
    setPrevList(props.list)
    setExpanded(computeInitialExpanded(props.list, ''))
  }

  const filteredList = useMemo(
    () => (query ? filterTree(props.list, query) : props.list),
    [props.list, query],
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
    setQuery('')
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

  function renderItems(
    items: MockWorkbenchFileTreeNode[],
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
            node.selected ||
            node === props.selectedNode ||
            node === props.selectedRow
          }
          depth={depth}
          hasChildren={isExpandable}
          onToggle={() => toggle(path)}
          onClick={() => props.onSelect?.(node)}
        >
          {isExpandable && isExpanded ? (
            <WorkbenchFileTree>
              {renderItems(node.children!, depth + 1, path)}
            </WorkbenchFileTree>
          ) : undefined}
        </WorkbenchFile>
      )
    })
  }

  return (
    <aside className="border-border-default relative col-span-12 overflow-scroll border-r border-b @md:col-span-5 @md:border-b-0 @lg:col-span-4 @2xl:col-span-3">
      <header className="section-header sticky top-0 left-0 z-10 rounded-tl-xl px-1 py-1">
        <nav className="flex items-center gap-1.5">
          <Button size="md" radius="lg" variant="selected">
            <props.listIcon size={18} strokeWidth={1.5} />
            <span className="font-medium">{props.listLabel}</span>
          </Button>

          {searchActive ? (
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search files..."
              autoFocus
              onKeyDown={handleSearchKeyDown}
              onBlur={handleSearchBlur}
              className="h-8 min-w-0 flex-1 px-2 text-sm font-medium"
              icon={<SearchCode size={22} strokeWidth={1.5} />}
            />
          ) : (
            <Button size="md" radius="lg" onClick={() => setSearchActive(true)}>
              <SearchCode size={18} strokeWidth={1.5} />
              <span className="font-medium">Search</span>
            </Button>
          )}
        </nav>
      </header>

      {query && filteredList.length === 0 ? (
        <p className="text-text-muted px-3 py-2 text-sm">No files match</p>
      ) : (
        <WorkbenchFileTree>
          {renderItems(filteredList, 0, '')}
        </WorkbenchFileTree>
      )}
    </aside>
  )
}
