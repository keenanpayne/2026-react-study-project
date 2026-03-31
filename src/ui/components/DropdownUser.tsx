import {
  CircleQuestionMark,
  CreditCard,
  LogOut,
  Palette,
  Settings,
} from 'lucide-react'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
} from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownSeparator from './DropdownSeparator'

export default function DropdownUser() {
  return (
    <Dropdown align="right" className="w-50">
      <DropdownItem
        size="md"
        title="Settings"
        icon={
          <Settings
            size={DROPDOWN_ICON_SIZE}
            strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
          />
        }
      />
      <DropdownItem
        size="md"
        title="Help"
        icon={
          <CircleQuestionMark
            size={DROPDOWN_ICON_SIZE}
            strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
          />
        }
      />
      <DropdownSeparator />
      <DropdownItem
        size="md"
        title="Subscription"
        icon={
          <CreditCard
            size={DROPDOWN_ICON_SIZE}
            strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
          />
        }
      />
      <DropdownItem
        size="md"
        title="Theme"
        icon={
          <Palette
            size={DROPDOWN_ICON_SIZE}
            strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
          />
        }
      />
      <DropdownSeparator />
      <DropdownItem
        size="md"
        title="Sign out"
        icon={
          <LogOut
            size={DROPDOWN_ICON_SIZE}
            strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
          />
        }
      />
    </Dropdown>
  )
}
