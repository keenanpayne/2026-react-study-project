import { ChevronRight, Columns3, FileIcon, Rows3, TableProperties } from "lucide-react";
import type { ReactNode } from "react";
import type { MockWorkbenchFileTreeItemType } from "../../data/MockWorkbenchCodebase";

type WorkbenchFileProps = {
  name: string;
  type?: MockWorkbenchFileTreeItemType;
  children?: ReactNode;
  depth?: number;
  open?: boolean;
  selected?: boolean;
}

export default function WorkbenchFile(props: WorkbenchFileProps) {
  const depth = props.depth ?? 0;

  return (
    <li>
      <p className={`flex items-center gap-1.5 cursor-pointer py-1 pr-1.5 text-sm transition-colors ${props.selected ? 'bg-sky-100 dark:bg-sky-800/50' : 'text-gray-500 dark:text-zinc-300 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'}`} style={{ paddingLeft: `${0.375 + depth * 0.625}rem` }}>
        {
          props.type === "directory" ? 
            <ChevronRight size={14} strokeWidth={1} className={`shrink-0 ${props.open ? 'rotate-90' : ''}`} /> : 
          props.type === "file" ? 
            <FileIcon size={12} strokeWidth={1.5} className="shrink-0" /> :
          props.type === "table" ?
            <TableProperties size={12} strokeWidth={1.5} className="shrink-0" /> :
          props.type === "row" ?
            <Rows3 size={12} strokeWidth={1.5} className="shrink-0" /> :
          props.type === "column" ?
            <Columns3 size={12} strokeWidth={1.5} className="shrink-0" /> :
            undefined
        }

        {props.name}
      </p>

      {props.children && props.children}
    </li>
  )
}