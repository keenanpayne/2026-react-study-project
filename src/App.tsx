import { Eye, Code, Database, ChevronsUpDown, UsersRound } from 'lucide-react';
import './App.css'
import { useState, type ReactNode } from 'react';

/**
 * Mock Data
 */

// Conversations
type Conversation = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
}

const conversations: Conversation[] = [
  {
    id: 1,
    title: "The basics of TypeScript",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "The basics of React",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Projects
type Project = {
  id: number;
  title: string;
  private: boolean;
  created_at: Date;
  updated_at: Date;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Multi-Platform Social Scheduler",
    private: true,
    created_at: new Date(),
    updated_at: new Date()
  }
]

// Teams
type Team = {
  id: number;
  title: string;
  type?: "Personal" | "Pro" | "Team" | "Enterprise";
  icon?: string;
  created_at?: Date;
  updated_at?: Date;
}

const teams: Team[] = [
  {
    id: 1,
    title: "Keenan Payne",
    type: "Personal",
    icon: "/me.jpg",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    title: "Concise CSS",
    type: "Team",
    icon: "/concise.png",
    created_at: new Date(),
    updated_at: new Date()
  }
]

/**
 * Button
 */
type ButtonProps = {
  as?: 'link' | 'button';
  href?: string;
  className?: string;
  children: string | ReactNode;
  openChildren?: string | ReactNode;
}

const Button = (props: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = `cursor-pointer relative flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors ${props.className} ${isOpen ? 'bg-gray-100' : 'bg-transparent'}`;

  if (props.as === "link") {
    return (
      <a className={styles} href={props.href}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button className={styles} onClick={() => setIsOpen(!isOpen)}>
        {props.children}

        {isOpen && props.openChildren}
      </button>
    );
  }
}

/**
 * Separator
 */
const Separator = () => {
  return (
    <span className="h-4 w-px bg-gray-300 block -skew-11" />
  );
}

/**
 * User Teams
 */
type UserTeamProps = {
  team: Team,
  create?: boolean,
}

const UserTeam = (props: UserTeamProps) => {
  return (
    <li key={props.team.id} className="cursor-pointer flex items-center gap-2.5 mx-1.5 my-1.5 px-1.5 py-1.5 border border-transparent rounded-md hover:bg-gray-100 hover:border-gray-200 transition-colors" tabIndex={0}>
      {!props.create ?
        props.team.icon && <img src={props.team.icon} alt={props.team.title} className="w-8 h-8 rounded-full border border-gray-300" />
        : <UsersRound className="w-8 h-8 p-1 bg-gray-200 rounded-full" strokeWidth={1.5} />
      }

      <p className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold leading-2">{props.team.title}</span>
        {props.team.type && <span className="text-xs text-gray-500">{props.team.type}</span>}
      </p>
    </li>
  );
}

type UserTeamsProps = {
  data: Team[]
}

const UserTeams = (props: UserTeamsProps) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg absolute top-10 left-0 w-60">
      <ul className="text-left">
        {props.data.map((item: Team) => (
          <UserTeam key={item.id} team={item} />
        ))}

        <hr className="mx-1 border-gray-200" />

        <UserTeam team={{ id: 0, title: 'Create a team'}} create={true} />
      </ul>
    </div>
  )
};

/**
 * App
 */
function App() {
  return (
    <>
      {/* Application Header */}
      <header className="grid grid-cols-12 px-3 py-1.5">
        <div className="col-span-4 flex items-center gap-1.5">
          <Button as="link" href="https://bolt.new">
            <img src="/bolt-logo-wordmark.jpg" alt="Bolt.new" className="h-5" />
          </Button>

          <Separator />

          <Button openChildren={<UserTeams data={teams} />}>
            <img src="/me.jpg" className="w-6 h-6 rounded-full" />
            <ChevronsUpDown size={16} strokeWidth={1} />
          </Button>

          <Separator />

          <Button>
            Project Name
          </Button>
        </div>

        <div className="col-span-8">
          <div className="flex items-center space-between gap-1.5">
            <button>
              <Eye size="18" />
            </button>

            <button>
              <Code size="18" />
            </button>

            <button>
              <Database size="18" />
            </button>
          </div>
        </div>
      </header>

      {/* Application Body */}
      <main className="grid grid-cols-12 gap-5 h-dvh">
        {/* Application Sidebar */}
        <div className="col-span-4 h-full p-3">
          <h2 className="text-xl">Conversations</h2>

          {conversations.map((conversation) => (
            <div key={conversation.id}>
              {conversation.title}
            </div>
          ))}
        </div>

        {/* Application Output */}
        <div className="col-span-8 py-3">
          Chat
        </div>
      </main>
    </>
  )
}

export default App
