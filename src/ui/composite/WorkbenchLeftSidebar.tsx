import type { ReactNode } from "react";
import type { MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";
import WorkbenchFileTree from "../base/WorkbenchFileTree";
import WorkbenchFile from "./WorkbenchFile";
import Button from "../base/Button";
import { FolderTree, SearchCode } from "lucide-react";

/**
 * @function renderItems
 * @description Render the left sidebar items
 * @param {MockWorkbenchFileTreeNode[]} items - The items to render
 * @param {number} depth - The depth of the items
 * @returns {ReactNode} The rendered items
 */
function renderItems(items: MockWorkbenchFileTreeNode[], depth: number): ReactNode {
  return items.map((node) => (
    <WorkbenchFile
      key={node.name}
      name={node.name}
      type={node.type}
      open={node.open}
      selected={node.selected}
      depth={depth}
    >
      {node.children ? (
        <WorkbenchFileTree>
          {renderItems(node.children, depth + 1)}
        </WorkbenchFileTree>
      ) : undefined}
    </WorkbenchFile>
  ));
}

type WorkbenchLeftSidebarProps = {
  list: MockWorkbenchFileTreeNode[];
}

export default function WorkbenchLeftSidebar(props: WorkbenchLeftSidebarProps) {
  return (
    <aside className="col-span-4 @2xl:col-span-3 border-r border-gray-200 dark:border-zinc-700 overflow-scroll">
      <header className="px-1.5 py-1 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 rounded-tl-xl">
        <nav className="flex items-center gap-1.5">
          <Button size="md" radius="md">
            <FolderTree size={18} strokeWidth={1.5} />
            <span className="font-medium">Files</span>
          </Button>

          <Button size="md" radius="md">
            <SearchCode size={18} strokeWidth={1.5} />
            <span className="font-medium">Search</span>
          </Button>
        </nav>
      </header>

      <WorkbenchFileTree>{renderItems(props.list, 0)}</WorkbenchFileTree>
    </aside>
  )
}