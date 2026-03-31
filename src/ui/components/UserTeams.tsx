import type { MockUserTeam } from '~/data/MockUser'
import Dropdown from './Dropdown'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import UserTeam from './UserTeam'

type UserTeamsProps = {
  data: MockUserTeam[]
}

export default function UserTeams(props: UserTeamsProps) {
  return (
    <Dropdown align="left" className="w-55">
      <DropdownList>
        {props.data.map((item: MockUserTeam) => (
          <UserTeam key={item.id} team={item} />
        ))}

        <DropdownSeparator />

        <UserTeam team={{ id: 0, title: 'Create a team' }} create={true} />
      </DropdownList>
    </Dropdown>
  )
}
