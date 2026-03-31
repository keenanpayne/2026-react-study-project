import type { ReactNode } from "react";
import { MessageSquare, Eye, Code, Database, Settings } from "lucide-react";
import DropdownTrigger from "./DropdownTrigger";
import DropdownSettings from "./DropdownSettings";
import DropdownUser from "./DropdownUser";
import Button from "../base/Button";

export type MobileView = "chat" | "preview" | "codebase" | "database";

type MobileNavigationProps = {
  activeView: MobileView;
  onViewChange: (view: MobileView) => void;
};

type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
} & (
  | { view: MobileView; dropdown?: never }
  | { dropdown: ReactNode; view?: never }
);

const ICON_SIZE = 20;
const ICON_STROKE_WIDTH = 1.5;

export default function MobileNavigation({ activeView, onViewChange }: MobileNavigationProps) {
  const navItems: NavItem[] = [
    { id: "chat", label: "Chat", view: "chat", icon: <MessageSquare size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /> },
    { id: "preview", label: "Preview", view: "preview", icon: <Eye size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /> },
    { id: "codebase", label: "Code", view: "codebase", icon: <Code size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /> },
    { id: "database", label: "Database", view: "database", icon: <Database size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /> },
    { id: "settings", label: "Settings", dropdown: <DropdownSettings align="right" />, icon: <Settings size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} /> },
    { id: "user", label: "Profile", dropdown: <DropdownUser />, icon: <img src="/me.jpg" alt="User avatar" className="w-5 h-5 rounded-full" /> },
  ];

  const baseClass = "flex flex-col items-center gap-1 text-xs transition-colors";
  const activeClass = "text-sky-600 dark:text-sky-400";
  const inactiveClass = "text-gray-500 dark:text-gray-400";
  const labelClass = "h-0 xs:h-auto opacity-0 xs:opacity-100";

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-evenly bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 px-1.5 sm:px-3 py-3 md:hidden">
      {navItems.map((item) => {
        if (item.dropdown) {
          return (
            <div key={item.id} className="**:[[tabindex='0']]:bottom-14 **:[[tabindex='0']]:top-auto">
              <DropdownTrigger
                size="flat"
                variant="plain"
                className={`${baseClass} ${inactiveClass}`}
                dropdown={item.dropdown}
              >
                {item.icon}
                <span className={labelClass}>{item.label}</span>
              </DropdownTrigger>
            </div>
          );
        }

        if (!item.view) return null;

        const isActive = activeView === item.view;

        return (
          <Button
            key={item.id}
            onClick={() => onViewChange(item.view)}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            variant="plain"
            size="flat"
          >
            {item.icon}
            <span className={labelClass}>{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}
