import { Ellipsis } from 'lucide-react'
import ChatResponse from './ChatResponse'
import DropdownChat from './DropdownChat'
import DropdownTrigger from './DropdownTrigger'
import BoltLogo from './BoltLogo'
import type { ChatActionData, ChatResponseData } from '~/types/chat'

type ChatMessageProps = {
  message: string
  response: ChatResponseData
  actions: ChatActionData[]
  onOpenActionDetails: () => void
}

export default function ChatMessage({
  message,
  response,
  actions,
  onOpenActionDetails,
}: ChatMessageProps) {
  return (
    <>
      <article aria-label="Your message" className="p-5">
        <p className="border-border-default bg-surface-muted rounded-lg border p-3 text-sm leading-relaxed">
          {message}
        </p>
      </article>

      <article
        aria-label="Assistant response"
        className="flex flex-col gap-3 px-5 pb-6 text-sm leading-relaxed"
      >
        <div className="flex items-center justify-between">
          <BoltLogo className="h-3.5" />

          <div role="toolbar" aria-label="Message actions">
            <DropdownTrigger size="sm" radius="md" dropdown={<DropdownChat />}>
              <span className="sr-only">Open chat menu</span>
              <Ellipsis aria-hidden="true" />
            </DropdownTrigger>
          </div>
        </div>

        <ChatResponse
          response={response}
          actions={actions}
          actionsExpanded={false}
          actionOnClick={onOpenActionDetails}
        />
      </article>
    </>
  )
}
