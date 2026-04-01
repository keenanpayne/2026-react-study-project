import { useState, useCallback } from 'react'

export function useCollapsible(defaultExpanded = true) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const toggle = useCallback(() => setIsExpanded((prev) => !prev), [])

  return { isExpanded, toggle } as const
}
