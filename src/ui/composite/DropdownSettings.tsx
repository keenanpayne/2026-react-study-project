import { BadgeCheck, ChartColumnIncreasing, Component, Key, Lightbulb, SquareFunction } from "lucide-react";
import Dropdown from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";

export default function DropdownSettings() {
  const iconSize = 16;
  const iconStrokeWidth = 1;

  return (
    <Dropdown align="left" className="w-55">
      <ul> 
        <DropdownItem size="md" className="text-sm" title="Analytics" icon={<ChartColumnIncreasing size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Authentication" icon={<BadgeCheck size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Knowledge" icon={<Lightbulb size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Server Functions" icon={<SquareFunction size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Secrets" icon={<Key size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Connectors" icon={<Component size={iconSize} strokeWidth={iconStrokeWidth} />} />
      </ul>
    </Dropdown>
  );
}