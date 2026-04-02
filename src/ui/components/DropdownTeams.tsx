import type { KeyboardEvent } from 'react'
import type { MockUserTeam } from '~/data/MockUser'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'
import Dropdown from './Dropdown'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { UsersRound } from 'lucide-react'

type TeamProps = {
  team: MockUserTeam
  create?: boolean
  onActivate: () => void
}

function Team(props: TeamProps) {
  const active = props.team.active

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      props.onActivate()
    }
  }

  return (
    <li
      role="menuitem"
      className={`hover:bg-hover-item mx-1.5 my-1.5 flex cursor-pointer items-center gap-2.5 rounded-md p-2 transition-colors ${active ? 'bg-selected hover:bg-selected-hover' : ''}`}
      tabIndex={0}
      aria-current={active ? 'true' : undefined}
      onClick={props.onActivate}
      onKeyDown={handleKeyDown}
    >
      {!props.create ? (
        props.team.icon && (
          <img
            src={props.team.icon}
            alt={props.team.title}
            className="avatar border-border-strong h-8 w-8 border"
            loading="lazy"
          />
        )
      ) : (
        <UsersRound
          className="icon-circle bg-surface-emphasis h-8 w-8 p-1"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}

      <p className="flex flex-col gap-1.5">
        <span className="text-sm leading-2 font-semibold">
          {props.team.title}
        </span>
        {props.team.type && (
          <span className="text-text-muted text-xs">{props.team.type}</span>
        )}
      </p>
    </li>
  )
}

type DropdownTeamsProps = {
  data: MockUserTeam[]
}

export default function DropdownTeams(props: DropdownTeamsProps) {
  const closeCtx = useDropdownTriggerClose()
  const handleActivate = () => closeCtx?.close()

  return (
    <Dropdown align="left" className="w-55">
      <DropdownList>
        {props.data.map((item: MockUserTeam) => (
          <Team key={item.id} team={item} onActivate={handleActivate} />
        ))}

        <DropdownSeparator />

        <Team
          team={{ id: 0, title: 'Create a team' }}
          create={true}
          onActivate={handleActivate}
        />
      </DropdownList>
    </Dropdown>
  )
}
