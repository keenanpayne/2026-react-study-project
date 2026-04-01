import { UsersRound } from 'lucide-react'
import type { MockUserTeam } from '~/data/MockUser'

type UserTeamProps = {
  team: MockUserTeam
  create?: boolean
}

export default function UserTeam(props: UserTeamProps) {
  return (
    <li
      key={props.team.id}
      className="hover:bg-hover-item mx-1.5 my-1.5 flex cursor-pointer items-center gap-2.5 rounded-md p-2 transition-colors"
      tabIndex={0}
    >
      {!props.create ? (
        props.team.icon && (
          <img
            src={props.team.icon}
            alt={props.team.title}
            className="avatar border-border-strong h-8 w-8 border"
          />
        )
      ) : (
        <UsersRound
          className="icon-circle bg-surface-emphasis h-8 w-8 p-1"
          strokeWidth={1.5}
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
