import type { ReactNode } from 'react'
import WorkbenchContainer from './WorkbenchContainer'
import EmptyPane from './EmptyPane'

type WorkbenchPreviewProps = {
  /**
   * Controls CSS visibility rather than mount/unmount. All panes stay mounted
   * to preserve scroll position, form state, and iframe content across tab
   * switches. Hidden panes use `display: none` via the Tailwind `hidden` class.
   */
  isVisible: boolean
  children?: ReactNode
}

export default function WorkbenchPreview({
  isVisible,
  children,
}: WorkbenchPreviewProps) {
  return (
    <WorkbenchContainer className={isVisible ? 'overflow-hidden' : 'hidden'}>
      {children ?? (
        <EmptyPane
          title="No preview available"
          description="Prompt the chat to generate a preview of the output."
        />
      )}
    </WorkbenchContainer>
  )
}
