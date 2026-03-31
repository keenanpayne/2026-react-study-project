type DropdownLabelProps = {
  label: string;
}

export default function DropdownLabel(props: DropdownLabelProps) {
  return (
    <li className="cursor-default px-3 mt-2 text-gray-500 dark:text-zinc-300 text-xs">{props.label}</li>
  );
}