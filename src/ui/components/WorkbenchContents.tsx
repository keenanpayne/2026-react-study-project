import type { ReactNode } from 'react'

type WorkbenchContentsProps = {
  children: ReactNode
}

export default function WorkbenchContents(props: WorkbenchContentsProps) {
  return (
    <div className="@container grid h-full grid-cols-12">{props.children}</div>
  )
}
