import {
  Plus,
  ChevronsUpDown,
  MousePointerClick,
  Lightbulb,
  ArrowUp,
} from 'lucide-react'
import Button from './Button'

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) {
    const value = Math.round(tokens / 100000) / 10
    return `${value % 1 === 0 ? value.toFixed(0) : value}M`
  } else if (tokens >= 1000) {
    const value = Math.round(tokens / 100) / 10
    if (value >= 1000) {
      return `${(value / 1000) % 1 === 0 ? (value / 1000).toFixed(0) : value / 1000}M`
    }
    return `${value % 1 === 0 ? value.toFixed(0) : value}k`
  }
  return tokens.toString()
}

type ChatFormProps = {
  tokens: number
}

export default function ChatForm(props: ChatFormProps) {
  return (
    <form className="group/form sticky bottom-0 bg-white px-4 pb-3 dark:bg-zinc-900">
      <aside className="mx-2 hidden flex-col justify-between gap-0.5 rounded-t-lg border-t border-r border-l border-gray-300 bg-white px-2 py-1.5 text-xs group-focus-within/form:flex sm:flex sm:flex-row sm:gap-0 dark:border-zinc-700 dark:bg-zinc-800">
        <span>{formatTokens(props.tokens)} daily tokens remaining.</span>

        <Button
          size="flat"
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Switch to Pro for 33x more usage
        </Button>
      </aside>

      <div className="relative w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 shadow-md sm:pb-0 sm:shadow-sm sm:group-focus-within/form:pb-0 dark:border-zinc-600 dark:bg-zinc-800">
        <label htmlFor="command" className="sr-only">
          Command
        </label>
        <textarea
          id="command"
          placeholder="How can Bolt help you today? (or /command)"
          className="w-full resize-none px-1.5 py-2 text-sm group-focus-within/form:h-20 sm:h-20"
        />

        <nav className="hidden items-center justify-between gap-3 py-1.5 group-focus-within/form:flex sm:flex">
          <div className="flex items-center gap-3">
            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Upload</span>
              <Plus
                size={28}
                className="rounded-full bg-gray-200 p-1.25 transition-colors group-hover/button:bg-gray-300 dark:bg-zinc-700 dark:group-hover/button:bg-zinc-600"
              />
            </Button>

            <Button size="sm" radius="xl" className="shrink-0">
              <span className="text-xs text-gray-700 dark:text-zinc-200">
                Sonnet 4.5
              </span>
              <ChevronsUpDown
                size={14}
                strokeWidth={1}
                className="stroke-gray-600 dark:stroke-zinc-400"
              />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" radius="xl" className="shrink-0">
              <MousePointerClick
                size={18}
                strokeWidth={1}
                className="stroke-gray-600 dark:stroke-zinc-400"
              />
              <span className="text-xs text-gray-700 dark:text-zinc-200">
                Select
              </span>
            </Button>

            <Button size="sm" radius="xl" className="shrink-0">
              <Lightbulb
                size={18}
                strokeWidth={1}
                className="stroke-gray-600 dark:stroke-zinc-400"
              />
              <span className="text-xs text-gray-700 dark:text-zinc-200">
                Plan
              </span>
            </Button>

            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Send Message</span>
              <ArrowUp
                size={28}
                className="rounded-full bg-blue-300 stroke-white p-1.25 transition-colors group-hover/button:bg-blue-500 dark:bg-blue-400/35"
              />
            </Button>
          </div>
        </nav>
      </div>
    </form>
  )
}
