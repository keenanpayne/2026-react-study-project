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
      className="mx-1.5 my-1.5 flex cursor-pointer items-center gap-2.5 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
      tabIndex={0}
    >
      {!props.create ? (
        props.team.icon && (
          <img
            src={props.team.icon}
            alt={props.team.title}
            className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700"
          />
        )
      ) : (
        <UsersRound
          className="h-8 w-8 rounded-full bg-gray-200 p-1 dark:bg-zinc-900"
          strokeWidth={1.5}
        />
      )}

      <p className="flex flex-col gap-1.5">
        <span className="text-sm leading-2 font-semibold">
          {props.team.title}
        </span>
        {props.team.type && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {props.team.type}
          </span>
        )}
      </p>
    </li>
  )
}
