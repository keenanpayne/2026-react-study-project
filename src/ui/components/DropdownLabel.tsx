type DropdownLabelProps = {
  label: string
}

export default function DropdownLabel(props: DropdownLabelProps) {
  return (
    <li className="mt-2 cursor-default px-3 text-xs text-gray-500 dark:text-zinc-300">
      {props.label}
    </li>
  )
}
