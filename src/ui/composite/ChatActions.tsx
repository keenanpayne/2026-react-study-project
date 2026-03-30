import { CircleEllipsis, ChevronDown, SquareTerminal, Eye } from "lucide-react"
import CodeString from "../base/CodeString"
import ChatAction from "./ChatAction"

type ChatActionsProps = {
  count: number;
  actionsExpanded: boolean;
  actionOnClick: () => void;
}

export default function ChatActions(props: ChatActionsProps) {
  const iconSize = 18;
  const iconStrokeWidth = 1;
  const iconClass = "stroke-gray-700 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-200 transition-colors";
  
  return (
    <details className="group/details py-3" open={props.actionsExpanded}>
      <summary className="cursor-pointer flex items-center gap-2 mb-0">
        <span className="flex items-center flex-1 gap-2">
          <CircleEllipsis size={16} strokeWidth={1.5} /> {props.count} actions taken
        </span>

        <ChevronDown size={20} strokeWidth={1.5} className="group-open/details:rotate-180 transition-transform duration-300" />
      </summary>
      
      <ul className="space-y-3 pt-5">
        <ChatAction key={1} title="Get current working directory" icon={<SquareTerminal size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={2} title="Listed files in project root" icon={<SquareTerminal size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={3} title="Read" icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={4} title={<>Read <CodeString text="package.json" /></>} icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={5} title="Listed source directory contents" icon={<SquareTerminal size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={6} title={<>Read <CodeString text="src/App.tsx" /></>} icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={7} title={<>Read <CodeString text="src/main.tsx" /></>} icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
        <ChatAction key={8} title={<>Read <CodeString text="src/index.css" /></>} icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />} actionOnClick={props.actionOnClick} actionsExpanded={props.actionsExpanded} />
      </ul>
    </details>   
  )
}