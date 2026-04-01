import type { ReactNode } from 'react'
import EmptyPane from './EmptyPane'

type WorkbenchPreviewProps = {
  isVisible: boolean
  children?: ReactNode
}

export default function WorkbenchPreview(props: WorkbenchPreviewProps) {
  return (
    <div
      className={`panel-card relative mb-3 h-full min-h-0 w-full flex-1 overflow-hidden rounded-xl ${props.isVisible ? '' : 'hidden'}`}
    >
      {props.children ? (
        props.children
      ) : (
        <EmptyPane
          title="No preview available"
          description="Prompt the chat to generate a preview of the output."
        />
      )}
    </div>
  )
}
