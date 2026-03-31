import { ChevronRight, File as FileIcon, FolderTree, Rocket, SearchCode, SquareTerminal, Zap } from "lucide-react";
import Button from "../base/Button";
import type { ReactNode } from "react";
import { File, type FileContents } from '@pierre/diffs/react';
import type { MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";

/**
 * @function renderFileList
 * @description Render the file list
 * @param {MockWorkbenchFileTreeNode[]} items - The items to render
 * @param {number} depth - The depth of the items
 * @returns {ReactNode} The rendered items
 */
function renderFileList(items: MockWorkbenchFileTreeNode[], depth: number): ReactNode {
  return items.map((node) => (
    <FileItem
      key={node.name}
      name={node.name}
      isDirectory={node.isDirectory}
      open={node.open}
      selected={node.selected}
      nested={depth > 0}
    >
      {node.children ? (
        <FileItemList>{renderFileList(node.children, depth + 1)}</FileItemList>
      ) : undefined}
    </FileItem>
  ));
}

type FileItemProps = {
  name: string;
  isDirectory?: boolean;
  children?: ReactNode;
  nested?: boolean;
  open?: boolean;
  selected?: boolean;
}

function FileItem(props: FileItemProps) {
  return (
    <li>
      <p className={`flex items-center gap-1.5 cursor-pointer py-1 text-sm transition-colors ${props.nested ? 'px-4' : 'px-1.5'} ${props.selected ? 'bg-sky-100 dark:bg-sky-800/50' : 'text-gray-500 dark:text-zinc-300 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}>
        {props.isDirectory ? <ChevronRight size={14} strokeWidth={1} className={`shrink-0 ${props.open ? 'rotate-90' : ''}`} /> : <FileIcon size={12} strokeWidth={1.5} className="shrink-0" />}
        {props.name}
      </p>

      {props.children && props.children}
    </li>
  )
}

type FileItemListProps = {
  children: ReactNode;
}

function FileItemList(props: FileItemListProps) {
  return (
    <ul className="text-left h-full">
      {props.children}
    </ul>
  )
}

type WorkbenchCodebaseProps = {
  file: FileContents;
  fileList: MockWorkbenchFileTreeNode[];
  terminal: FileContents;
  isVisible: boolean;
}

export default function WorkbenchCodebase(props: WorkbenchCodebaseProps) {
  if (!props.isVisible) return null;

  return (
    <main className="flex-1 relative mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full">
      <div className="@container grid grid-cols-12 h-full">
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

          <FileItemList>{renderFileList(props.fileList, 0)}</FileItemList>
        </aside>

        <article className="col-span-8 @2xl:col-span-9 overflow-scroll rounded-tr-xl">
          <File
            file={props.file}
            options={{
              theme: { dark: 'pierre-dark', light: 'pierre-light' },
            }}
          />
        </article>

        <section className="col-span-12 border-t border-gray-200 dark:border-zinc-700">
          <header className="p-1.5 border-b border-gray-200 dark:border-zinc-700">
            <nav className="flex items-center gap-2">
              <Button size="md" radius="pill" variant="subtle">
                <Zap size={18} strokeWidth={1.5} />
                Bolt
              </Button>

              <Button size="md" radius="pill" variant="ghost">
                <Rocket size={18} strokeWidth={1.5} />
                Publish Output
              </Button>

              <Button size="md" radius="pill" variant="ghost">
                <SquareTerminal size={18} strokeWidth={1.5} />
                Terminal
              </Button>
            </nav>
          </header>

          <File
            file={props.terminal}
            options={{
              theme: { dark: 'pierre-dark', light: 'pierre-light' },
              disableLineNumbers: true,
              disableFileHeader: true,
            }}
            className="max-h-[200px] overflow-scroll rounded-b-xl px-1.5 py-0.5 text-xs leading-tight"
          />
        </section>
      </div>
    </main>
  )
}