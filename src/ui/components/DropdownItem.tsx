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

type DropdownItemProps = {
  title: ReactNode
  prepend?: string
  append?: string
  size: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
  dropdown?: ReactNode
  onSelect?: () => void
  selected?: boolean
  disabled?: boolean
  role?: string
  trailing?: ReactNode
}

const CLOSE_DELAY_MS = 50

export default function DropdownItem(props: DropdownItemProps) {
  const [isSubOpen, setIsSubOpen] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const openedViaClick = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const size =
    props.size === 'sm'
      ? 'text-xs p-1 m-1'
      : props.size === 'md'
        ? 'text-sm px-1.5 py-1 mx-1.5 my-1'
        : props.size === 'lg'
          ? 'text-base px-2 py-1.5 mx-2 my-1.5'
          : ''
  const dropdownClass = props.dropdown ? 'relative' : ''
  const className = props.className ? props.className : ''
  const selectedClass = props.selected
    ? 'bg-selected hover:bg-selected-hover'
    : ''
  const disabledClass = props.disabled ? 'opacity-55' : ''
  const classNames = `group/dropdown-item cursor-pointer flex flex-wrap items-center justify-between rounded-md hover:bg-hover-item transition-colors ${size} ${dropdownClass} ${selectedClass} ${disabledClass} ${className}`
  const prependAppendClass = 'text-xs text-text-muted block w-full'

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

  const handleSelectClick = () => {
    if (!props.disabled && props.onSelect) props.onSelect()
  }

  const handleSelectKeyDown = (e: ReactKeyboardEvent) => {
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      !props.disabled &&
      props.onSelect
    ) {
      e.preventDefault()
      props.onSelect()
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSubOpen(false)
        openedViaClick.current = false
        itemRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSubOpen])

  useEffect(() => {
    if (!isSubOpen) cancelClose()
    return cancelClose
  }, [isSubOpen])

  return (
    <li
      ref={props.dropdown ? itemRef : undefined}
      className={classNames}
      tabIndex={0}
      role={props.role ?? 'menuitem'}
      aria-selected={props.selected}
      aria-disabled={props.disabled}
      onClick={props.dropdown ? handleClick : handleSelectClick}
      onKeyDown={props.dropdown ? undefined : handleSelectKeyDown}
      onMouseEnter={
        props.dropdown
          ? () => {
              cancelClose()
              setIsSubOpen(true)
            }
          : undefined
      }
      onMouseLeave={
        props.dropdown
          ? () => {
              if (!openedViaClick.current) scheduleClose()
            }
          : undefined
      }
      onFocus={props.dropdown ? () => setIsSubOpen(true) : undefined}
      onBlur={props.dropdown ? handleBlur : undefined}
      aria-expanded={props.dropdown ? isSubOpen : undefined}
      aria-haspopup={props.dropdown ? 'menu' : undefined}
    >
      <span className="flex flex-1 items-center gap-2.5">
        {props.icon}

        <span>
          {props.prepend && (
            <span className={prependAppendClass}>{props.prepend}</span>
          )}
          {props.title}
          {props.append && (
            <span className={prependAppendClass}>{props.append}</span>
          )}
        </span>
      </span>

      {props.trailing}

      {props.dropdown && (
        <>
          <ChevronRight
            size={16}
            strokeWidth={1.5}
            className="icon-interactive group-hover/dropdown-item:stroke-icon-hover max-md:rotate-90"
          />

          {isSubOpen && (
            <div className="my-1.5 w-full md:my-0 md:contents">
              {props.dropdown}
            </div>
          )}
        </>
      )}
    </li>
  )
}
