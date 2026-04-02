import type { ReactNode } from 'react'

type WorkbenchContentsProps = {
  children: ReactNode
}

export default function WorkbenchContents({
  children,
}: WorkbenchContentsProps) {
  return <div className="@container flex h-full flex-col">{children}</div>
}
