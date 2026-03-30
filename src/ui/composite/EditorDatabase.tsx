type EditorDatabaseProps = {
  isVisible: boolean;
}

export default function EditorDatabase(props: EditorDatabaseProps) {
  if (!props.isVisible) return null;

  return (
    <div className="flex-1 relative mb-3 bg-gray-900 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full">
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg min-w-xs lg:min-w-md">
        <h1>Database</h1>
      </main>
    </div>
  )
}