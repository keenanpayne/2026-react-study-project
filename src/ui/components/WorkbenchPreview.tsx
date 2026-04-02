import type { ReactNode } from 'react'
import WorkbenchContainer from './WorkbenchContainer'
import EmptyPane from './EmptyPane'

type WorkbenchPreviewProps = {
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
