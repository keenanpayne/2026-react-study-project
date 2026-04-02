import type { ReactNode } from 'react'
import { cx } from '~/utils/cx'

export const DROPDOWN_ICON_SIZE = 16
export const DROPDOWN_ICON_STROKE_WIDTH = 1

export type DropdownAlign = 'left' | 'right' | 'top' | 'bottom'

const ALIGN_CLASSES: Record<DropdownAlign, string> = {
  left: 'left-0 top-[calc(100%+4px)]',
  right: 'right-0 top-[calc(100%+4px)]',
  top: 'bottom-[calc(100%+4px)] right-0 md:left-0 md:right-auto',
  bottom: 'top-[calc(100%+4px)] left-0',
}

type DropdownProps = {
  align?: DropdownAlign
  nested?: boolean
  children: ReactNode
  className?: string
}

export default function Dropdown({
  align,
  nested,
  children,
  className,
}: DropdownProps) {
  return (
    <div
      className={cx(
        nested
          ? 'bg-surface md:border-border-default z-30 text-left md:absolute md:rounded-lg md:border md:shadow-xs'
          : 'border-border-default bg-surface absolute z-30 rounded-lg border text-left shadow-xs',
        align && ALIGN_CLASSES[align],
        nested && 'max-md:w-full md:top-0 md:left-full md:ml-2',
        className,
      )}
    >
      {children}
    </div>
  )
}
