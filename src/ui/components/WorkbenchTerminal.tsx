import { File, type FileContents } from '@pierre/diffs/react';
import Button from "./Button";
import { Zap, Rocket, SquareTerminal } from "lucide-react";
import { DIFF_TERMINAL_OPTIONS } from "~/utils/diffOptions";

type WorkbenchTerminalProps = {
  file: FileContents;
}

export default function WorkbenchTerminal(props: WorkbenchTerminalProps) {
  return (
    <section className="col-span-12 border-t border-gray-200 dark:border-zinc-700">
      <header className="p-1.5 border-b border-gray-200 dark:border-zinc-700">
        <nav className="flex items-center gap-2">
          <Button size="lg" radius="pill" variant="selected">
            <Zap size={18} strokeWidth={1.5} />
            Bolt
          </Button>

          <Button size="lg" radius="pill" variant="ghost">
            <Rocket size={18} strokeWidth={1.5} />
            Publish Output
          </Button>

          <Button size="lg" radius="pill" variant="ghost">
            <SquareTerminal size={18} strokeWidth={1.5} />
            Terminal
          </Button>
        </nav>
      </header>

      <File
        file={props.file}
        options={DIFF_TERMINAL_OPTIONS}
        className="max-h-[200px] overflow-scroll rounded-b-xl px-1.5 py-0.5 text-xs leading-tight"
      />
    </section>
  )
}