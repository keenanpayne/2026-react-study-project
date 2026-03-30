import { Copy, Download, Eye, Folders, History, PencilLine, Trash } from "lucide-react";
import Dropdown from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";


function DropdownRecentProjects() {
  const iconSize = 16;
  const iconStrokeWidth = 1;

  return (
    <Dropdown className="w-60 left-[105%] -top-1">
      <ul> 
        <DropdownItem size="md" className="text-sm" title="Open recent project" icon={<Folders size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Version history" icon={<History size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Rename..." icon={<PencilLine size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Duplicate" icon={<Copy size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Export" icon={<Download size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Visibility" icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Delete" icon={<Trash size={iconSize} strokeWidth={iconStrokeWidth} />} />
      </ul>
    </Dropdown>
  )
}

export default function DropdownProjects() {
  const iconSize = 16;
  const iconStrokeWidth = 1;

  return (
    <Dropdown align="left" className="w-60">
      <ul> 
        <DropdownItem size="md" className="text-sm relative" title="Open recent project" icon={<Folders size={iconSize} strokeWidth={iconStrokeWidth} />} dropdown={<DropdownRecentProjects />} />
        <DropdownItem size="md" className="text-sm" title="Version history" icon={<History size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Rename..." icon={<PencilLine size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Duplicate" icon={<Copy size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Export" icon={<Download size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Visibility" icon={<Eye size={iconSize} strokeWidth={iconStrokeWidth} />} />
        <DropdownItem size="md" className="text-sm" title="Delete" icon={<Trash size={iconSize} strokeWidth={iconStrokeWidth} />} />
      </ul>
    </Dropdown>
  );
}