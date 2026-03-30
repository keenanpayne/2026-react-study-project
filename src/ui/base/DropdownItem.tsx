import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type DropdownItemProps = {
  title: string;
  prepend?: string;
  append?: string;
  size: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
  dropdown?: ReactNode;
}

export default function DropdownItem(props: DropdownItemProps) {
  const size = 
    props.size === 'sm' ? 'text-xs p-1 m-1' : 
    props.size === 'md' ? 'text-sm px-1.5 py-1 mx-1.5 my-1' : 
    props.size === 'lg' ? 'text-base px-2 py-1.5 mx-2 my-1.5' : '';
  const dropdownClass = props.dropdown ? 'relative' : '';
  const className = props.className ? props.className : '';
  const classNames = `group/dropdown-item cursor-pointer flex flex-wrap items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${size} ${dropdownClass} ${className}`;
  const prependAppendClass = 'text-xs text-gray-500 dark:text-zinc-300 block w-full';

  return (
    <li className={classNames} tabIndex={0}>

      <p className="flex-1 flex items-center gap-2.5">
        {props.icon}

        <span>
          {props.prepend && <span className={prependAppendClass}>{props.prepend}</span>}
          {props.title}
          {props.append && <span className={prependAppendClass}>{props.append}</span>}
        </span>
      </p>


      {props.dropdown && (
        <>
          <ChevronRight size={16} strokeWidth={1.5} className="stroke-gray-700 dark:stroke-zinc-400 group-hover/dropdown-item:stroke-gray-900 dark:group-hover/dropdown-item:stroke-zinc-300 transition-colors" />

          <div className="opacity-0 group-hover/dropdown-item:opacity-100 transition-opacity">
            {props.dropdown}
          </div>
        </>
      )}
    </li>
  )
}