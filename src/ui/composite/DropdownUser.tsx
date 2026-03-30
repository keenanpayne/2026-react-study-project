import { CircleQuestionMark, CreditCard, LogOut, Palette, Settings } from "lucide-react";
import Dropdown from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";

export default function DropdownUser() {
  const iconSize = 16;
  const iconStrokeWidth = 1;

  return (
    <Dropdown align="right" className="w-55">
      <ul> 
        <DropdownItem size="md" className="text-sm" title="Settings" icon={<Settings size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Help" icon={<CircleQuestionMark size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Subscription" icon={<CreditCard size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Theme" icon={<Palette size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Sign out" icon={<LogOut size={iconSize} strokeWidth={iconStrokeWidth} />} />
      </ul>
    </Dropdown>
  );
}