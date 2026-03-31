import { CircleEllipsis, ChevronDown, SquareTerminal, Eye } from "lucide-react"
import CodeString from "./CodeString"
import ChatAction from "./ChatAction"
import { MockChatActions } from "../../data/MockChat"

type ChatActionsProps = {
  count: number;
  actionsExpanded: boolean;
  actionOnClick: () => void;
}

const iconConfig = {
  size: 18,
  strokeWidth: 1,
  className: "stroke-gray-700 dark:stroke-zinc-300 group-hover/button:stroke-gray-900 dark:group-hover/button:stroke-zinc-200 transition-colors",
};

const iconMap = {
  terminal: <SquareTerminal {...iconConfig} />,
  read: <Eye {...iconConfig} />,
};

export default function ChatActions(props: ChatActionsProps) {
  return (
    <details className="group/details py-3" open={props.actionsExpanded}>
      <summary className="cursor-pointer flex items-center gap-2 mb-0">
        <span className="flex items-center flex-1 gap-2">
          <CircleEllipsis size={16} strokeWidth={1.5} /> {props.count} actions taken
        </span>

        <ChevronDown size={20} strokeWidth={1.5} className="group-open/details:rotate-180 transition-transform duration-300" />
      </summary>
      
      <ul className="space-y-3 pt-5">
        {MockChatActions.map((action) => (
          <ChatAction
            key={action.id}
            title={action.codeRef ? <>{action.title} <CodeString text={action.codeRef} /></> : action.title}
            icon={iconMap[action.iconType]}
            actionOnClick={props.actionOnClick}
            actionsExpanded={props.actionsExpanded}
          />
        ))}
      </ul>
    </details>   
  )
}
