import type { ReactNode } from 'react'
import { MessageSquare, Eye, Code, Database, Settings } from 'lucide-react'
import DropdownTrigger from './DropdownTrigger'
import DropdownSettings from './DropdownSettings'
import DropdownUser from './DropdownUser'
import Button from './Button'
import type { UserTeam } from '~/types/user'
import type { MobileView } from '~/types/navigation'

type MobileNavigationProps = {
  activeView: MobileView
  onViewChange: (view: MobileView) => void
  teams: UserTeam[]
}

type NavItem = {
  id: string
  label: string
  icon: ReactNode
} & (
  | { view: MobileView; dropdown?: never }
  | { dropdown: ReactNode; view?: never }
)

const ICON_SIZE = 20
const ICON_STROKE_WIDTH = 1.5

export default function MobileNavigation({
  activeView,
  onViewChange,
  teams,
}: MobileNavigationProps) {
  const activeTeam = teams.find((team) => team.active)

  if (!activeTeam) {
    return null
  }

  const navItems: NavItem[] = [
    {
      id: 'chat',
      label: 'Chat',
      view: 'chat',
      icon: (
        <MessageSquare
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      ),
    },
    {
      id: 'preview',
      label: 'Preview',
      view: 'preview',
      icon: (
        <Eye
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      ),
    },
    {
      id: 'codebase',
      label: 'Code',
      view: 'codebase',
      icon: (
        <Code
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      ),
    },
    {
      id: 'database',
      label: 'Database',
      view: 'database',
      icon: (
        <Database
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      dropdown: <DropdownSettings align="top" />,
      icon: (
        <Settings
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      ),
    },
    {
      id: 'user',
      label: 'Profile',
      dropdown: <DropdownUser align="top" />,
      icon: (
        <img
          src={activeTeam.icon}
          alt={activeTeam.title}
          className="avatar h-6 w-6"
        />
      ),
    },
  ]

  const baseClass =
    'flex flex-col items-center gap-1 text-xs transition-colors min-h-11 min-w-11 justify-center'
  const activeClass = 'text-nav-active'
  const inactiveClass = 'text-text-muted'
  const labelClass = 'h-0 xs:h-auto opacity-0 xs:opacity-100'

  return (
    <nav
      aria-label="Mobile navigation"
      className="border-border-default bg-surface fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t p-3 sm:justify-evenly md:hidden"
    >
      {navItems.map((item) => {
        if (item.dropdown) {
          return (
            <div
              key={item.id}
              className="**:[[tabindex='0']]:top-auto **:[[tabindex='0']]:bottom-14"
            >
              <DropdownTrigger
                size="flat"
                variant="plain"
                className={`${baseClass} ${inactiveClass} aria-expanded:text-nav-active`}
                dropdown={item.dropdown}
                aria-label={item.label}
              >
                {item.icon}
                <span className={labelClass} aria-hidden="true">
                  {item.label}
                </span>
              </DropdownTrigger>
            </div>
          )
        }

        if (!item.view) return null

        const isActive = activeView === item.view

        return (
          <Button
            key={item.id}
            onClick={() => onViewChange(item.view)}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            variant="plain"
            size="flat"
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon}
            <span className={labelClass} aria-hidden="true">
              {item.label}
            </span>
          </Button>
        )
      })}
    </nav>
  )
}
