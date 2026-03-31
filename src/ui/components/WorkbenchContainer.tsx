import type { ReactNode } from 'react'

type WorkbenchContainerProps = {
  children: ReactNode
  className?: string
}

export default function WorkbenchContainer(props: WorkbenchContainerProps) {
  return (
    <main
      className={`relative mb-3 h-full min-h-0 w-full flex-1 rounded-xl border border-gray-200 dark:border-zinc-700 ${props.className}`}
    >
      {props.children}
    </main>
  )
}
