import { ChevronRight, FileIcon } from "lucide-react";
import type { ReactNode } from "react";

type WorkbenchFileProps = {
  name: string;
  isDirectory?: boolean;
  children?: ReactNode;
  nested?: boolean;
  open?: boolean;
  selected?: boolean;
}

export default function WorkbenchFile(props: WorkbenchFileProps) {
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