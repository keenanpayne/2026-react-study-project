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
        <nav className="flex items-center gap-2">
          <Button size="lg" radius="pill" variant="selected">
            <Zap size={18} strokeWidth={1.5} />
            Bolt
          </Button>

          <Button size="lg" radius="pill" variant="ghost">
            <Rocket size={18} strokeWidth={1.5} />
            Publish Output
          </Button>

          <Button size="lg" radius="pill" variant="ghost">
            <SquareTerminal size={18} strokeWidth={1.5} />
            Terminal
          </Button>

          <CollapseToggle
            isExpanded={isExpanded}
            onToggle={toggle}
            direction="vertical"
            className="ml-auto"
          />
        </nav>
      </header>

      <div
        className={`overflow-hidden rounded-b-xl transition-[max-height,opacity] duration-200 ease-out ${isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <File
          file={props.file}
          options={DIFF_TERMINAL_OPTIONS}
          className="overflow-scroll rounded-b-xl px-1.5 py-0.5 text-xs leading-tight"
        />
      </div>
    </section>
  )
}
