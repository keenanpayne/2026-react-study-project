import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
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
  const panelId = useId()

  const close = useCallback(() => setIsOpen(false), [])
  const contextValue = useMemo(() => ({ close }), [close])

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
    <DropdownTriggerCloseContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        className={cx('relative inline-flex', wrapperClassName)}
      >
        <Button
          aria-expanded={isOpen}
          aria-haspopup={popupType}
          aria-controls={isOpen ? panelId : undefined}
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

        {isOpen ? <div id={panelId}>{dropdown}</div> : null}
      </div>
    </DropdownTriggerCloseContext.Provider>
  )
}
