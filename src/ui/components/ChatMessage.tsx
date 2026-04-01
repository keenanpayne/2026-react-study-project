import { Ellipsis } from 'lucide-react'
import ChatResponse from './ChatResponse'
import DropdownChat from './DropdownChat'
import DropdownTrigger from './DropdownTrigger'
import { MockChatUserMessage } from '~/data/MockChat'

type ChatMessageProps = {
  onOpenActionDetails: () => void
}

export default function ChatMessage(props: ChatMessageProps) {
  return (
    <>
      {/* User Message */}
      <article className="p-5">
        <p className="border-border-default bg-surface-muted rounded-lg border p-3 text-sm leading-relaxed">
          {MockChatUserMessage}
        </p>
      </article>

      {/* Bolt Message */}
      <article className="flex flex-col gap-3 px-5 pb-6 text-sm leading-relaxed">
        <nav className="flex items-center justify-between">
          <img src="/bolt-logo.png" alt="Bolt" className="invert-dark h-3.5" />

          <DropdownTrigger size="sm" radius="md" dropdown={<DropdownChat />}>
            <Ellipsis />
          </DropdownTrigger>
        </nav>

        <ChatResponse
          actionsExpanded={false}
          actionOnClick={props.onOpenActionDetails}
        />
      </article>
    </>
  )
}
