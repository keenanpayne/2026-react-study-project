import type { ReactNode } from 'react'

type WorkbenchFileTreeProps = {
  children: ReactNode
}

export default function WorkbenchFileTree(props: WorkbenchFileTreeProps) {
  return <ul className="h-full text-left">{props.children}</ul>
}
