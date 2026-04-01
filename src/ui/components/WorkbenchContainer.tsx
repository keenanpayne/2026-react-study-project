import type { ReactNode } from 'react'

type WorkbenchContainerProps = {
  children: ReactNode
  className?: string
}

export default function WorkbenchContainer(props: WorkbenchContainerProps) {
  return (
    <section
      className={`panel-card relative mb-3 h-full min-h-0 w-full flex-1 rounded-xl ${props.className}`}
    >
      {props.children}
    </section>
  )
}
