import { Ellipsis } from 'lucide-react'
import ChatResponse from './ChatResponse'
import DropdownChat from './DropdownChat'
import DropdownTrigger from './DropdownTrigger'
import { MockChatUserMessage } from '~/data/MockChat'
import BoltLogo from './BoltLogo'

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
        <div
          role="toolbar"
          aria-label="Message actions"
          className="flex items-center justify-between"
        >
          <BoltLogo className="h-3.5" />

          <DropdownTrigger size="sm" radius="md" dropdown={<DropdownChat />}>
            <span className="sr-only">Open chat menu</span>
            <Ellipsis />
          </DropdownTrigger>
        </div>

        <ChatResponse
          actionsExpanded={false}
          actionOnClick={props.onOpenActionDetails}
        />
      </article>
    </>
  )
}
