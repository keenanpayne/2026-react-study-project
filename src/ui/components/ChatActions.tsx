import {
  CircleEllipsis,
  ChevronDown,
  SquareTerminal,
  Eye,
  type LucideIcon,
} from 'lucide-react'
import CodeString from './CodeString'
import ChatAction from './ChatAction'
import { MockChatActions, type MockChatActionIconType } from '~/data/mockChat'

type ChatActionsProps = {
  count: number
  actionsExpanded: boolean
  actionOnClick: () => void
}

const ICON_MAP: Record<MockChatActionIconType, LucideIcon> = {
  terminal: SquareTerminal,
  read: Eye,
}

export default function ChatActions({
  count,
  actionsExpanded,
  actionOnClick,
}: ChatActionsProps) {
  return (
    <details className="group/details py-3" open={actionsExpanded}>
      <summary className="mb-0 flex cursor-pointer items-center gap-2">
        <span className="flex flex-1 items-center gap-2">
          <CircleEllipsis size={16} strokeWidth={1.5} aria-hidden="true" />{' '}
          {count} actions taken
        </span>

        <ChevronDown
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-300 group-open/details:rotate-180"
        />
      </summary>

      <ul className="space-y-3 pt-5">
        {MockChatActions.map((action) => {
          const Icon = ICON_MAP[action.iconType]
          return (
            <ChatAction
              key={action.id}
              title={
                action.codeRef ? (
                  <>
                    {action.title} <CodeString text={action.codeRef} />
                  </>
                ) : (
                  action.title
                )
              }
              icon={
                <Icon
                  size={18}
                  strokeWidth={1}
                  aria-hidden
                  className="icon-interactive group-hover/button:stroke-icon-hover"
                />
              }
              actionOnClick={actionOnClick}
              actionsExpanded={actionsExpanded}
            />
          )
        })}
      </ul>
    </details>
  )
}
