import { BadgeCheck, ChartColumnIncreasing, CircleDollarSign, Component, Database, Key, Lightbulb, Settings, SquareFunction } from "lucide-react";
import Dropdown, { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";

export default function DropdownSettings() {
  return (
    <Dropdown align="left" className="w-55">
      <ul> 
        <DropdownItem size="md" title="Analytics" icon={<ChartColumnIncreasing size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Authentication" icon={<BadgeCheck size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Knowledge" icon={<Lightbulb size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Server Functions" icon={<SquareFunction size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Secrets" icon={<Key size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Connectors" icon={<Component size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <hr className="border-gray-200 dark:border-zinc-700" />
        <DropdownItem size="md" title="All project settings" icon={<Settings size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <hr className="border-gray-200 dark:border-zinc-700" />
        <li className="cursor-default px-3 mt-2 text-gray-500 dark:text-zinc-300 text-xs">Integrations</li>
        <DropdownItem size="md" title="Stripe" append="Add payments to your project" icon={<CircleDollarSign size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Bolt Database" append="Manage database settings" icon={<Database size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      </ul>
    </Dropdown>
  );
}