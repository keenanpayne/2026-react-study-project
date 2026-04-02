import type { ReactNode } from 'react'
import CollapseToggle from './CollapseToggle'
import { useCollapsible } from '~/hooks/useCollapsible'

type WorkbenchRightContentProps = {
  children?: ReactNode
}

export default function WorkbenchRightContent({
  children,
}: WorkbenchRightContentProps) {
  const { isExpanded, toggle } = useCollapsible()

  return (
    <div
      className={`min-w-0 rounded-tr-xl transition-[flex-grow] duration-150 ease-out ${isExpanded ? 'overflow-scroll @md:flex-7 @lg:flex-8 @2xl:flex-9' : '@md:border-border-default h-10 flex-none overflow-hidden @md:ml-auto @md:h-auto @md:min-w-10 @md:flex-0 @md:border-l'}`}
    >
      <header
        className={`section-header flex h-10 items-center justify-end px-1 py-1`}
      >
        <CollapseToggle
          isExpanded={isExpanded}
          onToggle={toggle}
          direction="horizontal-right"
          controls="right-content-panel"
          label="content panel"
        />
      </header>

      <div
        id="right-content-panel"
        className={`overflow-hidden transition-opacity duration-150 ease-out ${isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        {children}
      </div>
    </div>
  )
}
