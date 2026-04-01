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

  const baseClass = props.nested
    ? 'bg-surface-raised z-30 text-left md:border-border-default md:absolute md:rounded-lg md:border md:shadow-xs'
    : 'border-border-default bg-surface-raised absolute z-30 rounded-lg border text-left shadow-xs'

  const nestedClass = props.nested
    ? 'max-md:w-full md:left-[105%] md:-top-1'
    : ''

  const className = props.className ? props.className : ''

  return (
    <div
      className={`${baseClass} ${alignClass} ${nestedClass} ${className}`}
      tabIndex={0}
    >
      {props.children}
    </div>
  )
}
