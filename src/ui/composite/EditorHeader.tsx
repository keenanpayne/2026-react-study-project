import { Eye, Code, Database, Settings, RotateCw, ExternalLink, MonitorSmartphone, Scan } from "lucide-react";
import Button from "../base/Button";
import DropdownSettings from "./DropdownSettings";
import DropdownUser from "./DropdownUser";

type EditorHeaderProps = {
  isEditorOutputVisible: boolean;
  setIsEditorOutputVisible: (visible: boolean) => void;
  isEditorCodebaseVisible: boolean;
  setIsEditorCodebaseVisible: (visible: boolean) => void;
  isEditorDatabaseVisible: boolean;
  setIsEditorDatabaseVisible: (visible: boolean) => void;
}

export default function EditorHeader(props: EditorHeaderProps) {
  function handleEditorOutputClick() {
    props.setIsEditorOutputVisible(true);
    props.setIsEditorCodebaseVisible(false);
    props.setIsEditorDatabaseVisible(false);
  }

  function handleEditorCodebaseClick() {
    props.setIsEditorOutputVisible(false);
    props.setIsEditorCodebaseVisible(true);
    props.setIsEditorDatabaseVisible(false);
  }

  function handleEditorDatabaseClick() {
    props.setIsEditorOutputVisible(false);
    props.setIsEditorCodebaseVisible(false);
    props.setIsEditorDatabaseVisible(true);
  }

  const activeButtonClass = "group/button rounded-[10px] p-1.5 bg-sky-200/50 dark:bg-sky-900/75 hover:bg-sky-200/50 dark:hover:bg-sky-900/75 transition-colors";
  const inactiveButtonClass = "group/button rounded-[10px] p-1.5";
  const activeButtonIconClass = "stroke-sky-700 dark:stroke-sky-100 group-hover/button:stroke-sky-700 dark:group-hover/button:stroke-sky-100 transition-colors";
  const inactiveButtonIconClass = "stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors";

  return (
    <header className="py-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <nav className="flex shrink-0 items-center space-between gap-1.5 border border-gray-200 dark:border-gray-800 rounded-xl w-auto px-0.5 py-1.5 h-8">
          <Button size="sm" className={props.isEditorOutputVisible ? activeButtonClass : inactiveButtonClass} onClick={handleEditorOutputClick}>
            <Eye size={15} strokeWidth={1.5} className={props.isEditorOutputVisible ? activeButtonIconClass : inactiveButtonIconClass} />
          </Button>

          <Button size="sm" className={props.isEditorCodebaseVisible ? activeButtonClass : inactiveButtonClass} onClick={handleEditorCodebaseClick}>
            <Code size={15} strokeWidth={1.5} className={props.isEditorCodebaseVisible ? activeButtonIconClass : inactiveButtonIconClass} />
          </Button>

          <Button size="sm" className={props.isEditorDatabaseVisible ? activeButtonClass : inactiveButtonClass} onClick={handleEditorDatabaseClick}>
            <Database size={15} strokeWidth={1.5} className={props.isEditorDatabaseVisible ? activeButtonIconClass : inactiveButtonIconClass} />
          </Button>
        </nav>

        <Button size="md" rounded="md" className="group/button" openChildren={<DropdownSettings />}>
          <Settings size={16} strokeWidth={1.5} className="stroke-gray-400 fill-gray-200 dark:fill-transparent group-hover/button:fill-gray-300 dark:group-hover/button:fill-gray-900 group-hover/button:stroke-gray-800 dark:group-hover/button:stroke-gray-300 transition-colors" />
        </Button>

        <div className="flex flex-1 items-center rounded-full px-3 border border-gray-300 dark:border-neutral-900 bg-gray-100 dark:bg-zinc-800 h-8 md:max-w-md ml-auto mr-auto">
          <label htmlFor="url" className="sr-only">Page URL</label>
          <input id="url" type="text" value="/" className="flex-1 text-sm text-gray-800 dark:text-gray-300 mx-1 px-1" onChange={() => null} />

          <nav className="justify-end flex items-center">
            <Button size="sm" rounded="sm" className="group/button p-1.5">
              <RotateCw size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>

            <Button size="sm" rounded="sm" className="group/button p-1.5">
              <ExternalLink size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>

            <Button size="sm" rounded="sm" className="group/button p-1.5">
              <MonitorSmartphone size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>

            <Button size="sm" rounded="sm" className="group/button p-1.5">
              <Scan size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>
          </nav>
        </div>

        <div className="shrink-0 flex items-center gap-3 ml-auto">
          <Button size="md" rounded="md" className="shrink-0">
            <img src="/github.svg" className="h-5 w-5 dark:invert-100" />
          </Button>

          <Button size="md" rounded="md" className="shrink-0 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 hover:dark:bg-zinc-600">
            Share
          </Button>

          <Button size="md" rounded="md" className="shrink-0 bg-gray-900 dark:bg-zinc-100 hover:bg-gray-700 hover:dark:bg-zinc-300 text-white dark:text-black">
            Publish
          </Button>

          <Button size="md" rounded="md" className="shrink-0" openChildren={<DropdownUser />}>
            <img src="/me.jpg" className="w-6 h-6 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  )
}