type EmptyPaneProps = {
  title: string
  description: string
}

export default function EmptyPane({ title, description }: EmptyPaneProps) {
  return (
    <div className="bg-surface-muted h-full w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-1.5 p-8 text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  )
}
