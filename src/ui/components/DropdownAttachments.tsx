import type { LucideIcon } from 'lucide-react'
import {
  CircleQuestionMark,
  Component,
  FilePlus,
  Frame,
  Library,
  Sparkles,
} from 'lucide-react'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
} from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'

const ATTACHMENT_ITEMS: { label: string; Icon: LucideIcon }[] = [
  { label: 'Attach file', Icon: FilePlus },
  { label: 'Import from Figma', Icon: Frame },
  { label: 'Open Prompt Library', Icon: Library },
  { label: 'Enhance Prompt', Icon: Sparkles },
  { label: 'Search Help Center', Icon: CircleQuestionMark },
  { label: 'Connectors', Icon: Component },
]

export default function DropdownAttachments() {
  const closeCtx = useDropdownTriggerClose()

  return (
    <Dropdown align="top" className="min-w-50">
      <DropdownList>
        {ATTACHMENT_ITEMS.map(({ label, Icon }) => (
          <DropdownItem
            key={label}
            size="sm"
            role="option"
            icon={
              <Icon
                size={DROPDOWN_ICON_SIZE}
                strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
                className="stroke-icon-default shrink-0"
                aria-hidden
              />
            }
            title={label}
            onSelect={() => closeCtx?.close()}
          />
        ))}
      </DropdownList>
    </Dropdown>
  )
}
