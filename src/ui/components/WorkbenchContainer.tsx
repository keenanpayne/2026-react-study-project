import type { ReactNode } from 'react'
import { cx } from '~/utils/cx'

type WorkbenchContainerProps = {
  children: ReactNode
  className?: string
}

export default function WorkbenchContainer({
  children,
  className,
}: WorkbenchContainerProps) {
  return (
    <section
      className={cx(
        'panel-card relative mb-6 h-full min-h-0 w-full flex-1 overflow-scroll rounded-xl md:mb-3',
        className,
      )}
    >
      {children}
    </section>
  )
}
