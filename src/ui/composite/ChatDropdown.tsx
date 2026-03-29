import Dropdown from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";
import { TriangleAlert } from "lucide-react";

export default function ChatDropdown() {
  return (
  <Dropdown align="right" className="w-35">
    <ul>
      <DropdownItem size="sm" title="Report issue" icon={<TriangleAlert size={16} strokeWidth={1} />} />
    </ul>
  </Dropdown>
  );
}