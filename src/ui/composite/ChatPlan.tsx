import { Bookmark, Eye, Undo2 } from "lucide-react";
import Button from "../base/Button";

export default function ChatPlan() {
  return (
    <aside className="flex justify-between border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2.5 md:max-w-[80%] my-3">
      <header className="flex flex-col gap-0.5">
        <h3 className="font-semibold">Create Social Scheduler Plan</h3>
        <p className="text-xs text-gray-500 dark:text-zinc-400">Version 1 at <time dateTime="2026-03-29T13:36:00">Mar 29 1:36 PM</time></p>
      </header>

      <nav className="flex items-center gap-0.5">
        <Button size="sm" rounded="sm">
          <Bookmark size={20} strokeWidth={1.5} className="stroke-blue-400 fill-blue-400" />
        </Button>
        
        <Button size="sm" rounded="sm">
          <Eye size={20} strokeWidth={1.5} />
        </Button>

        <Button size="sm" rounded="sm">
          <Undo2 size={20} strokeWidth={1.5} />
        </Button>
      </nav>
    </aside>
  )
}