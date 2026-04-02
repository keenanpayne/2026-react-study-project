import { ChevronsUpDown, Lock } from 'lucide-react'
import type { MockUserProject, MockUserTeam } from '~/types/user'
import DropdownProjects from './DropdownProjects'
import DropdownTeams from './DropdownTeams'
import Button from './Button'
import DropdownTrigger from './DropdownTrigger'
import BoltLogo from './BoltLogo'

function Separator() {
  return (
    <span className="text-text-subtle block h-[18px] text-xl leading-4 antialiased">
      /
    </span>
  )
}

type ChatHeaderProps = {
  teams: MockUserTeam[]
  projects: MockUserProject[]
  currentProject: MockUserProject
}

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <header className="bg-surface sticky top-0 left-0 z-10 px-2.5 py-1.5">
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5"
      >
        <Button
          size="md"
          radius="md"
          as="a"
          href="https://bolt.new"
          className="h-10 shrink-0"
        >
          <BoltLogo className="h-6" wordmark />
        </Button>

        <Separator />

        <DropdownTrigger
          size="md"
          radius="md"
          className="h-9"
          wrapperClassName="shrink-0"
          dropdown={<DropdownTeams data={props.teams} />}
        >
          {props.teams.find((team) => team.active)?.icon && (
            <img
              src={props.teams.find((team) => team.active)?.icon}
              alt={props.teams.find((team) => team.active)?.title}
              className="avatar border-border-default h-6 w-6 border"
            />
          )}
          <ChevronsUpDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className="stroke-icon-muted"
          />
        </DropdownTrigger>

        <Separator />

        <DropdownTrigger
          size="md"
          radius="md"
          className="h-9"
          dropdown={
            <DropdownProjects
              projects={props.projects}
              currentProject={props.currentProject}
            />
          }
        >
          <span className="text-xs font-medium md:text-sm">
            {props.currentProject.title}
          </span>
          {props.currentProject.private && (
            <>
              <Lock strokeWidth={1.5} size={14} aria-hidden="true" />
              <span className="sr-only">(private)</span>
            </>
          )}
        </DropdownTrigger>
      </nav>
    </header>
  )
}
