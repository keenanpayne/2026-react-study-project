import type { ReactNode } from "react";
import EmptyPane from "../base/EmptyPane";

type WorkbenchPreviewProps = {
  isVisible: boolean;
  children?: ReactNode;
}

export default function WorkbenchPreview(props: WorkbenchPreviewProps) {
  if (!props.isVisible) return null;

  return (
    <div className="flex-1 relative mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full overflow-hidden">
      {props.children ? props.children : <EmptyPane title="No preview available" description="Prompt the chat to generate a preview of the output." />}
    </div>
  )
}