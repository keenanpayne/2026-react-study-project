import type { ReactNode } from 'react'
import WorkbenchContainer from './WorkbenchContainer'
import EmptyPane from './EmptyPane'
import { Heart } from 'lucide-react'

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

      <a
        href="https://keenanpayne.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-surface-raised hover:bg-hover-strong absolute right-4 bottom-4 z-10 flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm tracking-tight antialiased shadow-lg transition-all"
      >
        <Heart
          size={14}
          className="fill-fill-destructive stroke-fill-destructive"
        />
        <span className="font-semibold">Made by Keenan</span>
      </a>
    </WorkbenchContainer>
  )
}
