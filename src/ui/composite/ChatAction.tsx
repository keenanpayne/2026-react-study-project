import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Button from "../base/Button";

type ChatActionProps = {
  title: string | ReactNode;
  icon: ReactNode;
  actionOnClick: () => void;
  actionsExpanded: boolean;
}

export default function ChatAction(props: ChatActionProps) {
  return (
  <li>
    <Button size="flat" className="group/button cursor-pointer flex items-center justify-between gap-2 w-full" onClick={props.actionOnClick}>
      <span className="flex-1 flex items-center gap-2 text-gray-700 group-hover/button:text-gray-900 transition-colors">
        {props.icon}
        {props.title}
      </span>

      <span className={`flex items-center gap-1 text-blue-400 opacity-0 transition-opacity text-xs ${props.actionsExpanded ? '' : 'group-hover/button:opacity-100'}`}>
        Open
        <ChevronRight size={14} strokeWidth={1.5} />
      </span>
    </Button>
  </li>
  );
}