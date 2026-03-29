import type { ReactNode } from "react";

type DropdownItemProps = {
  title: string;
  size: "sm" | "md" | "lg";
  icon?: ReactNode;
  key?: number;
  className?: string;
}

export default function DropdownItem(props: DropdownItemProps) {
  const size = 
    props.size === 'sm' ? 'text-xs p-1 m-1' : 
    props.size === 'md' ? 'text-sm px-1.5 py-1 mx-1.5 my-1' : 
    props.size === 'lg' ? 'text-base px-2 py-1.5 mx-2 my-1.5' : '';

  return (
    <li key={props.key} className={`cursor-pointer flex items-center gap-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${size} ${props.className ? props.className : ''}`} tabIndex={0}>
      {props.icon && props.icon}
      {props.title}
    </li>
  )
}