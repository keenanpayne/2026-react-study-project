import type { ReactNode } from 'react'

export const DROPDOWN_ICON_SIZE = 16
export const DROPDOWN_ICON_STROKE_WIDTH = 1

type DropdownProps = {
  align?: 'left' | 'right'
  nested?: boolean
  children: ReactNode
  className?: string
}

export default function Dropdown(props: DropdownProps) {
  const alignClass =
    props.align === 'left'
      ? 'left-0 top-10'
      : props.align === 'right'
        ? 'right-0 top-10'
        : ''
  const nestedClass = props.nested ? 'left-[105%] -top-1' : ''
  const className = props.className ? props.className : ''

  return (
    <div
      className={`absolute z-30 rounded-lg border border-gray-200 bg-white text-left shadow-xs dark:border-zinc-700 dark:bg-zinc-800 ${alignClass} ${nestedClass} ${className}`}
      tabIndex={0}
    >
      {props.children}
    </div>
  )
}
