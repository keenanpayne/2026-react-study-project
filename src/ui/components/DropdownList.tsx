import type { ReactNode } from 'react'

type DropdownListProps = {
  children: ReactNode
}

export default function DropdownList({ children }: DropdownListProps) {
  return <ul role="listbox">{children}</ul>
}
