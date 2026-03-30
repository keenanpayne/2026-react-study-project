import Button from "../base/Button";
import ChatResponse from "./ChatResponse";
import ChatDropdown from "./ChatDropdown";
import { Ellipsis } from "lucide-react";

type ChatMessageProps = {
  setIsActionDialogOpen: (open: boolean) => void;
  isActionDialogOpen: boolean;
}

export default function ChatMessage(props: ChatMessageProps) {
  return (
    <>
      {/* User Message */}
      <article className="p-5">
        <p className="p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm leading-relaxed">Let's build a social media scheduling application that will handle content creation/editing/scheduling for Twitter, Bluesky, Mastodon, Threads, and LinkedIn.</p>
      </article>

      {/* Bolt Message */}
      <article className="flex flex-col gap-3 px-5 pb-6 text-sm leading-relaxed">
        <nav className="flex justify-between items-center">
          <img src="/bolt-logo.png" alt="Bolt" className="h-3.5" />

          <Button size="sm" openChildren={<ChatDropdown />}>
            <Ellipsis />
          </Button>
        </nav>

        <ChatResponse actionsExpanded={false} actionOnClick={() => props.setIsActionDialogOpen(!props.isActionDialogOpen)} />
      </article>
    </>   
  )
}