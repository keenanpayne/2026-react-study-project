import { useState } from "react";
import { Database } from "lucide-react";
import WorkbenchContainer from "../base/WorkbenchContainer";
import WorkbenchContents from "../base/WorkbenchContents";
import WorkbenchRightContent from "../base/WorkbenchRightContent";
import WorkbenchLeftSidebar from "./WorkbenchLeftSidebar";
import { type MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";

type WorkbenchDatabaseProps = {
  list: MockWorkbenchFileTreeNode[];
  isVisible: boolean;
}

export default function WorkbenchDatabase(props: WorkbenchDatabaseProps) {
  const [selectedNode, setSelectedNode] = useState<MockWorkbenchFileTreeNode | null>(null);

  if (!props.isVisible) return null;

  return (
    <WorkbenchContainer>
      <WorkbenchContents>
        <WorkbenchLeftSidebar list={props.list} listLabel="Tables" listIcon={Database} selectedNode={selectedNode} onSelect={setSelectedNode} />

        <WorkbenchRightContent>
          <div className="p-5 flex flex-col gap-3">
            <header className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">
                {selectedNode ? selectedNode.name : "Selected tab"}
              </h1>
              
              <p>
                {selectedNode
                  ? `Viewing ${selectedNode.children?.length ?? 0} ${selectedNode.type === "table" ? "rows" : "columns"}`
                  : "View and manage database tables and records. Ask Bolt to create or modify tables."}
              </p>
            </header>

            <div className="grid grid-cols-3 gap-3">
              {selectedNode?.children?.map((child) => (
                <div
                  key={child.name}
                  className="rounded-lg border border-gray-200 dark:border-zinc-700 p-3 flex flex-col gap-1"
                >
                  <span className="text-sm font-medium">{child.name}</span>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">{child.type}</span>
                </div>
              ))}
            </div>
          </div>
        </WorkbenchRightContent>
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}