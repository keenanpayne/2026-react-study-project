type CodeStringProps = {
  text: string
}

export default function CodeString(props: CodeStringProps) {
  return (
    <code className="border-border-strong bg-surface-muted rounded-sm border px-1 py-0.75 font-mono text-xs">
      {props.text}
    </code>
  )
}
