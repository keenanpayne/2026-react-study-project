import { ChevronsUpDown, Lock } from 'lucide-react'
import type { MockUserProject, MockUserTeam } from '~/data/MockUser'
import DropdownProjects from './DropdownProjects'
import UserTeams from './UserTeams'
import Button from './Button'
import DropdownTrigger from './DropdownTrigger'

function Separator() {
  return (
    <span className="block h-[18px] text-xl leading-4 text-gray-200 antialiased dark:text-zinc-700">
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
    <header className="sticky top-0 left-0 z-10 bg-white px-2.5 py-1.5 dark:bg-zinc-900">
      <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
        <Button
          size="md"
          radius="md"
          as="a"
          href="https://bolt.new"
          className="h-10 shrink-0"
        >
          <img
            src="/bolt-logo-wordmark.png"
            alt="Bolt.new"
            className="h-6 dark:invert-100"
          />
        </Button>

        <Separator />

        <DropdownTrigger
          size="md"
          radius="md"
          className="h-9"
          wrapperClassName="shrink-0"
          dropdown={<UserTeams data={props.teams} />}
        >
          <img
            src="/me.jpg"
            className="h-6 w-6 rounded-full border border-gray-300 dark:border-zinc-700"
          />
          <ChevronsUpDown
            size={16}
            strokeWidth={2}
            className="stroke-gray-400 dark:stroke-zinc-400"
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
          {props.currentProject.private && <Lock strokeWidth={1.5} size={14} />}
        </DropdownTrigger>
      </nav>
    </header>
  )
}
