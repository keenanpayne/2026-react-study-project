import type { ReactNode } from "react";

type WorkbenchContainerProps = {
  children: ReactNode;
  className?: string;
}

export default function WorkbenchContainer(props: WorkbenchContainerProps) {
  return (
    <main className={`flex-1 relative mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full ${props.className}`}>
      {props.children}
    </main>
  )
}