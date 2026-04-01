type DropdownLabelProps = {
  label: string
}

export default function DropdownLabel(props: DropdownLabelProps) {
  return (
    <li
      role="presentation"
      className="text-text-muted mt-2 cursor-default px-3 text-xs font-medium"
    >
      {props.label}
    </li>
  )
}
