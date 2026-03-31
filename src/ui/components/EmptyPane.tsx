type EmptyPaneProps = {
  title: string;
  description: string;
}

export default function EmptyPane(props: EmptyPaneProps) {
  return (
    <div className="bg-gray-100 dark:bg-zinc-800 w-full h-full">
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 text-center space-y-1.5">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <p className="text-lg">{props.description}</p>
      </main>
    </div>
  )
}