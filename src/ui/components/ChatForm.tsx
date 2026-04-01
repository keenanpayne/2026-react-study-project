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
    <form className="group/form bg-surface mb-3 shrink-0 px-4 pb-3 md:mb-0">
      <aside className="border-border-default bg-surface-raised mx-2 hidden flex-col justify-between gap-0.5 rounded-t-lg border-t border-r border-l px-2 py-1.5 text-xs group-focus-within/form:flex sm:flex sm:flex-row sm:gap-0">
        <span>{formatTokens(props.tokens)} daily tokens remaining.</span>

        <Button size="flat" className="text-accent hover:underline">
          Switch to Pro for 33x more usage
        </Button>
      </aside>

      <div className="border-border-strong bg-surface-raised relative w-full rounded-xl border px-3 py-3 shadow-md sm:pb-0 sm:shadow-sm sm:group-focus-within/form:pb-0">
        <label htmlFor="command" className="sr-only">
          Command
        </label>
        <textarea
          id="command"
          placeholder="How can Bolt help you today? (or /command)"
          className="w-full resize-none px-1.5 py-2 text-base group-focus-within/form:h-20 sm:h-20 sm:text-sm"
        />

        <nav className="hidden items-center justify-between gap-3 py-1.5 group-focus-within/form:flex sm:flex">
          <div className="flex items-center gap-3">
            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Upload</span>
              <Plus
                size={28}
                className="icon-circle bg-surface-emphasis group-hover/button:bg-hover-strong p-1.25"
              />
            </Button>

            <Button size="sm" radius="xl" className="shrink-0">
              <span className="text-text-secondary text-xs">Sonnet 4.5</span>
              <ChevronsUpDown
                size={14}
                strokeWidth={1}
                className="stroke-icon-default"
              />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" radius="xl" className="shrink-0">
              <MousePointerClick
                size={18}
                strokeWidth={1}
                className="stroke-icon-default"
              />
              <span className="text-text-secondary text-xs">Select</span>
            </Button>

            <Button size="sm" radius="xl" className="shrink-0">
              <Lightbulb
                size={18}
                strokeWidth={1}
                className="stroke-icon-default"
              />
              <span className="text-text-secondary text-xs">Plan</span>
            </Button>

            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Send Message</span>
              <ArrowUp
                size={28}
                className="icon-circle bg-accent-bg group-hover/button:bg-accent-bg-hover stroke-white p-1.25"
              />
            </Button>
          </div>
        </nav>
      </div>
    </form>
  )
}
