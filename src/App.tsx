import { Eye, Code, Database, ChevronsUpDown, UsersRound, History, Folders, PencilLine, Copy, Download, Trash, Lock, Settings, RotateCw, ExternalLink, MonitorSmartphone, Scan, type LucideIcon } from 'lucide-react';
import './App.css'
import { useEffect, useRef, useState, type ReactNode } from 'react';

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

const currentProject = projects[0];

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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const styles = `cursor-pointer text-left relative flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${props.className} ${isOpen ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-transparent'}`;

  // Close dropdown when clicking away
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const root = linkRef.current ?? buttonRef.current;

      if (root && !root.contains(event.target as Node)) {
        setIsOpen(false);
        linkRef.current?.focus();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen])

  // Close dropdown with `esc` key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        linkRef.current?.focus();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen])

  if (props.as === "link") {
    return (
      <a ref={linkRef} className={styles} href={props.href}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button ref={buttonRef} className={styles} onClick={() => setIsOpen(!isOpen)}>
        {props.children}

        {isOpen && props.openChildren}
      </button>
    );
  }
}

/**
 * Dropdown
 */
type DropdownProps = {
  children: string | ReactNode;
}

const Dropdown = (props: DropdownProps) => (
  <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg absolute top-10 left-0 w-55 text-left">
    {props.children}
  </div>
);

/**
 * Dropdown Item
 */
type DropdownItemProps = {
  title: string;
  icon?: ReactNode;
  key?: number;
  className?: string;
}

const DropdownItem = (props: DropdownItemProps) => (
  <li key={props.key} className={`cursor-pointer flex items-center gap-2.5 mx-1.5 my-1.5 px-1.5 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${props.className ? props.className : ''}`} tabIndex={0}>
    {props.icon && props.icon}
    {props.title}
  </li>
);

/**
 * Separator
 */
