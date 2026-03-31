import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import { TriangleAlert } from 'lucide-react'
import { DROPDOWN_ICON_SIZE, DROPDOWN_ICON_STROKE_WIDTH } from './Dropdown'

export default function DropdownChat() {
  return (
    <Dropdown align="right" className="min-w-35">
      <DropdownList>
        <DropdownItem
          size="sm"
          title="Report issue"
          icon={
            <TriangleAlert
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}
