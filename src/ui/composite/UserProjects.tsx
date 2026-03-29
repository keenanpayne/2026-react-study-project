import { Copy, Download, Eye, Folders, History, PencilLine, Trash } from "lucide-react";
import Dropdown from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";

export default function UserProjects() {
  return (
  <Dropdown align="left" className="w-55">
    <ul> 
      <DropdownItem size="md" className="text-sm" title="Open recent project" icon={<Folders size={16} strokeWidth={1} />} />
      <DropdownItem size="md" className="text-sm" title="Version history" icon={<History size={16} strokeWidth={1} />} />
      <DropdownItem size="md" className="text-sm" title="Rename..." icon={<PencilLine size={16} strokeWidth={1} />} />
      <DropdownItem size="md" className="text-sm" title="Duplicate" icon={<Copy size={16} strokeWidth={1} />} />
      <DropdownItem size="md" className="text-sm" title="Export" icon={<Download size={16} strokeWidth={1} />} />
      <DropdownItem size="md" className="text-sm" title="Visibility" icon={<Eye size={16} strokeWidth={1} />} />
      <DropdownItem size="md" className="text-sm" title="Delete" icon={<Trash size={16} strokeWidth={1} />} />
    </ul>
  </Dropdown>
  );
}