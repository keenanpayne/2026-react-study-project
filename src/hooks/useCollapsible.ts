import { useState, useCallback } from 'react'

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
