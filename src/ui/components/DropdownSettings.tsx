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
  type LucideIcon,
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

type SettingsEntry =
  | {
      kind: 'item'
      id: string
      title: string
      icon: LucideIcon
      append?: string
    }
  | { kind: 'separator'; id: string }
  | { kind: 'label'; id: string; label: string }

const SETTINGS_ENTRIES = [
  {
    kind: 'item',
    id: 'analytics',
    title: 'Analytics',
    icon: ChartColumnIncreasing,
  },
  {
    kind: 'item',
    id: 'authentication',
    title: 'Authentication',
    icon: BadgeCheck,
  },
  { kind: 'item', id: 'knowledge', title: 'Knowledge', icon: Lightbulb },
  {
    kind: 'item',
    id: 'server-functions',
    title: 'Server Functions',
    icon: SquareFunction,
  },
  { kind: 'item', id: 'secrets', title: 'Secrets', icon: Key },
  { kind: 'item', id: 'connectors', title: 'Connectors', icon: Component },
  { kind: 'separator', id: 'sep-after-connectors' },
  {
    kind: 'item',
    id: 'all-project-settings',
    title: 'All project settings',
    icon: Settings,
  },
  { kind: 'separator', id: 'sep-before-integrations' },
  { kind: 'label', id: 'label-integrations', label: 'Integrations' },
  {
    kind: 'item',
    id: 'stripe',
    title: 'Stripe',
    icon: CircleDollarSign,
    append: 'Add payments to your project',
  },
  {
    kind: 'item',
    id: 'bolt-database',
    title: 'Bolt Database',
    icon: Database,
    append: 'Manage database settings',
  },
] satisfies readonly SettingsEntry[]

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
        {SETTINGS_ENTRIES.map((entry) => {
          if (entry.kind === 'separator') {
            return <DropdownSeparator key={entry.id} />
          }
          if (entry.kind === 'label') {
            return <DropdownLabel key={entry.id} label={entry.label} />
          }
          const Icon = entry.icon
          return (
            <DropdownItem
              key={entry.id}
              size="md"
              title={entry.title}
              append={entry.append}
              onSelect={handleSelect}
              icon={
                <Icon
                  size={DROPDOWN_ICON_SIZE}
                  strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
                />
              }
            />
          )
        })}
      </DropdownList>
    </Dropdown>
  )
}
