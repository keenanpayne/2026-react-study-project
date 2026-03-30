import { Eye, Code, Database, Settings, RotateCw, ExternalLink, MonitorSmartphone, Scan } from "lucide-react";
import Button from "../base/Button";
import DropdownSettings from "./DropdownSettings";
import DropdownUser from "./DropdownUser";
import DropdownTrigger from "./DropdownTrigger";

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

  const toggleButtonClass = "group/button rounded-[10px] p-1.5";
  const activeIconClass = "stroke-sky-700 dark:stroke-sky-100 group-hover/button:stroke-sky-700 dark:group-hover/button:stroke-sky-100 transition-colors";
  const inactiveIconClass = "stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors";

  return (
    <header className="py-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <nav className="flex shrink-0 items-center space-between gap-1 border border-gray-200 dark:border-gray-800 rounded-xl w-auto px-0.5 py-1.5 h-8">
          <Button size="sm" variant={props.isEditorOutputVisible ? "selected" : "ghost"} className={toggleButtonClass} onClick={handleEditorOutputClick}>
            <Eye size={15} strokeWidth={1.5} className={props.isEditorOutputVisible ? activeIconClass : inactiveIconClass} />
          </Button>

          <Button size="sm" variant={props.isEditorCodebaseVisible ? "selected" : "ghost"} className={toggleButtonClass} onClick={handleEditorCodebaseClick}>
            <Code size={15} strokeWidth={1.5} className={props.isEditorCodebaseVisible ? activeIconClass : inactiveIconClass} />
          </Button>

          <Button size="sm" variant={props.isEditorDatabaseVisible ? "selected" : "ghost"} className={toggleButtonClass} onClick={handleEditorDatabaseClick}>
            <Database size={15} strokeWidth={1.5} className={props.isEditorDatabaseVisible ? activeIconClass : inactiveIconClass} />
          </Button>
        </nav>

        <DropdownTrigger size="md" radius="md" className="group/button" dropdown={<DropdownSettings />}>
          <Settings size={16} strokeWidth={1.5} className="stroke-gray-400 fill-gray-200 dark:fill-transparent group-hover/button:fill-gray-300 dark:group-hover/button:fill-gray-900 group-hover/button:stroke-gray-800 dark:group-hover/button:stroke-gray-300 transition-colors" />
        </DropdownTrigger>

        <div className="flex flex-1 items-center rounded-full px-3 border border-gray-300 dark:border-neutral-900 bg-gray-100 dark:bg-zinc-800 h-8 md:max-w-md ml-auto mr-auto">
          <label htmlFor="url" className="sr-only">Page URL</label>
          <input id="url" type="text" value="/" className="flex-1 text-sm text-gray-800 dark:text-gray-300 mx-1 px-1" onChange={() => null} />

          <nav className="justify-end flex items-center">
            <Button size="sm" radius="sm" className="group/button p-1.5">
              <RotateCw size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>

            <Button size="sm" radius="sm" className="group/button p-1.5">
              <ExternalLink size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>

            <Button size="sm" radius="sm" className="group/button p-1.5">
              <MonitorSmartphone size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>

            <Button size="sm" radius="sm" className="group/button p-1.5">
              <Scan size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-300 transition-colors" />
            </Button>
          </nav>
        </div>

        <div className="shrink-0 flex items-center gap-3 ml-auto">
          <Button size="md" radius="md" className="shrink-0" iconOnly>
            <img src="/github.svg" className="h-5 w-5 dark:invert-100" />
          </Button>

          <Button size="md" radius="md" variant="subtle" className="shrink-0">
            Share
          </Button>

          <Button size="md" radius="md" variant="primary" className="shrink-0">
            Publish
          </Button>

          <DropdownTrigger
            size="md"
            radius="md"
            className="shrink-0"
            wrapperClassName="shrink-0"
            dropdown={<DropdownUser />}
          >
            <img src="/me.jpg" className="w-6 h-6 rounded-full" />
          </DropdownTrigger>
        </div>
      </div>
    </header>
  )
}