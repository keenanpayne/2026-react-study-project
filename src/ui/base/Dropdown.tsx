import type { ReactNode } from "react";

type DropdownProps = {
  align?: 'left' | 'right';
  children: ReactNode;
  className?: string;
}

export default function Dropdown(props: DropdownProps) {
  const alignClass = props.align === 'left' ? 'left-0 top-10' : props.align === 'right' ? 'right-0 top-10' : '';
  const className = props.className ? props.className : '';

  return (
    <div className={`bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg absolute text-left shadow-xs z-30 ${alignClass} ${className}`}>
      {props.children}
    </div>
  )
}