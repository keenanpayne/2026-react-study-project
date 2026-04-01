import type { ReactNode } from 'react'

type DropdownListProps = {
  children: ReactNode
  role?: 'menu' | 'listbox'
}

export default function DropdownList({
  children,
  role = 'menu',
}: DropdownListProps) {
  return <ul role={role}>{children}</ul>
}
