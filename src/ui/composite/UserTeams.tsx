import type { Team } from "../../data/mock";
import Dropdown from "../base/Dropdown";
import UserTeam from "./UserTeam";

type UserTeamsProps = {
  data: Team[]
}

export default function UserTeams(props: UserTeamsProps) {
  return (
    <Dropdown align="left" className="w-55">
      <ul>
        {props.data.map((item: Team) => (
          <UserTeam key={item.id} team={item} />
        ))}

        <hr className="mx-1 border-gray-200" />

        <UserTeam team={{ id: 0, title: 'Create a team'}} create={true} />
      </ul>
    </Dropdown>
  )
}