import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react'
import DropdownItemBase from './DropdownItemBase'
import {
  getDropdownItemClassName,
  type DropdownItemSize,
} from '~/utils/dropdown.utils'

type DropdownItemRole =
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'option'

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
  role?: DropdownItemRole
  trailing?: ReactNode
  tabIndex?: number
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
  role: roleProp = 'menuitem',
  trailing,
  tabIndex = -1,
}: DropdownItemProps) {
  const resolvedRole =
    roleProp === 'menuitem' && selected != null ? 'menuitemcheckbox' : roleProp
  const isOption = resolvedRole === 'option'

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
      tabIndex={tabIndex}
      role={resolvedRole}
      aria-selected={isOption ? selected : undefined}
      aria-checked={!isOption ? selected : undefined}
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
