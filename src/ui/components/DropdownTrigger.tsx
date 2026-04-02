import { useEffect, useRef, useState, type ReactNode } from 'react'
import Button, { type ButtonProps } from './Button'
import { DropdownTriggerCloseContext } from '~/context/dropdownTriggerCloseContext'
import { cx } from '~/utils/cx'

type DropdownTriggerProps = Extract<ButtonProps, { as?: 'button' }> & {
  dropdown: ReactNode
  wrapperClassName?: string
  popupType?: 'menu' | 'listbox' | 'dialog' | 'tree' | 'grid' | 'true'
}

export default function DropdownTrigger(props: DropdownTriggerProps) {
  const {
    dropdown,
    wrapperClassName,
    popupType = 'menu',
    onClick,
    children,
    ...buttonProps
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return

    // Close dropdown when clicking away
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Close dropdown with `esc` key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        const trigger = rootRef.current?.querySelector<HTMLElement>(
          "[data-dropdown-trigger='true']",
        )
        trigger?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <DropdownTriggerCloseContext.Provider value={{ close }}>
      <div
        ref={rootRef}
        className={cx('relative inline-flex', wrapperClassName)}
      >
        <Button
          aria-expanded={isOpen}
          aria-haspopup={popupType}
          data-dropdown-trigger="true"
          variant={isOpen ? 'selected' : 'ghost'}
          onClick={(event) => {
            setIsOpen((current) => !current)
            onClick?.(event)
          }}
          {...buttonProps}
        >
          {children}
        </Button>

        {isOpen ? dropdown : null}
      </div>
    </DropdownTriggerCloseContext.Provider>
  )
}
