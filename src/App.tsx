import { Eye, Code, Database, ChevronsUpDown, UsersRound, History, Folders, PencilLine, Copy, Download, Trash, Lock, Settings, RotateCw, ExternalLink, MonitorSmartphone, Scan, type LucideIcon, Ellipsis, CircleEllipsis, SquareTerminal, ChevronRight, ChevronDown, CirclePlus, Plus, MousePointerClick, Lightbulb, ArrowUp } from 'lucide-react';
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
  const styles = `cursor-pointer text-left relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${props.className} ${isOpen ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-transparent'}`;

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
  <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg absolute top-10 left-0 w-55 text-left shadow-xs">
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
    <span className="block text-xl antialiased h-[18px] text-gray-200 dark:text-zinc-700 leading-4">/</span>
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
      <main className="h-full md:grid md:grid-cols-12 lg:grid-cols-[450px_1fr]">
        {/* Sidebar */}
        <section className="relative md:col-span-6 lg:col-auto h-full overflow-scroll">
          <header className="px-1.5 py-1.5 sticky top-0 left-0 bg-white dark:bg-zinc-900 z-10">
            {/* Sidebar Header */}
            <nav className="flex items-center gap-0.5 sm:gap-1">
              <Button as="link" href="https://bolt.new" className="shrink-0 h-10">
                <img src="/bolt-logo-wordmark.png" alt="Bolt.new" className="h-6 dark:invert-100" />
              </Button>

              <Separator />

              <Button className="shrink-0 h-9" openChildren={<UserTeams data={teams} />}>
                <img src="/me.jpg" className="w-6 h-6 rounded-full border border-gray-300 dark:border-zinc-700" />
                <ChevronsUpDown size={16} strokeWidth={2} className="stroke-gray-400 dark:stroke-zinc-400" />
              </Button>

              <Separator />

              <Button className="h-9" openChildren={<UserProjectsDropdown />}>
                <span className="text-xs md:text-sm font-medium">{currentProject.title}</span>
                {currentProject.private && <Lock strokeWidth={1.5} size={14} />}
              </Button>
            </nav>
          </header>

          {/* User Message */}
          <article className="p-5">
            <p className="p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm leading-relaxed">Let's build a social media scheduling application that will handle content creation/editing/scheduling for Twitter, Bluesky, Mastodon, Threads, and LinkedIn.</p>
          </article>

          {/* Bolt Message */}
          <article className="flex flex-col gap-3 px-5 pb-5 text-sm leading-relaxed">
            <nav className="flex justify-between items-center">
              <img src="/bolt-logo.png" alt="Bolt" className="h-3.5" />

              <Button>
                <Ellipsis />
              </Button>
            </nav>

            <p>I'll analyze the current codebase and create a comprehensive plan for building a social media scheduling application. Let me start by exploring the project structure.</p>

            <details className="group/details space-y-5 py-3">
              <summary className="cursor-pointer flex items-center gap-2 mb-0">
                <span className="flex items-center flex-1 gap-2">
                  <CircleEllipsis size={18} strokeWidth={1.5} /> 9 actions taken
                </span>

                <ChevronDown size={20} strokeWidth={1.5} className="group-open/details:rotate-180 transition-transform duration-300" />
              </summary>
              
              <ul className="space-y-5 pt-3">
                <li>
                  <button className="group/button cursor-pointer flex items-center justify-between gap-2 w-full">
                    <span className="flex-1 flex items-center gap-2 text-gray-700 group-hover/button:text-gray-900 transition-colors">
                      <SquareTerminal size={18} strokeWidth={1} className="stroke-gray-700 group-hover/button:stroke-gray-900 transition-colors" />
                      Get current working directory
                    </span>

                    <span className="flex items-center gap-1 text-blue-400 opacity-0 group-hover/button:opacity-100 transition-opacity text-xs">
                      Open
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </span>
                  </button>
                </li>
              </ul>
            </details>

            <p>Perfect! I now have a clear understanding of the project structure. Let me create a comprehensive plan for building a social media scheduling application.</p>

            <p>Before I present the plan, I have a few clarifying questions:</p>

            <ol className="list-decimal list-outside pl-5 space-y-3">
              <li><strong>Authentication & User Management:</strong> Should users be able to sign up/login to manage their own accounts, or is this a single-user application?</li>
              <li><strong>OAuth Integration:</strong> Do you want users to connect their actual social media accounts (requiring OAuth flows for Twitter/X, LinkedIn, etc.), or should this be a "compose and copy" tool where users manually post the content?</li>
              <li><strong>Post Features:</strong> What level of post complexity should be supported - text only, or also images, videos, polls, threads, and other platform-specific features?</li>
            </ol>

            <hr className="border-2 border-gray-200 my-3" />

            <h2 className="text-lg font-semibold">Plan: Social Media Scheduling Application</h2>
            
            <ol className="space-y-5">
              <li>
                <h3 className="text-md font-semibold">1. Database Schema and Bolt Database Setup</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Create users table for authentication and user profiles</li>
                  <li>Create social_accounts table to store connected platform credentials (encrypted tokens)</li>
                  <li>Create posts table with fields for content, scheduled time, status, platform targets, and metadata</li>
                  <li>Create media table for storing uploaded images/videos with Bolt Database storage references</li>
                  <li>Set up Row Level Security policies to ensure users only access their own data</li>
                  <li>Create database functions for post scheduling and status management</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">2. Authentication and User Management</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Build login and signup pages with email/password authentication</li>
                  <li>Implement Bolt Database Auth integration for secure session management</li>
                  <li>Create protected route wrapper to guard authenticated pages</li>
                  <li>Build user profile page for managing account settings</li>
                  <li>Add password reset and email verification flows</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">3. Social Platform Connection Management</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Create a connections dashboard page showing all five platforms with connection status</li>
                  <li>Build individual connection flows for each platform (Twitter, Bluesky, Mastodon, Threads, LinkedIn)</li>
                  <li>Design platform cards with connect/disconnect buttons and account information display</li>
                  <li>Implement secure token storage for OAuth credentials in Bolt Database</li>
                  <li>Add reconnection handling for expired tokens</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">4. Content Creation Interface</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Build a unified post composer with rich text editor</li>
                  <li>Create character counter that adapts to each platform's limits (280 for Twitter, etc.)</li>
                  <li>Add platform selector with multi-select checkboxes for cross-posting</li>
                  <li>Implement media upload functionality with preview (images and videos)</li>
                  <li>Add emoji picker integration</li>
                  <li>Create URL shortener integration display</li>
                  <li>Build post preview component showing how content appears on each selected platform</li>
                </ul>
              </li>

              
              <li>
                <h3 className="text-md font-semibold">5. Scheduling System</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Create date/time picker component for scheduling posts</li>
                  <li>Build "Post Now" and "Schedule for Later" action buttons</li>
                  <li>Implement timezone selection and display</li>
                  <li>Create recurring post functionality (daily, weekly, monthly patterns)</li>
                  <li>Add draft saving capability with auto-save</li>
                  <li>Build schedule conflict detection and warnings</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">6. Content Calendar and Dashboard</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Design main dashboard with overview statistics (posts scheduled, published, failed)</li>
                  <li>Build calendar view showing all scheduled posts across platforms</li>
                  <li>Create list view with filtering by platform, status, and date range</li>
                  <li>Implement drag-and-drop rescheduling in calendar view</li>
                  <li>Add quick actions for editing, duplicating, and deleting posts</li>
                  <li>Build search functionality for finding past and scheduled content</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">7. Post Management and Queue</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Create post queue page showing upcoming scheduled posts in chronological order</li>
                  <li>Build individual post detail pages with edit capabilities</li>
                  <li>Implement post status tracking (draft, scheduled, publishing, published, failed)</li>
                  <li>Add bulk actions for managing multiple posts (delete, reschedule, duplicate)</li>
                  <li>Create post history view for published content with engagement metrics placeholders</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">8. Platform-Specific Features</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Add thread composer for Twitter/X and Bluesky with multiple connected posts</li>
                  <li>Implement hashtag suggestions and trending topics display</li>
                  <li>Create platform-specific content warnings and visibility settings</li>
                  <li>Add alt text editor for accessibility compliance across platforms</li>
                  <li>Build LinkedIn article format support for longer content</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">9. Notifications and Error Handling</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Create notification system for post publishing confirmations</li>
                  <li>Build error handling and retry logic for failed posts</li>
                  <li>Add user notifications for connection expiration warnings</li>
                  <li>Implement toast notifications for user actions (save, delete, publish)</li>
                  <li>Create activity log showing all post-related events</li>
                </ul>
              </li>

              <li>
                <h3 className="text-md font-semibold">10. UI Polish and Responsive Design</h3>

                <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
                  <li>Design beautiful navigation with sidebar and header</li>
                  <li>Create mobile-responsive layouts for all pages</li>
                  <li>Build loading states and skeleton screens</li>
                  <li>Add smooth transitions and animations</li>
                  <li>Implement dark mode toggle (optional enhancement)</li>
                  <li>Create empty states with helpful onboarding messages</li>
                </ul>
              </li>
            </ol>

            <hr className="border-2 border-gray-200 my-3" />

            <h2 className="text-lg font-semibold">Summary</h2>

            <p>This plan creates a comprehensive social media scheduling application that allows users to compose content once and publish it across five major platforms. The architecture leverages Bolt Database for authentication, database storage, and media hosting, ensuring scalability and security. The interface will be intuitive with a calendar-based scheduling system, real-time previews, and platform-specific optimizations. Users can manage multiple social accounts, schedule posts in advance, and track their content pipeline from a unified dashboard.</p>

            <p>Please answer the three questions above so I can refine the plan to match your exact requirements. Once you're ready to proceed, click the "Implement this plan" button to switch to build mode.</p>
          </article>

          <form className="sticky bottom-0 bg-white px-5 pb-5">
            <aside className="mx-1.75 px-2 py-1 flex justify-between text-xs bg-white border-t border-l border-r border-gray-200 rounded-t-lg">
              <span>300k daily tokens remaining.</span>

              <button className="cursor-pointer text-blue-500 hover:underline">
                Switch to Pro for 33x more usage
              </button>
            </aside>

            <div className="w-full px-3 pt-3 rounded-lg bg-gray-50 border border-gray-300">
              <label htmlFor="command" className="sr-only">Command</label>
              <textarea id="command" placeholder="How can Bolt help you today? (or /command)" className="w-full px-1.5 py-2 h-20 text-sm resize-none" />

              <nav className="flex items-center justify-between gap-3 py-1.5">
                <div className="flex items-center gap-1.5">
                  <button className="group/button cursor-pointer shrink-0">
                    <span className="sr-only">Upload</span>
                    <Plus size={30} className="bg-gray-200 group-hover/button:bg-gray-300 rounded-full p-1.25 transition-colors" />
                  </button>

                  <Button className="shrink-0">
                    <span className="text-gray-700 text-xs">Sonnet 4.5</span>
                    <ChevronsUpDown size={14} strokeWidth={1} className="stroke-gray-600" />
                  </Button>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button className="shrink-0">
                    <MousePointerClick size={18} strokeWidth={1} className="stroke-gray-600" />
                    <span className="text-gray-700 text-xs">Select</span>
                  </Button>

                  <Button className="shrink-0">
                    <Lightbulb size={18} strokeWidth={1} className="stroke-gray-600" />
                    <span className="text-gray-700 text-xs">Plan</span>
                  </Button>

                  <button className="group/button cursor-pointer shrink-0">
                    <span className="sr-only">Send Message</span>
                    <ArrowUp size={30} className="bg-blue-300 group-hover/button:bg-blue-500 stroke-white rounded-full p-1.25 transition-colors" />
                  </button>
                </div>
              </nav>
            </div>
          </form>
        </section>

        {/* Application Output */}
        <div className="md:col-span-6 lg:col-auto h-full overflow-scroll">
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
                <label htmlFor="url" className="sr-only">Page URL</label>
                <input id="url" type="text" value="/" className="flex-1 text-sm text-gray-800 dark:text-gray-300 mx-1 px-1" onChange={() => null} />

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
