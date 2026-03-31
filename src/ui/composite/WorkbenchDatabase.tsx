import { Rows3 } from "lucide-react";
import WorkbenchContainer from "../base/WorkbenchContainer";
import WorkbenchContents from "../base/WorkbenchContents";
import WorkbenchRightContent from "../base/WorkbenchRightContent";
import WorkbenchLeftSidebar from "./WorkbenchLeftSidebar";
import { MockWorkbenchDatabaseTables, type MockWorkbenchDatabaseTable } from "../../data/MockWorkbenchCodebase";

interface DatabaseTableProps {
  table: MockWorkbenchDatabaseTable;
}

function DatabaseTable(props: DatabaseTableProps) {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer px-4 py-2.5 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors rounded-lg border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600">
      <div className="flex items-center gap-2">
        <Rows3 size={16} strokeWidth={1.5} className="stroke-gray-700 dark:stroke-zinc-300" />
        <span>{props.table.name}</span>
      </div>

      <p className="text-sm text-gray-500 dark:text-zinc-400">
        {props.table.children.length} row{props.table.children.length > 1 ? "s" : ""}
      </p>
    </div>
  )
}
type WorkbenchDatabaseProps = {
  isVisible: boolean;
}

export default function WorkbenchDatabase(props: WorkbenchDatabaseProps) {
  if (!props.isVisible) return null;

  return (
    <WorkbenchContainer>
      <WorkbenchContents>
        {/* <WorkbenchLeftSidebar fileList={props.fileList} /> */}

        <WorkbenchRightContent>
          <div className="p-5 flex flex-col gap-3">
            <header className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">Database Tables</h1>
              <p>View and manage database tables and records. Ask Bolt to create or modify tables.</p>
            </header>


            <div className="grid grid-cols-3 gap-3">
              {MockWorkbenchDatabaseTables.map((table) => (
                <DatabaseTable key={table.id} table={table} />
              ))}
            </div> 
          </div>
        </WorkbenchRightContent>
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}