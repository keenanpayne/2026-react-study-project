import type { ReactNode } from 'react'
import EmptyPane from './EmptyPane'

type WorkbenchPreviewProps = {
  isVisible: boolean
  children?: ReactNode
}

export default function WorkbenchPreview(props: WorkbenchPreviewProps) {
  if (!props.isVisible) return null

  return (
    <div className="relative mb-3 h-full min-h-0 w-full flex-1 overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-700">
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
