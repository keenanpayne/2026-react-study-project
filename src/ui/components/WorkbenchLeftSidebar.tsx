import { useState, type ReactNode } from "react";
import type { MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";
import WorkbenchFileTree from "./WorkbenchFileTree";
import WorkbenchFile from "./WorkbenchFile";
import Button from "./Button";
import { SearchCode, type LucideIcon } from "lucide-react";

export function computeInitialExpanded(
  nodes: MockWorkbenchFileTreeNode[],
  parentPath: string
): Set<string> {
  const expanded = new Set<string>();

  for (const node of nodes) {
    const path = parentPath ? `${parentPath}/${node.name}` : node.name;

    if (node.children?.length) {
      const childExpanded = computeInitialExpanded(node.children, path);

      const hasSelectedChild = node.children.some((c) => c.selected);
      const shouldExpand = node.open || hasSelectedChild || childExpanded.size > 0;

      if (shouldExpand) {
        expanded.add(path);
        childExpanded.forEach((p) => expanded.add(p));
      }
    }
  }

  return expanded;
}

type WorkbenchLeftSidebarProps = {
  list: MockWorkbenchFileTreeNode[];
  listLabel: string;
  listIcon: LucideIcon;
  selectedNode?: MockWorkbenchFileTreeNode | null;
  selectedRow?: MockWorkbenchFileTreeNode | null;
  onSelect?: (node: MockWorkbenchFileTreeNode) => void;
}

export default function WorkbenchLeftSidebar(props: WorkbenchLeftSidebarProps) {
  const [prevList, setPrevList] = useState(props.list);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => computeInitialExpanded(props.list, "")
  );

  if (prevList !== props.list) {
    setPrevList(props.list);
    setExpanded(computeInitialExpanded(props.list, ""));
  }

  function toggle(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }

  function renderItems(
    items: MockWorkbenchFileTreeNode[],
    depth: number,
    parentPath: string
  ): ReactNode {
    return items.map((node) => {
      const path = parentPath ? `${parentPath}/${node.name}` : node.name;
      const hasChildren = !!node.children?.length;
      const isExpandable = hasChildren && node.expandable !== false;
      const isExpanded = expanded.has(path);

      return (
        <WorkbenchFile
          key={path}
          name={node.name}
          type={node.type}
          open={isExpanded}
          selected={node.selected || node === props.selectedNode || node === props.selectedRow}
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
      );
    });
  }

  return (
    <aside className="relative col-span-12 @md:col-span-5 @lg:col-span-4 @2xl:col-span-3 border-r border-b @md:border-b-0 border-gray-200 dark:border-zinc-700 overflow-scroll">
      <header className="sticky top-0 left-0 px-1 py-1 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 rounded-tl-xl z-10">
        <nav className="flex items-center gap-1.5">
          <Button size="md" radius="lg" variant="selected">
            <props.listIcon size={18} strokeWidth={1.5} />
            <span className="font-medium">{props.listLabel}</span>
          </Button>

          <Button size="md" radius="lg">
            <SearchCode size={18} strokeWidth={1.5} />
            <span className="font-medium">Search</span>
          </Button>
        </nav>
      </header>

      <WorkbenchFileTree>{renderItems(props.list, 0, "")}</WorkbenchFileTree>
    </aside>
  )
}