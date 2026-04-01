import type { ReactNode } from 'react'

type WorkbenchContentsProps = {
  children: ReactNode
}

export default function WorkbenchContents(props: WorkbenchContentsProps) {
  return <div className="@container flex h-full flex-col">{props.children}</div>
}
