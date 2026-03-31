type CodeStringProps = {
  text: string
}

export default function CodeString(props: CodeStringProps) {
  return (
    <code className="rounded-sm border border-gray-300 bg-gray-100 px-1 py-0.75 font-mono text-xs dark:border-zinc-600 dark:bg-zinc-700">
      {props.text}
    </code>
  )
}
