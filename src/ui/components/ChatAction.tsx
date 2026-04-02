import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Button from './Button'

type ChatActionProps = {
  title: ReactNode
  icon: ReactNode
  actionOnClick: () => void
  actionsExpanded: boolean
}

export default function ChatAction(props: ChatActionProps) {
  return (
    <li>
      <Button
        size="flat"
        className="group/button flex w-full items-center justify-between gap-2"
        onClick={props.actionOnClick}
      >
        <span className="text-text-secondary group-hover/button:text-text-heading flex flex-1 items-center gap-2 transition-colors">
          {props.icon}
          {props.title}
        </span>

        <span
          className={`text-accent flex items-center gap-1 text-xs opacity-0 transition-opacity ${props.actionsExpanded ? '' : 'group-hover/button:opacity-100'}`}
        >
          Open
          <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </Button>
    </li>
  )
}
