import { Bookmark, Eye, Undo2 } from 'lucide-react'
import Button from './Button'

type ChatPlanProps = {
  title: string
  version: string
  createdAt: Date
}

export default function ChatPlan({ title, version, createdAt }: ChatPlanProps) {
  return (
    <aside className="border-border-strong my-3 flex justify-between rounded-lg border px-3 py-2.5 md:max-w-[80%]">
      <header className="flex flex-col">
        <p className="text-text-muted text-xs">{version}</p>

        <h3 className="font-semibold">{title}</h3>

        <p className="text-text-muted mt-0.5 text-xs">
          <time dateTime={createdAt.toISOString()}>
            {createdAt.toLocaleString('en-US', {
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
          <span className="sr-only">Bookmark</span>

          <Bookmark
            size={20}
            strokeWidth={1.5}
            className="fill-blue-400 stroke-blue-400"
          />
        </Button>

        <Button size="sm" radius="sm" iconOnly>
          <span className="sr-only">Preview this version</span>

          <Eye size={20} strokeWidth={1.5} />
        </Button>

        <Button size="sm" radius="sm" iconOnly>
          <span className="sr-only">Restore this version</span>

          <Undo2 size={20} strokeWidth={1.5} />
        </Button>
      </nav>
    </aside>
  )
}
