import { UsersRound } from "lucide-react";
import type { MockUserTeam } from "~/data/MockUser";

type UserTeamProps = {
  team: MockUserTeam,
  create?: boolean,
}

export default function UserTeam(props: UserTeamProps) {
  return (
    <li key={props.team.id} className="cursor-pointer flex items-center gap-2.5 mx-1.5 my-1.5 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors" tabIndex={0}>
      {!props.create ?
        props.team.icon && <img src={props.team.icon} alt={props.team.title} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700" />
        : <UsersRound className="w-8 h-8 p-1 bg-gray-200 dark:bg-zinc-900 rounded-full" strokeWidth={1.5} />
      }

      <p className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold leading-2">{props.team.title}</span>
        {props.team.type && <span className="text-xs text-gray-500 dark:text-gray-400">{props.team.type}</span>}
      </p>
    </li>
  );
}