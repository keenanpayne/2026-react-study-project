import type { ReactNode } from "react";

type WorkbenchContentsProps = {
  children: ReactNode;
}

export default function WorkbenchContents(props: WorkbenchContentsProps) {
  return (
    <div className="@container grid grid-cols-12 h-full">
      {props.children}
    </div>
  )
}