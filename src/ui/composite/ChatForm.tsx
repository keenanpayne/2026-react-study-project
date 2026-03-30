import { Plus, ChevronsUpDown, MousePointerClick, Lightbulb, ArrowUp } from "lucide-react";
import Button from "../base/Button";

export default function ChatForm() {
  return (
    <form className="sticky bottom-0 bg-white dark:bg-zinc-900 px-5 pb-3">
      <aside className="mx-1.75 px-2 py-1.5 flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between text-xs bg-white dark:bg-zinc-800 border-t border-l border-r border-gray-200 dark:border-zinc-600 rounded-t-lg">
        <span>300k daily tokens remaining.</span>

        <Button size="flat" className="text-blue-500 dark:text-blue-400 hover:underline">
          Switch to Pro for 33x more usage
        </Button>
      </aside>

      <div className="w-full px-3 pt-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600">
        <label htmlFor="command" className="sr-only">Command</label>
        <textarea id="command" placeholder="How can Bolt help you today? (or /command)" className="w-full px-1.5 py-2 h-20 text-sm resize-none" />

        <nav className="flex items-center justify-between gap-3 py-1.5">
          <div className="flex items-center gap-3">
            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Upload</span>
              <Plus size={28} className="bg-gray-200 dark:bg-zinc-700 group-hover/button:bg-gray-300 dark:group-hover/button:bg-zinc-600 rounded-full p-1.25 transition-colors" />
            </Button>

            <Button size="sm" rounded="xl" className="shrink-0">
              <span className="text-gray-700 dark:text-zinc-200 text-xs">Sonnet 4.5</span>
              <ChevronsUpDown size={14} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" rounded="xl" className="shrink-0">
              <MousePointerClick size={18} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
              <span className="text-gray-700 dark:text-zinc-200 text-xs">Select</span>
            </Button>

            <Button size="sm" rounded="xl" className="shrink-0">
              <Lightbulb size={18} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
              <span className="text-gray-700 dark:text-zinc-200 text-xs">Plan</span>
            </Button>

            <Button size="flat" className="group/button shrink-0">
              <span className="sr-only">Send Message</span>
              <ArrowUp size={28} className="bg-blue-300 group-hover/button:bg-blue-500 stroke-white rounded-full p-1.25 transition-colors" />
            </Button>
          </div>
        </nav>
      </div>
    </form>
  )
}