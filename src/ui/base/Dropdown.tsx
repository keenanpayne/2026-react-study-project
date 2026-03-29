import type { ReactNode } from "react";

type DropdownProps = {
  align: 'left' | 'right';
  children: ReactNode;
  className?: string;
}

export default function Dropdown(props: DropdownProps) {
  const alignClass = props.align === 'left' ? 'left-0' : 'right-0';
  const className = props.className ? props.className : '';

  return (
    <div className={`bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg absolute top-10 text-left shadow-xs ${alignClass} ${className}`}>
      {props.children}
    </div>
  )
}