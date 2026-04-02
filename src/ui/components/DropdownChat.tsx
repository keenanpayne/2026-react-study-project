import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import { TriangleAlert } from 'lucide-react'
import { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from './Dropdown'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'

export default function DropdownChat() {
  const closeCtx = useDropdownTriggerClose()

  return (
    <Dropdown align="right" className="min-w-32">
      <DropdownList>
        <DropdownItem
          size="sm"
          title="Report issue"
          onSelect={() => closeCtx?.close()}
          icon={
            <TriangleAlert
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}
