import { Bookmark, Eye, Undo2 } from 'lucide-react'
import Button from './Button'

type ChatPlanProps = {
  title: string
  version: string
  createdAt: Date
}

export default function ChatPlan(props: ChatPlanProps) {
  return (
    <aside className="my-3 flex justify-between rounded-lg border border-gray-300 px-3 py-2.5 md:max-w-[80%] dark:border-zinc-600">
      <header className="flex flex-col">
        <p className="text-xs text-gray-500 dark:text-zinc-400">
          {props.version}
        </p>

        <h3 className="font-semibold">{props.title}</h3>

        <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
          <time dateTime={props.createdAt.toISOString()}>
            {props.createdAt.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </p>
      </header>

      <nav className="flex items-center gap-0.5">
        <Button size="sm" radius="sm" iconOnly>
          <Bookmark
            size={20}
            strokeWidth={1.5}
            className="fill-blue-400 stroke-blue-400"
          />
        </Button>

        <Button size="sm" radius="sm" iconOnly>
          <Eye size={20} strokeWidth={1.5} />
        </Button>

        <Button size="sm" radius="sm" iconOnly>
          <Undo2 size={20} strokeWidth={1.5} />
        </Button>
      </nav>
    </aside>
  )
}
