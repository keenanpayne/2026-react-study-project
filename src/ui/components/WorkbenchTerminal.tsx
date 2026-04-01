import { File, type FileContents } from '@pierre/diffs/react'
import Button from './Button'
import CollapseToggle from './CollapseToggle'
import { Zap, Rocket, SquareTerminal } from 'lucide-react'
import { DIFF_TERMINAL_OPTIONS } from '~/utils/diffOptions'
import { useCollapsible } from '~/hooks/useCollapsible'

type WorkbenchTerminalProps = {
  file: FileContents
}

export default function WorkbenchTerminal(props: WorkbenchTerminalProps) {
  const { isExpanded, toggle } = useCollapsible()

  return (
    <section className="border-border-default border-t">
      <header
        className={`section-header p-1.5 ${!isExpanded ? 'rounded-b-xl' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div
            role="tablist"
            aria-label="Terminal output"
            className="flex items-center gap-2"
          >
            <Button
              size="lg"
              radius="pill"
              variant="selected"
              role="tab"
              aria-selected={true}
            >
              <Zap size={18} strokeWidth={1.5} className="fill-fill-subtle" />
              Bolt
            </Button>

            <Button
              size="lg"
              radius="pill"
              variant="ghost"
              role="tab"
              aria-selected={false}
            >
              <Rocket size={18} strokeWidth={1.5} />
              Publish Output
            </Button>

            <Button
              size="lg"
              radius="pill"
              variant="ghost"
              role="tab"
              aria-selected={false}
            >
              <SquareTerminal size={18} strokeWidth={1.5} />
              Terminal
            </Button>
          </div>

          <CollapseToggle
            isExpanded={isExpanded}
            onToggle={toggle}
            direction="vertical"
            className="ml-auto"
          />
        </div>
      </header>

      <div
        className={`rounded-b-xl transition-[max-height,opacity] duration-200 ease-out ${isExpanded ? 'max-h-[200px] overflow-x-hidden overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        <File
          file={props.file}
          options={DIFF_TERMINAL_OPTIONS}
          className="rounded-b-xl px-1.5 py-0.5 text-xs leading-tight"
        />
      </div>
    </section>
  )
}
