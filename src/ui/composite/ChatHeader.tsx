import { ChevronsUpDown, Lock } from "lucide-react";
import { teams, currentProject } from "../../data/mock";
import DropdownProjects from "./DropdownProjects";
import UserTeams from "./UserTeams";
import Button from "../base/Button";
import DropdownTrigger from "./DropdownTrigger";
import Separator from "../base/Separator";

export default function ChatHeader() {
  return (
    <header className="px-2.5 py-1.5 sticky top-0 left-0 bg-white dark:bg-zinc-900 z-10">
      <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
        <Button size="md" radius="md" as="a" href="https://bolt.new" className="shrink-0 h-10">
          <img src="/bolt-logo-wordmark.png" alt="Bolt.new" className="h-6 dark:invert-100" />
        </Button>

        <Separator />

        <DropdownTrigger
          size="md"
          radius="md"
          className="h-9"
          wrapperClassName="shrink-0"
          dropdown={<UserTeams data={teams} />}
        >
          <img src="/me.jpg" className="w-6 h-6 rounded-full border border-gray-300 dark:border-zinc-700" />
          <ChevronsUpDown size={16} strokeWidth={2} className="stroke-gray-400 dark:stroke-zinc-400" />
        </DropdownTrigger>

        <Separator />

        <DropdownTrigger size="md" radius="md" className="h-9" dropdown={<DropdownProjects />}>
          <span className="text-xs md:text-sm font-medium">{currentProject.title}</span>
          {currentProject.private && <Lock strokeWidth={1.5} size={14} />}
        </DropdownTrigger>
      </nav>
    </header>
  )
};