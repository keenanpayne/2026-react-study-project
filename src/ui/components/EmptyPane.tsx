type EmptyPaneProps = {
  title: string
  description: string
}

export default function EmptyPane(props: EmptyPaneProps) {
  return (
    <div className="h-full w-full bg-gray-100 dark:bg-zinc-800">
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-1.5 p-8 text-center">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <p className="text-lg">{props.description}</p>
      </main>
    </div>
  )
}
