import {
  BadgeCheck,
  ChartColumnIncreasing,
  CircleDollarSign,
  Component,
  Database,
  Key,
  Lightbulb,
  Settings,
  SquareFunction,
} from 'lucide-react'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
} from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownLabel from './DropdownLabel'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'

type DropdownSettingsProps = {
  align?: 'left' | 'right'
}

export default function DropdownSettings({
  align = 'left',
}: DropdownSettingsProps) {
  const closeCtx = useDropdownTriggerClose()
  const handleSelect = () => closeCtx?.close()

  return (
    <Dropdown align={align} className="w-55">
      <DropdownList>
        <DropdownItem
          size="md"
          title="Analytics"
          onSelect={handleSelect}
          icon={
            <ChartColumnIncreasing
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Authentication"
          onSelect={handleSelect}
          icon={
            <BadgeCheck
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Knowledge"
          onSelect={handleSelect}
          icon={
            <Lightbulb
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Server Functions"
          onSelect={handleSelect}
          icon={
            <SquareFunction
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Secrets"
          onSelect={handleSelect}
          icon={
            <Key
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Connectors"
          onSelect={handleSelect}
          icon={
            <Component
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownSeparator />
        <DropdownItem
          size="md"
          title="All project settings"
          onSelect={handleSelect}
          icon={
            <Settings
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownSeparator />
        <DropdownLabel label="Integrations" />
        <DropdownItem
          size="md"
          title="Stripe"
          append="Add payments to your project"
          onSelect={handleSelect}
          icon={
            <CircleDollarSign
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Bolt Database"
          append="Manage database settings"
          onSelect={handleSelect}
          icon={
            <Database
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}
