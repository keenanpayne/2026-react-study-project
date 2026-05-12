import type { ReactNode } from 'react'
import WorkbenchContainer from './WorkbenchContainer'
import EmptyPane from './EmptyPane'
import { Heart } from 'lucide-react'
import BoltLogo from './BoltLogo'
import Button from './Button'

type WorkbenchPreviewProps = {
  /**
   * Controls CSS visibility rather than mount/unmount. All panes stay mounted
   * to preserve scroll position, form state, and iframe content across tab
   * switches. Hidden panes use `display: none` via the Tailwind `hidden` class.
   */
  isVisible: boolean
  showStartPlaceholder?: boolean
  onImplementPlan?: () => void
  children?: ReactNode
}

export default function WorkbenchPreview({
  isVisible,
  showStartPlaceholder = false,
  onImplementPlan,
  children,
}: WorkbenchPreviewProps) {
  return (
    <WorkbenchContainer className={isVisible ? 'overflow-hidden' : 'hidden'}>
      {showStartPlaceholder ? (
        <div className="bg-surface-muted h-full w-full">
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 p-8 text-center">
            <BoltLogo className="h-16" wordmark />
            <p className="text-text-secondary flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-lg">
              <span>Click</span>
              <Button
                size="lg"
                radius="md"
                variant="blue"
                onClick={onImplementPlan}
              >
                Implement this plan
              </Button>
              <span>to start building</span>
            </p>
          </div>
        </div>
      ) : (
        (children ?? (
          <EmptyPane
            title="No preview available"
            description="Prompt the chat to generate a preview of the output."
          />
        ))
      )}

      <a
        href="https://keenanpayne.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-surface-raised hover:bg-hover-item absolute right-4 bottom-4 z-10 flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm tracking-tight antialiased shadow-lg transition-all"
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
