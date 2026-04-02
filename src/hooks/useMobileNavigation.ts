import { useCallback, useRef, useState } from 'react'
import type {
  MobileView,
  WorkbenchPane,
} from '~/ui/components/MobileNavigation'

export function useMobileNavigation(initialPane: WorkbenchPane = 'preview') {
  const [activePane, setActivePane] = useState<WorkbenchPane>(initialPane)
  const [activeMobileView, setActiveMobileView] = useState<MobileView>('chat')
  const chatRef = useRef<HTMLElement>(null)
  const workbenchRef = useRef<HTMLElement>(null)

  const focusViewHeading = useCallback((view: MobileView) => {
    const targetRef = view === 'chat' ? chatRef : workbenchRef
    const el = targetRef.current
    if (el) {
      const heading = el.querySelector('h1, h2, h3, [tabindex="-1"]')
      if (heading instanceof HTMLElement) {
        heading.focus({ preventScroll: true })
      } else {
        el.focus({ preventScroll: true })
      }
    }
  }, [])

  const handleMobileViewChange = useCallback(
    (view: MobileView) => {
      setActiveMobileView(view)
      if (view !== 'chat') {
        setActivePane(view)
      }
      requestAnimationFrame(() => focusViewHeading(view))
    },
    [focusViewHeading],
  )

  return {
    activePane,
    setActivePane,
    activeMobileView,
    handleMobileViewChange,
    chatRef,
    workbenchRef,
  }
}
