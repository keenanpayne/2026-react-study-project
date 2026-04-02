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
        'panel-card relative mb-3 h-full min-h-0 w-full flex-1 rounded-xl',
        className,
      )}
    >
      {children}
    </section>
  )
}
