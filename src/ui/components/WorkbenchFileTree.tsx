import type { ReactNode } from "react";

type WorkbenchFileTreeProps = {
  children: ReactNode;
}

export default function WorkbenchFileTree(props: WorkbenchFileTreeProps) {
  return (
    <ul className="text-left h-full">
      {props.children}
    </ul>
  )
}