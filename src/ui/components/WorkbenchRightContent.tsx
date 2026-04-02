import type { ReactNode } from 'react'
import CollapseToggle from './CollapseToggle'
import { useCollapsible } from '~/hooks/useCollapsible'

type WorkbenchRightContentProps = {
  title?: ReactNode
  children?: ReactNode
}

export default function WorkbenchRightContent({
  title,
  children,
}: WorkbenchRightContentProps) {
  const { isExpanded, toggle } = useCollapsible()

  return (
    <div
      className={`min-w-0 transition-[flex-grow] duration-150 ease-out @md:rounded-tr-xl ${isExpanded ? 'overflow-scroll @md:flex-7 @lg:flex-8 @2xl:flex-9' : '@md:border-border-default h-10 flex-none overflow-hidden @md:ml-auto @md:h-auto @md:min-w-10 @md:flex-0 @md:border-l'}`}
    >
      <header
        className={`section-header flex flex-1 items-center gap-2 px-1 py-1 ${isExpanded ? 'h-10 flex-row' : 'h-full flex-row justify-center @md:flex-col'}`}
      >
        {title && (
          <h2
            className={`min-w-0 text-sm font-medium ${isExpanded ? 'flex-1 pl-2' : 'flex-1 @md:[text-orientation:mixed] @md:[writing-mode:vertical-rl]'}`}
          >
            {title}
          </h2>
        )}

        <CollapseToggle
          isExpanded={isExpanded}
          onToggle={toggle}
          direction="horizontal-right"
          controls="right-content-panel"
          label="content panel"
          className={isExpanded ? '' : '@md:order-first'}
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
