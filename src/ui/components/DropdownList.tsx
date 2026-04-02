import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { DROPDOWN_ITEM_SELECTOR } from '~/utils/dropdown.utils'

type DropdownListProps = {
  children: ReactNode
  role?: 'menu' | 'listbox'
}

export default function DropdownList({
  children,
  role = 'menu',
}: DropdownListProps) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    requestAnimationFrame(() => {
      const first = list.querySelector<HTMLElement>(DROPDOWN_ITEM_SELECTOR)
      if (first && !list.contains(document.activeElement)) {
        first.focus()
      }
    })
  }, [])

  const getDirectItems = useCallback(() => {
    const list = listRef.current
    if (!list) return []

    return Array.from(
      list.querySelectorAll<HTMLElement>(DROPDOWN_ITEM_SELECTOR),
    ).filter((el) => el.closest('[role="menu"], [role="listbox"]') === list)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return

      const items = getDirectItems()
      if (items.length === 0) return

      const currentIndex = items.findIndex(
        (el) => el === document.activeElement,
      )
      let nextIndex: number

      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      }

      e.preventDefault()
      items[nextIndex].focus()
    },
    [getDirectItems],
  )

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- role is always interactive (menu/listbox)
    <ul ref={listRef} role={role} onKeyDown={handleKeyDown}>
      {children}
    </ul>
  )
}
