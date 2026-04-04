import { useState, useCallback, useRef, useEffect } from 'react'

export function useCollapsible(
  defaultExpanded = true,
  canToggle?: () => boolean,
) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const toggle = useCallback(() => {
    if (canToggle && !canToggle()) return
    setIsExpanded((prev) => !prev)
  }, [canToggle])

  return { isExpanded, toggle } as const
}

/**
 * Manages a pair of collapsible panels where at least one must remain expanded.
 * Each panel's toggle is disabled when it is the only one still open.
 */
export function useCollapsiblePair() {
  const sidebarExpandedRef = useRef(true)
  const contentExpandedRef = useRef(true)

  const { isExpanded: sidebarExpanded, toggle: toggleSidebar } = useCollapsible(
    true,
    () => !sidebarExpandedRef.current || contentExpandedRef.current,
  )
  const { isExpanded: contentExpanded, toggle: toggleContent } = useCollapsible(
    true,
    () => !contentExpandedRef.current || sidebarExpandedRef.current,
  )

  useEffect(() => {
    sidebarExpandedRef.current = sidebarExpanded
    contentExpandedRef.current = contentExpanded
  }, [sidebarExpanded, contentExpanded])

  return { sidebarExpanded, toggleSidebar, contentExpanded, toggleContent }
}
