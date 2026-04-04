import type { ReactNode } from 'react'
import CollapseToggle from './CollapseToggle'

type WorkbenchRightContentProps = {
  title?: ReactNode
  children?: ReactNode
  panelExpanded: boolean
  onPanelToggle: () => void
  collapseDisabled?: boolean
}

export default function WorkbenchRightContent({
  title,
  children,
  panelExpanded,
  onPanelToggle,
  collapseDisabled,
}: WorkbenchRightContentProps) {
  return (
    <div
      className={`min-w-0 transition-[flex-grow] duration-150 ease-out @md:rounded-tr-xl ${panelExpanded ? 'overflow-scroll @md:flex-7 @lg:flex-8 @2xl:flex-9' : '@md:border-border-default h-10 flex-none overflow-hidden @md:ml-auto @md:h-auto @md:min-w-10 @md:flex-0 @md:border-l'}`}
    >
      <header
        className={`section-header flex flex-1 items-center gap-2 px-1 py-1 ${panelExpanded ? 'h-10 flex-row' : 'h-full flex-row justify-center @md:flex-col'}`}
      >
        {title && (
          <h2
            className={`min-w-0 text-sm font-medium ${panelExpanded ? 'flex-1 pl-2' : 'flex-1 @md:[text-orientation:mixed] @md:[writing-mode:vertical-rl]'}`}
          >
            {title}
          </h2>
        )}

        <CollapseToggle
          isExpanded={panelExpanded}
          onToggle={onPanelToggle}
          direction="horizontal-right"
          controls="right-content-panel"
          label="content panel"
          className={panelExpanded ? '' : '@md:order-first'}
          disabled={collapseDisabled}
        />
      </header>

      <div
        id="right-content-panel"
        className={`overflow-hidden transition-opacity duration-150 ease-out ${panelExpanded ? 'min-h-full opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        {children}
      </div>
    </div>
  )
}
