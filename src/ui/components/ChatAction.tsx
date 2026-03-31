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
        <span className="flex flex-1 items-center gap-2 text-gray-700 transition-colors group-hover/button:text-gray-900 dark:text-zinc-200 dark:group-hover/button:text-zinc-300">
          {props.icon}
          {props.title}
        </span>

        <span
          className={`flex items-center gap-1 text-xs text-blue-400 opacity-0 transition-opacity ${props.actionsExpanded ? '' : 'group-hover/button:opacity-100'}`}
        >
          Open
          <ChevronRight size={14} strokeWidth={1.5} />
        </span>
      </Button>
    </li>
  )
}
