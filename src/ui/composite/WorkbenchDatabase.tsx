import { Rows3 } from "lucide-react";

type DatabaseTable = {
  id: number;
  name: string;
  rows: DatabaseTableRow[];
}

type DatabaseTableRow = {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const databaseTables: DatabaseTable[] = [
  {
    id: 1,
    name: "posts",
    rows: [
      {
        id: 1,
        title: "Post 1",
        content: "Content 1",
        created_at: "2021-01-01",
      },
    ],
  },
  {
    id: 2,
    name: "post_media",
    rows: [
      {
        id: 1,
        title: "Post Media 1",
        content: "Content 1",
        created_at: "2021-01-01",
      },
    ],
  },
  {
    id: 3,
    name: "social_accounts",
    rows: [
      {
        id: 1,
        title: "Social Account 1",
        content: "Content 1",
        created_at: "2021-01-01",
      },
    ],
  },
  {
    id: 4,
    name: "post_platforms",
    rows: [
      {
        id: 1,
        title: "Post Platform 1",
        content: "Content 1",
        created_at: "2021-01-01",
      },
    ],
  },
  {
    id: 5,
    name: "users",
    rows: [
      {
        id: 1,
        title: "User 1",
        content: "Content 1",
        created_at: "2021-01-01",
      },
    ],
  },
];

interface DatabaseTableProps {
  table: DatabaseTable;
}

function DatabaseTable(props: DatabaseTableProps) {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer px-4 py-2.5 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors rounded-lg border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600">
      <div className="flex items-center gap-2">
        <Rows3 size={16} strokeWidth={1.5} className="stroke-gray-700 dark:stroke-zinc-300" />
        <span>{props.table.name}</span>
      </div>

      <p className="text-sm text-gray-500 dark:text-zinc-400">{props.table.rows.length} row{props.table.rows.length > 1 ? "s" : ""}</p>
    </div>
  )
}
type WorkbenchDatabaseProps = {
  isVisible: boolean;
}

export default function WorkbenchDatabase(props: WorkbenchDatabaseProps) {
  if (!props.isVisible) return null;

  return (
    <main className="bg-gray-50 dark:bg-zinc-800 flex-1 relative mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full">
      <div className="p-5 flex flex-col gap-3">
        <header className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Database Tables</h1>
          <p>View and manage database tables and records. Ask Bolt to create or modify tables.</p>
        </header>


        <div className="grid grid-cols-3 gap-3">
          {databaseTables.map((table) => (
            <DatabaseTable key={table.id} table={table} />
          ))}
        </div> 
      </div>
    </main>
  )
}