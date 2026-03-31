import { BadgeCheck, ChartColumnIncreasing, CircleDollarSign, Component, Database, Key, Lightbulb, Settings, SquareFunction } from "lucide-react";
import Dropdown, { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from "./Dropdown";
import DropdownItem from "./DropdownItem";
import DropdownSeparator from "./DropdownSeparator";
import DropdownLabel from "./DropdownLabel";

type DropdownSettingsProps = {
  align?: "left" | "right";
};

export default function DropdownSettings({ align = "left" }: DropdownSettingsProps) {
  return (
    <Dropdown align={align} className="w-55">
      <DropdownItem size="md" title="Analytics" icon={<ChartColumnIncreasing size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownItem size="md" title="Authentication" icon={<BadgeCheck size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownItem size="md" title="Knowledge" icon={<Lightbulb size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownItem size="md" title="Server Functions" icon={<SquareFunction size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownItem size="md" title="Secrets" icon={<Key size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownItem size="md" title="Connectors" icon={<Component size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownSeparator />
      <DropdownItem size="md" title="All project settings" icon={<Settings size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownSeparator />
      <DropdownLabel label="Integrations" />
      <DropdownItem size="md" title="Stripe" append="Add payments to your project" icon={<CircleDollarSign size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      <DropdownItem size="md" title="Bolt Database" append="Manage database settings" icon={<Database size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
    </Dropdown>
  );
}