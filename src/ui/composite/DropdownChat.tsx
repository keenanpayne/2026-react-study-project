import Dropdown from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";
import { TriangleAlert } from "lucide-react";
import { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from "../base/Dropdown";

export default function DropdownChat() {
  return (
    <Dropdown align="right" className="min-w-35">
      <DropdownItem size="sm" title="Report issue" icon={<TriangleAlert size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
    </Dropdown>
  );
}