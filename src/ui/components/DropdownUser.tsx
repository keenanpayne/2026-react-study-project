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
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'

export default function DropdownUser() {
  const closeCtx = useDropdownTriggerClose()
  const handleSelect = () => closeCtx?.close()

  return (
    <Dropdown align="right" className="w-50">
      <DropdownList>
        <DropdownItem
          size="md"
          title="Settings"
          onSelect={handleSelect}
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
          onSelect={handleSelect}
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
          onSelect={handleSelect}
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
          onSelect={handleSelect}
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
          onSelect={handleSelect}
          icon={
            <LogOut
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}
