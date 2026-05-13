import { useCallback, useEffect, useRef, useState } from 'react'
import type { MobileView, WorkbenchPane } from '~/types/navigation'

const MOBILE_MAX_WIDTH = '(max-width: 767px)'

function paneFromHash(hash: string): WorkbenchPane | null {
  const raw = hash.replace(/^#/, '').toLowerCase()
  if (raw === 'codebase' || raw === 'database') return raw
  return null
}

function isMobileLayout() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_MAX_WIDTH).matches
}

function writePaneHashToUrl(pane: WorkbenchPane) {
  if (typeof window === 'undefined') return

  if (pane === 'preview') {
    const { pathname, search } = window.location
    if (window.location.hash) {
      history.replaceState(null, '', `${pathname}${search}`)
    }
    return
  }

  const next = `#${pane}`
  if (window.location.hash !== next) {
    window.location.hash = pane
  }
}

function getInitialPane(initialPane: WorkbenchPane): WorkbenchPane {
  if (typeof window === 'undefined') return initialPane
  return paneFromHash(window.location.hash) ?? initialPane
}

function getInitialMobileView(): MobileView {
  if (typeof window === 'undefined') return 'chat'
  const pane = paneFromHash(window.location.hash)
  if ((pane === 'codebase' || pane === 'database') && isMobileLayout()) {
    return pane
  }
  return 'chat'
}

export function useMobileNavigation(initialPane: WorkbenchPane = 'preview') {
  const [activePane, setActivePane] = useState<WorkbenchPane>(() =>
    getInitialPane(initialPane),
  )
  const [activeMobileView, setActiveMobileView] =
    useState<MobileView>(getInitialMobileView)
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

  const syncStateFromHash = useCallback(() => {
    const pane = paneFromHash(window.location.hash) ?? 'preview'
    setActivePane(pane)
    if (isMobileLayout()) {
      if (pane === 'codebase' || pane === 'database') {
        setActiveMobileView(pane)
      } else {
        setActiveMobileView('chat')
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', syncStateFromHash)
    return () => window.removeEventListener('hashchange', syncStateFromHash)
  }, [syncStateFromHash])

  const handlePaneChange = useCallback((pane: WorkbenchPane) => {
    setActivePane(pane)
    writePaneHashToUrl(pane)
  }, [])

  const handleMobileViewChange = useCallback(
    (view: MobileView) => {
      setActiveMobileView(view)
      if (view !== 'chat') {
        setActivePane(view)
        writePaneHashToUrl(view)
      } else {
        setActivePane('preview')
        writePaneHashToUrl('preview')
      }
      requestAnimationFrame(() => focusViewHeading(view))
    },
    [focusViewHeading],
  )

  return {
    activePane,
    handlePaneChange,
    activeMobileView,
    handleMobileViewChange,
    chatRef,
    workbenchRef,
  }
}
