import { CircleQuestionMark, CreditCard, LogOut, Palette, Settings } from "lucide-react";
import Dropdown, { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";
import DropdownSeparator from "../base/DropdownSeparator";

export default function DropdownUser() {
  return (
    <Dropdown align="right" className="w-50">
      <ul> 
        <DropdownItem size="md" title="Settings" icon={<Settings size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Help" icon={<CircleQuestionMark size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownSeparator />
        <DropdownItem size="md" title="Subscription" icon={<CreditCard size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Theme" icon={<Palette size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownSeparator />
        <DropdownItem size="md" title="Sign out" icon={<LogOut size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      </ul>
    </Dropdown>
  );
}