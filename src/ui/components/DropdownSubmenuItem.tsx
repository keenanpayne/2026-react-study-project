import { ChevronRight } from 'lucide-react'
import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type FocusEvent,
  type MouseEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import DropdownItemBase from './DropdownItemBase'
import {
  DROPDOWN_ITEM_SELECTOR,
  getDropdownItemClassName,
  type DropdownItemSize,
} from '~/utils/dropdown.utils'

type DropdownSubmenuItemProps = {
  title: ReactNode
  prepend?: string
  append?: string
  size: DropdownItemSize
  icon?: ReactNode
  className?: string
  dropdown: ReactNode
  selected?: boolean
  disabled?: boolean
  tabIndex?: number
}

const CLOSE_DELAY_MS = 50

export default function DropdownSubmenuItem({
  title,
  prepend,
  append,
  size,
  icon,
  className,
  dropdown,
  selected,
  disabled,
  tabIndex = -1,
}: DropdownSubmenuItemProps) {
  const [isSubOpen, setIsSubOpen] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const openedViaClick = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null
      setIsSubOpen(false)
    }, CLOSE_DELAY_MS)
  }

  const handleBlur = (e: FocusEvent) => {
    if (itemRef.current && !itemRef.current.contains(e.relatedTarget as Node)) {
      setIsSubOpen(false)
      openedViaClick.current = false
    }
  }

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (isSubOpen) {
      setIsSubOpen(false)
      openedViaClick.current = false
    } else {
      setIsSubOpen(true)
      openedViaClick.current = true
    }
  }

  const focusFirstSubmenuItem = () => {
    requestAnimationFrame(() => {
      const first = itemRef.current?.querySelector<HTMLElement>(
        DROPDOWN_ITEM_SELECTOR,
      )
      first?.focus()
    })
  }

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault()
      e.stopPropagation()
      setIsSubOpen(true)
      openedViaClick.current = true
      focusFirstSubmenuItem()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      e.stopPropagation()
      setIsSubOpen(false)
      openedViaClick.current = false
      itemRef.current?.focus()
    }
  }

  useEffect(() => {
    if (!isSubOpen) return

    const handlePointerDown = (e: PointerEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setIsSubOpen(false)
        openedViaClick.current = false
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSubOpen(false)
        openedViaClick.current = false
        itemRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isSubOpen])

  useEffect(() => {
    if (!isSubOpen) cancelClose()
    return cancelClose
  }, [isSubOpen])

  return (
    <li
      ref={itemRef}
      className={getDropdownItemClassName({
        size,
        selected,
        disabled,
        className,
        hasSubmenu: true,
      })}
      tabIndex={tabIndex}
      role="menuitem"
      aria-disabled={disabled}
      aria-expanded={isSubOpen}
      aria-haspopup="menu"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        cancelClose()
        setIsSubOpen(true)
      }}
      onMouseLeave={() => {
        if (!openedViaClick.current) scheduleClose()
      }}
      onBlur={handleBlur}
    >
      <DropdownItemBase
        title={title}
        prepend={prepend}
        append={append}
        icon={icon}
      />

      <ChevronRight
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="icon-interactive group-hover/dropdown-item:stroke-icon-hover max-md:rotate-90"
      />

      {isSubOpen && (
        <div
          role="presentation"
          className="my-1.5 w-full md:my-0 md:contents"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {dropdown}
        </div>
      )}
    </li>
  )
}
