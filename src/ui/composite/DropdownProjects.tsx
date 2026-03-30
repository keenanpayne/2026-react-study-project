import { Copy, Download, Earth, Eye, EyeOff, FileArchive, Folders, History, PencilLine, Trash, Zap, Lock, Search } from "lucide-react";
import Dropdown, { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from "../base/Dropdown";
import DropdownItem from "../base/DropdownItem";
import DropdownLabel from "../base/DropdownLabel";

function DropdownRecentProjects() {
  return (
    <Dropdown className="w-65" nested>
      <ul>
        <div className="flex items-center gap-2 px-3">
          <Search size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />
          <input type="search" placeholder="Search projects" className="bg-transparent border-0 w-full py-2" />
        </div>

        <DropdownLabel label="Last 30 Days" />
        <DropdownItem size="md" prepend="Active Project" title="Multi-Platform Social Scheduler" className="bg-sky-100 dark:bg-sky-800/50" />
        <DropdownLabel label="May 2025" />
        <DropdownItem size="md" title="Learning Management Platform" />
        <DropdownLabel label="April 2025" />
        <DropdownItem size="md" title="Inspiration Gallery" />
      </ul>
    </Dropdown>
  )
}

function DropdownExport() {
  return (
    <Dropdown className="w-50" nested>
      <ul> 
        <DropdownItem size="md" title="Download" icon={<FileArchive size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Open in StackBlitz" icon={<Zap size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      </ul>
    </Dropdown>
  )
}

function DownloadVisibility() {
  return (
    <Dropdown className="w-52" nested>
      <ul> 
        <DropdownItem size="md" title="Public" append="Everyone can view" icon={<Earth size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Secret" append="Accessible via shared URL" icon={<EyeOff size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Private" append="Only owner can access" icon={<Lock size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      </ul>
    </Dropdown>
  )
}

export default function DropdownProjects() {
  return (
    <Dropdown align="left" className="w-60">
      <ul> 
        <DropdownItem size="md" title="Open recent project" icon={<Folders size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} dropdown={<DropdownRecentProjects />} />
        <DropdownItem size="md" title="Version history" icon={<History size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Rename..." icon={<PencilLine size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Duplicate" icon={<Copy size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
        <DropdownItem size="md" title="Export" icon={<Download size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} dropdown={<DropdownExport />} />
        <DropdownItem size="md" title="Visibility" icon={<Eye size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} dropdown={<DownloadVisibility />} />
        <DropdownItem size="md" title="Delete" icon={<Trash size={DROPDOWN_ICON_SIZE} strokeWidth={DROPDOWN_ICON_STROKE_WIDTH} />} />
      </ul>
    </Dropdown>
  );
}