const Separator = () => {
  return (
    <span className="h-4 w-[1.5px] bg-gray-200 dark:bg-zinc-700 block -skew-13" />
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

type UserTeamsProps = {
  data: Team[]
}

const UserTeams = (props: UserTeamsProps) => {
  return (
    <Dropdown>
      <ul>
        {props.data.map((item: Team) => (
          <UserTeam key={item.id} team={item} />
        ))}

        <hr className="mx-1 border-gray-200" />

        <UserTeam team={{ id: 0, title: 'Create a team'}} create={true} />
      </ul>
    </Dropdown>
  )
};

/**
 * User Projects
 */

const UserProjectsDropdown = () => (
  <Dropdown>
    <ul>
      <DropdownItem className="text-sm" title="Open recent project" icon={<Folders size={16} strokeWidth={1} />} />
      <DropdownItem className="text-sm" title="Version history" icon={<History size={16} strokeWidth={1} />} />
      <DropdownItem className="text-sm" title="Rename..." icon={<PencilLine size={16} strokeWidth={1} />} />
      <DropdownItem className="text-sm" title="Duplicate" icon={<Copy size={16} strokeWidth={1} />} />
      <DropdownItem className="text-sm" title="Export" icon={<Download size={16} strokeWidth={1} />} />
      <DropdownItem className="text-sm" title="Visibility" icon={<Eye size={16} strokeWidth={1} />} />
      <DropdownItem className="text-sm" title="Delete" icon={<Trash size={16} strokeWidth={1} />} />
    </ul>
  </Dropdown>
);

/**
 * App
 */
function App() {
  return (
    <>
      {/* Application */}
      <main className="h-full md:grid md:grid-cols-12 lg:grid-cols-[420px_1fr] gap-3">
        {/* Sidebar */}
        <div className="md:col-span-5 lg:col-auto h-[50%] md:h-full overflow-scroll">
          <header className="px-2 py-1.5">
            {/* Sidebar Header */}
            <div className="flex items-center gap-1">
              <Button as="link" href="https://bolt.new" className="shrink-0 h-9">
                <img src="/bolt-logo-wordmark.png" alt="Bolt.new" className="h-6 dark:invert-100" />
              </Button>

              <Separator />

              <Button className="shrink-0 h-9" openChildren={<UserTeams data={teams} />}>
                <img src="/me.jpg" className="w-6 h-6 rounded-full" />
                <ChevronsUpDown size={16} strokeWidth={1} className="stroke-gray-600 dark:stroke-zinc-400" />
              </Button>

              <Separator />

              <Button className="h-9" openChildren={<UserProjectsDropdown />}>
                <span className="text-sm font-medium">{currentProject.title}</span>
                {currentProject.private && <Lock strokeWidth={1.5} size={14} />}
              </Button>
            </div>
          </header>

          <h2 className="text-xl">Chat</h2>

          {conversations.map((conversation) => (
            <div key={conversation.id}>
              {conversation.title}
            </div>
          ))}
        </div>

        {/* Application Output */}
        <div className="md:col-span-7 lg:col-auto h-full overflow-scroll">
          <header className="py-1.5">
            {/* Application Header — Right Side */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex shrink-0 items-center space-between gap-0.5 border border-gray-200 dark:border-gray-800 rounded-lg w-auto px-0.5 py-1.5 h-8">
                <button className="group/button cursor-pointer p-1.5 bg-blue-100 dark:bg-zinc-700 hover:bg-gray-800 dark:hover:bg-zinc-700 rounded-md transition-colors">
                  <Eye size={15} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-100 group-hover:stroke-gray-900 dark:group-hover:stroke-zinc-800 transition-colors" />
                </button>

                <button className="group/button cursor-pointer p-1.5 hover:bg-gray-800 dark:hover:bg-zinc-800 rounded-md transition-colors">
                  <Code size={15} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
                </button>

                <button className="group/button cursor-pointer p-1.5 hover:bg-gray-800 dark:hover:bg-zinc-800 rounded-md transition-colors">
                  <Database size={15} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
                </button>
              </div>

              <button className="group/button px-1 py-1 cursor-pointer">
                <Settings size={16} strokeWidth={1.5} className="stroke-gray-400 fill-gray-200 dark:fill-transparent hover:fill-gray-300 dark:hover:fill-gray-900 hover:stroke-gray-800 dark:hover:stroke-gray-300 transition-colors" />
              </button>

              <div className="flex flex-1 items-center rounded-full px-3 border border-gray-300 dark:border-neutral-900 bg-gray-50 dark:bg-zinc-800 h-8">
                <input type="text" value="/" className="flex-1 text-sm text-gray-800 dark:text-gray-300 mx-1 px-1" onChange={() => null} />

                <div className="justify-end flex items-center">
                  <button className="group/button cursor-pointer p-1.5 hover:bg-gray-800 dark:hover:bg-zinc-800 rounded-md transition-colors">
                    <RotateCw size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
                  </button>

                  <button className="group/button cursor-pointer p-1.5 hover:bg-gray-800 dark:hover:bg-zinc-800 rounded-md transition-colors">
                    <ExternalLink size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
                  </button>

                  <button className="group/button cursor-pointer p-1.5 hover:bg-gray-800 dark:hover:bg-zinc-800 rounded-md transition-colors">
                    <MonitorSmartphone size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
                  </button>

                  <button className="group/button cursor-pointer p-1.5 hover:bg-gray-800 dark:hover:bg-zinc-800 rounded-md transition-colors">
                    <Scan size={14} strokeWidth={1.5} className="stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-gray-900 dark:group-hover:stroke-gray-900 transition-colors" />
                  </button>
                </div>
              </div>

              <Button className="shrink-0">
                <img src="/github.svg" className="h-5 w-5 dark:invert-100" />
              </Button>

              <Button className="shrink-0">
                Share
              </Button>

              <Button className="shrink-0">
                Publish
              </Button>

              <Button className="shrink-0">
                <img src="/me.jpg" className="w-6 h-6 rounded-full" />
              </Button>
            </div>
          </header>
          
          <div className="rounded-lg border border-gray-200 dark:border-zinc-700 h-full w-full">
            Output
          </div>
        </div>
      </main>
    </>
  )
}

export default App
