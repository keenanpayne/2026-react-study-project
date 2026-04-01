import { Fragment, useState } from 'react'
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
} from 'lucide-react'
import type { MockUserProject } from '~/data/MockUser'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
} from './Dropdown'
import DropdownItem from './DropdownItem'
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

function DropdownRecentProjects(props: DropdownRecentProjectsProps) {
  const [query, setQuery] = useState('')

  const filtered = query
    ? props.projects.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      )
    : props.projects

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
        <p className="text-text-muted px-3 py-2 text-sm">No projects found</p>
      ) : (
        <DropdownList>
          {sections.map(({ label, projects: sectionProjects }) => (
            <Fragment key={label}>
              <DropdownLabel label={label} />
              {sectionProjects.map((project) => {
                const isActive = project.id === props.currentProject.id

                return (
                  <DropdownItem
                    key={project.id}
                    size="md"
                    title={project.title}
                    prepend={isActive ? 'Active Project' : undefined}
                    className={isActive ? 'bg-selected' : undefined}
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

function DropdownExport() {
  return (
    <Dropdown className="w-50" nested>
      <DropdownList>
        <DropdownItem
          size="md"
          title="Download"
          icon={
            <FileArchive
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Open in StackBlitz"
          icon={
            <Zap
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}

function DownloadVisibility() {
  return (
    <Dropdown className="w-52" nested>
      <DropdownList>
        <DropdownItem
          size="md"
          title="Public"
          append="Everyone can view"
          icon={
            <Earth
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Secret"
          append="Accessible via shared URL"
          icon={
            <EyeOff
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Private"
          append="Only owner can access"
          icon={
            <Lock
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}

type DropdownProjectsProps = {
  projects: MockUserProject[]
  currentProject: MockUserProject
}

export default function DropdownProjects(props: DropdownProjectsProps) {
  return (
    <Dropdown align="left" className="w-60">
      <DropdownList>
        <DropdownItem
          size="md"
          title="Open recent project"
          icon={
            <Folders
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
          dropdown={
            <DropdownRecentProjects
              projects={props.projects}
              currentProject={props.currentProject}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Version history"
          icon={
            <History
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Rename..."
          icon={
            <PencilLine
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Duplicate"
          icon={
            <Copy
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
        <DropdownItem
          size="md"
          title="Export"
          icon={
            <Download
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
          dropdown={<DropdownExport />}
        />
        <DropdownItem
          size="md"
          title="Visibility"
          icon={
            <Eye
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
          dropdown={<DownloadVisibility />}
        />
        <DropdownItem
          size="md"
          title="Delete"
          className="text-danger hover:bg-danger-bg"
          icon={
            <Trash
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
            />
          }
        />
      </DropdownList>
    </Dropdown>
  )
}
