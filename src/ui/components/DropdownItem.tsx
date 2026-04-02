import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react'
import DropdownItemBase from './DropdownItemBase'
import {
  getDropdownItemClassName,
  type DropdownItemSize,
} from '~/utils/dropdown.utils'

type DropdownItemProps = {
  title: ReactNode
  prepend?: string
  append?: string
  size: DropdownItemSize
  icon?: ReactNode
  className?: string
  onSelect?: () => void
  selected?: boolean
  disabled?: boolean
  role?: string
  trailing?: ReactNode
}

export default function DropdownItem({
  title,
  prepend,
  append,
  size,
  icon,
  className,
  onSelect,
  selected,
  disabled,
  role = 'menuitem',
  trailing,
}: DropdownItemProps) {
  const handleClick = () => {
    if (!disabled && onSelect) onSelect()
  }

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onSelect) {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- role is always interactive (menuitem/option)
    <li
      className={getDropdownItemClassName({
        size,
        selected,
        disabled,
        className,
      })}
      tabIndex={0}
      role={role}
      aria-selected={role === 'option' ? selected : undefined}
      aria-checked={role === 'option' ? undefined : selected}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <DropdownItemBase
        title={title}
        prepend={prepend}
        append={append}
        icon={icon}
        trailing={trailing}
      />
    </li>
  )
}
