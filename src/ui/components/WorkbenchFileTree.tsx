import type { ReactNode } from 'react'

type WorkbenchFileTreeProps = {
  children: ReactNode
}

export default function WorkbenchFileTree({
  children,
}: WorkbenchFileTreeProps) {
  return <ul className="h-full text-left">{children}</ul>
}
