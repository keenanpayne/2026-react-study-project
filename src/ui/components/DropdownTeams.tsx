import type { MockUserTeam } from '~/types/user'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { UsersRound } from 'lucide-react'

type DropdownTeamsProps = {
  data: MockUserTeam[]
}

export default function DropdownTeams({ data }: DropdownTeamsProps) {
  const closeCtx = useDropdownTriggerClose()
  const handleActivate = () => closeCtx?.close()

  return (
    <Dropdown align="left" className="w-55">
      <DropdownList>
        {data.map((team) => (
          <DropdownItem
            key={team.id}
            size="lg"
            selected={team.active}
            onSelect={handleActivate}
            icon={
              team.icon ? (
                <img
                  src={team.icon}
                  alt={team.title}
                  className="avatar border-border-strong h-8 w-8 border"
                  loading="lazy"
                />
              ) : undefined
            }
            title={
              <p className="flex flex-col gap-1.5">
                <span className="text-sm leading-2 font-semibold">
                  {team.title}
                </span>
                {team.type && (
                  <span className="text-text-muted text-xs">{team.type}</span>
                )}
              </p>
            }
          />
        ))}

        <DropdownSeparator />

        <DropdownItem
          size="lg"
          onSelect={handleActivate}
          icon={
            <UsersRound
              className="icon-circle bg-surface-emphasis h-8 w-8 p-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          }
          title={
            <span className="text-sm leading-2 font-semibold">
              Create a team
            </span>
          }
        />
      </DropdownList>
    </Dropdown>
  )
}
