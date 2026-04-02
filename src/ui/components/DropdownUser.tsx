import {
  CircleQuestionMark,
  CreditCard,
  LogOut,
  Palette,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
  type DropdownAlign,
} from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'

type UserEntry =
  | { kind: 'item'; id: string; title: string; icon: LucideIcon }
  | { kind: 'separator'; id: string }

const USER_ENTRIES = [
  { kind: 'item', id: 'settings', title: 'Settings', icon: Settings },
  {
    kind: 'item',
    id: 'help',
    title: 'Help',
    icon: CircleQuestionMark,
  },
  { kind: 'separator', id: 'sep-after-help' },
  {
    kind: 'item',
    id: 'subscription',
    title: 'Subscription',
    icon: CreditCard,
  },
  { kind: 'item', id: 'theme', title: 'Theme', icon: Palette },
  { kind: 'separator', id: 'sep-before-sign-out' },
  { kind: 'item', id: 'sign-out', title: 'Sign out', icon: LogOut },
] satisfies readonly UserEntry[]

type DropdownUserProps = {
  align?: DropdownAlign
}

export default function DropdownUser({ align }: DropdownUserProps) {
  const closeCtx = useDropdownTriggerClose()
  const handleSelect = () => closeCtx?.close()

  return (
    <Dropdown align={align} className="w-50">
      <DropdownList>
        {USER_ENTRIES.map((entry) => {
          if (entry.kind === 'separator') {
            return <DropdownSeparator key={entry.id} />
          }
          const Icon = entry.icon
          return (
            <DropdownItem
              key={entry.id}
              size="md"
              title={entry.title}
              onSelect={handleSelect}
              icon={
                <Icon
                  size={DROPDOWN_ICON_SIZE}
                  strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
                  aria-hidden="true"
                />
              }
            />
          )
        })}
      </DropdownList>
    </Dropdown>
  )
}
