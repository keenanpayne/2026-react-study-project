type DropdownLabelProps = {
  label: string
}

export default function DropdownLabel({ label }: DropdownLabelProps) {
  return (
    <li
      role="none"
      className="text-text-muted mt-2 cursor-default px-3 text-xs font-medium"
    >
      {label}
    </li>
  )
}
