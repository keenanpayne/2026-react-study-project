import { Ellipsis } from 'lucide-react'
import ChatResponse from './ChatResponse'
import DropdownChat from './DropdownChat'
import DropdownTrigger from './DropdownTrigger'
import { MockChatUserMessage } from '~/data/MockChat'

type ChatMessageProps = {
  setIsActionDialogOpen: (open: boolean) => void
  isActionDialogOpen: boolean
}

export default function ChatMessage(props: ChatMessageProps) {
  return (
    <>
      {/* User Message */}
      <article className="p-5">
        <p className="rounded-lg border border-gray-200 bg-gray-100 p-3 text-sm leading-relaxed dark:border-zinc-700 dark:bg-zinc-800">
          {MockChatUserMessage}
        </p>
      </article>

      {/* Bolt Message */}
      <article className="flex flex-col gap-3 px-5 pb-6 text-sm leading-relaxed">
        <nav className="flex items-center justify-between">
          <img
            src="/bolt-logo.png"
            alt="Bolt"
            className="h-3.5 dark:invert-100"
          />

          <DropdownTrigger size="sm" radius="md" dropdown={<DropdownChat />}>
            <Ellipsis />
          </DropdownTrigger>
        </nav>

        <ChatResponse
          actionsExpanded={false}
          actionOnClick={() =>
            props.setIsActionDialogOpen(!props.isActionDialogOpen)
          }
        />
      </article>
    </>
  )
}
