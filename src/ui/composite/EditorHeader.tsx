import { Eye, Code, Database, Settings, RotateCw, ExternalLink, MonitorSmartphone, Scan } from "lucide-react";
import Button from "../base/Button";

export default function EditorHeader() {
  return (
    <header className="py-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <nav className="flex shrink-0 items-center space-between gap-0.5 border border-gray-200 dark:border-gray-800 rounded-lg w-auto px-0.5 py-1.5 h-8">
          <Button size="sm" className="group/button cursor-pointer p-1.5 bg-blue-100">
            <Eye size={15} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-100 group-hover:stroke-gray-900 dark:group-hover:stroke-zinc-800 transition-colors" />
          </Button>

          <Button size="sm" className="group/button cursor-pointer p-1.5">
            <Code size={15} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
          </Button>

          <Button size="sm" className="group/button cursor-pointer p-1.5">
            <Database size={15} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
          </Button>
        </nav>

        <Button size="sm" className="group/button px-1 py-1 cursor-pointer">
          <Settings size={16} strokeWidth={1.5} className="stroke-gray-400 fill-gray-200 dark:fill-transparent hover:fill-gray-300 dark:hover:fill-gray-900 hover:stroke-gray-800 dark:hover:stroke-gray-300 transition-colors" />
        </Button>

        <div className="flex flex-1 items-center rounded-full px-3 border border-gray-300 dark:border-neutral-900 bg-gray-50 dark:bg-zinc-800 h-8 max-w-2xl">
          <label htmlFor="url" className="sr-only">Page URL</label>
          <input id="url" type="text" value="/" className="flex-1 text-sm text-gray-800 dark:text-gray-300 mx-1 px-1" onChange={() => null} />

          <nav className="justify-end flex items-center">
            <Button size="sm" className="group/button cursor-pointer p-1.5">
              <RotateCw size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
            </Button>

            <Button size="sm" className="group/button cursor-pointer p-1.5">
              <ExternalLink size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
            </Button>

            <Button size="sm" className="group/button cursor-pointer p-1.5">
              <MonitorSmartphone size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
            </Button>

            <Button size="sm" className="group/button cursor-pointer p-1.5">
              <Scan size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
            </Button>
          </nav>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 ml-auto">
          <Button size="md" className="shrink-0">
            <img src="/github.svg" className="h-5 w-5 dark:invert-100" />
          </Button>

          <Button size="md" className="shrink-0 bg-gray-200 hover:bg-gray-300">
            Share
          </Button>

          <Button size="md" className="shrink-0 bg-gray-900 hover:bg-gray-700 text-white">
            Publish
          </Button>

          <Button size="md" className="shrink-0">
            <img src="/me.jpg" className="w-6 h-6 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  )
}