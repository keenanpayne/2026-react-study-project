import { ChevronRight } from 'lucide-react'
import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type FocusEvent,
  type MouseEvent,
} from 'react'

type DropdownItemProps = {
  title: string
  prepend?: string
  append?: string
  size: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
  dropdown?: ReactNode
}

export default function DropdownItem(props: DropdownItemProps) {
  const [isSubOpen, setIsSubOpen] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const openedViaClick = useRef(false)

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
  const classNames = `group/dropdown-item cursor-pointer flex flex-wrap items-center justify-between rounded-md hover:bg-hover-item transition-colors ${size} ${dropdownClass} ${className}`
  const prependAppendClass = 'text-xs text-text-muted block w-full'

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

  return (
    <li
      ref={props.dropdown ? itemRef : undefined}
      className={classNames}
      tabIndex={0}
      onClick={props.dropdown ? handleClick : undefined}
      onMouseEnter={props.dropdown ? () => setIsSubOpen(true) : undefined}
      onMouseLeave={
        props.dropdown
          ? () => {
              if (!openedViaClick.current) setIsSubOpen(false)
            }
          : undefined
      }
      onFocus={props.dropdown ? () => setIsSubOpen(true) : undefined}
      onBlur={props.dropdown ? handleBlur : undefined}
      aria-expanded={props.dropdown ? isSubOpen : undefined}
      aria-haspopup={props.dropdown ? 'menu' : undefined}
    >
      <p className="flex flex-1 items-center gap-2.5">
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
      </p>

      {props.dropdown && (
        <>
          <ChevronRight
            size={16}
            strokeWidth={1.5}
            className="icon-interactive group-hover/dropdown-item:stroke-icon-hover max-md:rotate-90"
          />

          {isSubOpen && (
            <div className="w-full md:contents">{props.dropdown}</div>
          )}
        </>
      )}
    </li>
  )
}
