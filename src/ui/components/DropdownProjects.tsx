import { Fragment, useMemo, useState, type ReactNode } from 'react'
import {
  Copy,
  Download,
  Earth,
  Eye,
  EyeOff,
  FileArchive,
  Folders,
  History,
  PencilLine,
  Trash,
  Zap,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import type { MockUserProject } from '~/types/user'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
} from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownSubmenuItem from './DropdownSubmenuItem'
import DropdownLabel from './DropdownLabel'
import DropdownList from './DropdownList'
import SearchInput from './SearchInput'

function getSectionLabel(date: Date): string {
  const ms30Days = 30 * 24 * 60 * 60 * 1000

  if (Date.now() - date.getTime() <= ms30Days) return 'Last 30 Days'

  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
}

function groupProjectsBySection(items: MockUserProject[]) {
  const groups: { label: string; projects: MockUserProject[] }[] = []

  for (const project of items) {
    const label = getSectionLabel(project.updated_at)
    const last = groups[groups.length - 1]

    if (!last || last.label !== label) {
      groups.push({ label, projects: [project] })
    } else {
      last.projects.push(project)
    }
  }

  return groups
}

type DropdownRecentProjectsProps = {
  projects: MockUserProject[]
  currentProject: MockUserProject
}

function DropdownRecentProjects({
  projects,
  currentProject,
}: DropdownRecentProjectsProps) {
  const closeCtx = useDropdownTriggerClose()
  const [query, setQuery] = useState('')

  const filtered = query
    ? projects.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      )
    : projects

  const sections = groupProjectsBySection(filtered)

  return (
    <Dropdown className="w-65" nested>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search projects"
        className="px-3"
        iconSize={DROPDOWN_ICON_SIZE}
        iconStrokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
      />

      {sections.length === 0 ? (
        <p role="status" className="text-text-muted px-3 py-2 text-sm">
          No projects found
        </p>
      ) : (
        <DropdownList>
          {sections.map(({ label, projects: sectionProjects }) => (
            <Fragment key={label}>
              <DropdownLabel label={label} />
              {sectionProjects.map((project) => {
                const isActive = project.id === currentProject.id

                return (
                  <DropdownItem
                    key={project.id}
                    size="md"
                    title={project.title}
                    prepend={isActive ? 'Active Project' : undefined}
                    className={isActive ? 'bg-selected' : undefined}
                    onSelect={() => closeCtx?.close()}
                  />
                )
              })}
            </Fragment>
          ))}
        </DropdownList>
      )}
    </Dropdown>
  )
}

const EXPORT_ROWS: { id: string; title: string; icon: LucideIcon }[] = [
  { id: 'download', title: 'Download', icon: FileArchive },
  { id: 'stackblitz', title: 'Open in StackBlitz', icon: Zap },
]

function DropdownExport() {
  const closeCtx = useDropdownTriggerClose()
  const handleSelect = () => closeCtx?.close()

  return (
    <Dropdown className="w-50" nested>
      <DropdownList>
        {EXPORT_ROWS.map((row) => {
          const Icon = row.icon
          return (
            <DropdownItem
              key={row.id}
              size="md"
              title={row.title}
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

const VISIBILITY_ROWS: {
  id: string
  title: string
  append: string
  icon: LucideIcon
}[] = [
  {
    id: 'public',
    title: 'Public',
    append: 'Everyone can view',
    icon: Earth,
  },
  {
    id: 'secret',
    title: 'Secret',
    append: 'Accessible via shared URL',
    icon: EyeOff,
  },
  {
    id: 'private',
    title: 'Private',
    append: 'Only owner can access',
    icon: Lock,
  },
]

function DownloadVisibility() {
  const closeCtx = useDropdownTriggerClose()
  const handleSelect = () => closeCtx?.close()

  return (
    <Dropdown className="w-52" nested>
      <DropdownList>
        {VISIBILITY_ROWS.map((row) => {
          const Icon = row.icon
          return (
            <DropdownItem
              key={row.id}
              size="md"
              title={row.title}
              append={row.append}
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

type ProjectMenuRow = {
  id: string
  title: string
  icon: LucideIcon
  dropdown?: ReactNode
  className?: string
}

type DropdownProjectsProps = {
  projects: MockUserProject[]
  currentProject: MockUserProject
}

export default function DropdownProjects({
  projects,
  currentProject,
}: DropdownProjectsProps) {
  const closeCtx = useDropdownTriggerClose()
  const handleSelect = () => closeCtx?.close()

  const menuRows = useMemo<ProjectMenuRow[]>(
    () => [
      {
        id: 'recent',
        title: 'Open recent project',
        icon: Folders,
        dropdown: (
          <DropdownRecentProjects
            projects={projects}
            currentProject={currentProject}
          />
        ),
      },
      { id: 'history', title: 'Version history', icon: History },
      { id: 'rename', title: 'Rename...', icon: PencilLine },
      { id: 'duplicate', title: 'Duplicate', icon: Copy },
      {
        id: 'export',
        title: 'Export',
        icon: Download,
        dropdown: <DropdownExport />,
      },
      {
        id: 'visibility',
        title: 'Visibility',
        icon: Eye,
        dropdown: <DownloadVisibility />,
      },
      {
        id: 'delete',
        title: 'Delete',
        icon: Trash,
        className: 'text-danger hover:bg-danger-bg',
      },
    ],
    [projects, currentProject],
  )

  return (
    <Dropdown align="left" className="w-60">
      <DropdownList>
        {menuRows.map((row) => {
          const Icon = row.icon
          const iconElement = (
            <Icon
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          )

          if (row.dropdown) {
            return (
              <DropdownSubmenuItem
                key={row.id}
                size="md"
                title={row.title}
                className={row.className}
                dropdown={row.dropdown}
                icon={iconElement}
              />
            )
          }

          return (
            <DropdownItem
              key={row.id}
              size="md"
              title={row.title}
              className={row.className}
              onSelect={handleSelect}
              icon={iconElement}
            />
          )
        })}
      </DropdownList>
    </Dropdown>
  )
}
