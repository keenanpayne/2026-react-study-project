import { Plus, ChevronsUpDown, MousePointerClick, Lightbulb, ArrowUp } from "lucide-react";
import Button from "./Button";

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) {
    const value = Math.round(tokens / 100000) / 10;
    return `${value % 1 === 0 ? value.toFixed(0) : value}M`;
  } else if (tokens >= 1000) {
    const value = Math.round(tokens / 100) / 10;
    if (value >= 1000) {
      return `${(value / 1000) % 1 === 0 ? (value / 1000).toFixed(0) : (value / 1000)}M`;
    }
    return `${value % 1 === 0 ? value.toFixed(0) : value}k`;
  }
  return tokens.toString();
}

type ChatFormProps = {
  tokens: number;
}

export default function ChatForm(props: ChatFormProps) {
  return (
    <form className="group/form sticky bottom-0 bg-white dark:bg-zinc-900 px-4 pb-3">
      <aside className="mx-2 px-2 py-1.5 hidden group-focus-within/form:flex sm:flex flex-col sm:flex-row gap-0.5 sm:gap-0 justify-between text-xs bg-white dark:bg-zinc-800 border-t border-l border-r border-gray-300 dark:border-zinc-700 rounded-t-lg">
        <span>{formatTokens(props.tokens)} daily tokens remaining.</span>

        <Button size="flat" className="text-blue-500 dark:text-blue-400 hover:underline">
          Switch to Pro for 33x more usage
        </Button>
      </aside>

      <div className="relative w-full px-3 py-3 sm:pb-0 sm:group-focus-within/form:pb-0 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 shadow-md sm:shadow-sm">
        <label htmlFor="command" className="sr-only">Command</label>
        <textarea id="command" placeholder="How can Bolt help you today? (or /command)" className="w-full px-1.5 py-2 sm:h-20 group-focus-within/form:h-20 text-sm resize-none" />

        <nav className="hidden group-focus-within/form:flex sm:flex items-center justify-between gap-3 py-1.5">
          <div className="flex items-center gap-3">
            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Upload</span>
              <Plus size={28} className="bg-gray-200 dark:bg-zinc-700 group-hover/button:bg-gray-300 dark:group-hover/button:bg-zinc-600 rounded-full p-1.25 transition-colors" />
            </Button>

            <Button size="sm" radius="xl" className="shrink-0">
              <span className="text-gray-700 dark:text-zinc-200 text-xs">Sonnet 4.5</span>
              <ChevronsUpDown size={14} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" radius="xl" className="shrink-0">
              <MousePointerClick size={18} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
              <span className="text-gray-700 dark:text-zinc-200 text-xs">Select</span>
            </Button>

            <Button size="sm" radius="xl" className="shrink-0">
              <Lightbulb size={18} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
              <span className="text-gray-700 dark:text-zinc-200 text-xs">Plan</span>
            </Button>

            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Send Message</span>
              <ArrowUp size={28} className="bg-blue-300 dark:bg-blue-400/35 group-hover/button:bg-blue-500 stroke-white rounded-full p-1.25 transition-colors" />
            </Button>
          </div>
        </nav>
      </div>
    </form>
  )
}