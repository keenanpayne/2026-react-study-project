import {
  Eye,
  Code,
  Database,
  Settings,
  RotateCw,
  ExternalLink,
  MonitorSmartphone,
  Scan,
} from 'lucide-react'
import Button from './Button'
import DropdownSettings from './DropdownSettings'
import DropdownUser from './DropdownUser'
import DropdownTrigger from './DropdownTrigger'
import type { WorkbenchPane } from './MobileNavigation'
import type { MockUserTeam } from '~/data/MockUser'

type WorkbenchHeaderProps = {
  activePane: WorkbenchPane
  onPaneChange: (pane: WorkbenchPane) => void
  teams: MockUserTeam[]
}

export default function WorkbenchHeader(props: WorkbenchHeaderProps) {
  const { activePane, onPaneChange, teams } = props
  const activeTeam = teams.find((team) => team.active)

  if (!activeTeam) {
    return null
  }

  const toggleButtonClass = 'group/button rounded-[10px] p-1.5'
  const activeIconClass =
    'stroke-icon-active group-hover/button:stroke-icon-active transition-colors'
  const inactiveIconClass =
    'icon-interactive group-hover/button:stroke-icon-hover'

  return (
    <header className="py-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <nav className="space-between border-border-default hidden h-8 w-auto shrink-0 items-center gap-1 rounded-xl border px-0.5 py-1.5 md:flex">
          <Button
            size="sm"
            variant={activePane === 'preview' ? 'selected' : 'ghost'}
            className={toggleButtonClass}
            onClick={() => onPaneChange('preview')}
            aria-label="Preview"
          >
            <Eye
              size={15}
              strokeWidth={1.5}
              className={
                activePane === 'preview' ? activeIconClass : inactiveIconClass
              }
            />
          </Button>

          <Button
            size="sm"
            variant={activePane === 'codebase' ? 'selected' : 'ghost'}
            className={toggleButtonClass}
            onClick={() => onPaneChange('codebase')}
            aria-label="Code"
          >
            <Code
              size={15}
              strokeWidth={1.5}
              className={
                activePane === 'codebase' ? activeIconClass : inactiveIconClass
              }
            />
          </Button>

          <Button
            size="sm"
            variant={activePane === 'database' ? 'selected' : 'ghost'}
            className={toggleButtonClass}
            onClick={() => onPaneChange('database')}
            aria-label="Database"
          >
            <Database
              size={15}
              strokeWidth={1.5}
              className={
                activePane === 'database' ? activeIconClass : inactiveIconClass
              }
            />
          </Button>
        </nav>

        <div className="hidden shrink-0 md:block">
          <DropdownTrigger
            size="md"
            radius="xl"
            className="group/button"
            dropdown={<DropdownSettings />}
          >
            <span className="sr-only">Open settings</span>

            <Settings
              size={16}
              strokeWidth={1.5}
              className="fill-fill-subtle stroke-icon-muted group-hover/button:fill-fill-subtle-hover group-hover/button:stroke-text-heading transition-colors"
            />
          </DropdownTrigger>
        </div>

        {activePane === 'preview' && (
          <div className="border-border-strong bg-surface-muted order-2 mr-auto ml-auto flex h-8 flex-1 items-center rounded-full border px-3 sm:order-1 md:max-w-md">
            <label htmlFor="url" className="sr-only">
              Page URL
            </label>
            <input
              id="url"
              type="text"
              value="/"
              className="text-text-heading mx-1 flex-1 px-1 text-sm"
              onChange={() => null}
            />

            <nav className="flex items-center justify-end">
              <Button size="sm" radius="sm" className="group/button p-1.5">
                <span className="sr-only">Reload preview</span>

                <RotateCw
                  size={14}
                  strokeWidth={1.5}
                  className="icon-interactive group-hover/button:stroke-icon-hover"
                />
              </Button>

              <Button size="sm" radius="sm" className="group/button p-1.5">
                <span className="sr-only">Open preview in separate tab</span>

                <ExternalLink
                  size={14}
                  strokeWidth={1.5}
                  className="icon-interactive group-hover/button:stroke-icon-hover"
                />
              </Button>

              <Button size="sm" radius="sm" className="group/button p-1.5">
                <span className="sr-only">Responsive mode</span>

                <MonitorSmartphone
                  size={14}
                  strokeWidth={1.5}
                  className="icon-interactive group-hover/button:stroke-icon-hover"
                />
              </Button>

              <Button size="sm" radius="sm" className="group/button p-1.5">
                <span className="sr-only">Full screen</span>
                <Scan
                  size={14}
                  strokeWidth={1.5}
                  className="icon-interactive group-hover/button:stroke-icon-hover"
                />
              </Button>
            </nav>
          </div>
        )}

        {activePane === 'database' && (
          <nav className="order-2 mr-auto ml-auto flex flex-1 items-center justify-center gap-1.5 sm:order-1">
            <Button size="lg" radius="pill" variant="selected">
              Database
            </Button>

            <Button size="lg" radius="pill" variant="ghost">
              Logs
            </Button>

            <Button size="lg" radius="pill" variant="ghost">
              Security Audit
            </Button>

            <Button size="lg" radius="pill" variant="ghost">
              Advanced
            </Button>
          </nav>
        )}

        <div className="order-1 mr-auto ml-auto flex shrink-0 items-center gap-3 sm:order-2 sm:mr-0">
          <Button size="md" radius="md" className="shrink-0" iconOnly>
            <img
              src="/github.svg"
              alt="GitHub"
              className="invert-dark h-5 w-5"
              loading="lazy"
            />
          </Button>

          <Button size="lg" radius="md" variant="subtle" className="shrink-0">
            Share
          </Button>

          <Button size="lg" radius="md" variant="primary" className="shrink-0">
            Publish
          </Button>

          <DropdownTrigger
            size="md"
            radius="md"
            className="shrink-0"
            wrapperClassName="shrink-0"
            dropdown={<DropdownUser />}
          >
            <img
              src={activeTeam.icon}
              alt={activeTeam.title}
              className="avatar h-6 w-6"
              loading="lazy"
            />
          </DropdownTrigger>
        </div>
      </div>
    </header>
  )
}
