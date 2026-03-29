type CodeStringProps = {
  text: string;
}

export default function CodeString(props: CodeStringProps) {
  return (
    <code className="bg-gray-100 border border-gray-300 rounded-sm px-1 py-0.75 text-xs font-mono">{props.text}</code>
  );
}