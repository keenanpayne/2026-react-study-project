import { cx } from '~/utils/cx'

export type DropdownItemSize = 'sm' | 'md' | 'lg'

export const SIZE_CLASSES: Record<DropdownItemSize, string> = {
  sm: 'text-xs p-1 m-1',
  md: 'text-sm px-1.5 py-1 mx-1.5 my-1',
  lg: 'text-base p-2 mx-2 my-1.5',
}

export function getDropdownItemClassName({
  size,
  selected,
  disabled,
  className,
  hasSubmenu,
}: {
  size: DropdownItemSize
  selected?: boolean
  disabled?: boolean
  className?: string
  hasSubmenu?: boolean
}) {
  return cx(
    'group/dropdown-item cursor-pointer flex flex-wrap items-center justify-between rounded-md hover:bg-hover-item transition-colors',
    SIZE_CLASSES[size],
    hasSubmenu && 'relative',
    selected && 'bg-selected hover:bg-selected-hover',
    disabled && 'opacity-55',
    className,
  )
}
