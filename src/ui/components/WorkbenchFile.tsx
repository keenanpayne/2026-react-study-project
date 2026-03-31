import {
  ChevronRight,
  Columns3,
  FileIcon,
  FolderClosed,
  FolderOpen,
  Rows3,
  TableProperties,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { MockWorkbenchFileTreeItemType } from '~/data/MockWorkbenchCodebase'

interface WorkbenchFileIconProps {
  type?: MockWorkbenchFileTreeItemType
  open?: boolean
}

function WorkbenchFileIcon(props: WorkbenchFileIconProps) {
  const iconSize = 14
  const iconStrokeWidth = 1.5
  const iconClassName = 'shrink-0'

  if (!props.type) return null

  if (props.type === 'directory' && !props.open)
    return (
      <FolderClosed
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
      />
    )
  if (props.type === 'directory' && props.open)
    return (
      <FolderOpen
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
      />
    )
  if (props.type === 'file')
    return (
      <FileIcon
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
      />
    )
  if (props.type === 'table')
    return (
      <TableProperties
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
      />
    )
  if (props.type === 'row')
    return (
      <Rows3
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
      />
    )
  if (props.type === 'column')
    return (
      <Columns3
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
      />
    )

  return null
}

type WorkbenchFileProps = {
  name: string
  type?: MockWorkbenchFileTreeItemType
  children?: ReactNode
  depth?: number
  open?: boolean
  selected?: boolean
  hasChildren?: boolean
  onToggle?: () => void
  onClick?: () => void
}

export default function WorkbenchFile(props: WorkbenchFileProps) {
  const depth = props.depth ?? 0

  return (
    <li>
      <div
        className={`flex cursor-pointer items-center gap-1.5 py-1 pr-1.5 text-sm transition-colors ${props.selected ? 'bg-sky-100 dark:bg-sky-800/50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'}`}
        style={{ paddingLeft: `${0.375 + depth * 0.625}rem` }}
        onClick={() => {
          if (props.hasChildren) props.onToggle?.()
          props.onClick?.()
        }}
      >
        <span className="flex flex-1 items-center gap-1.5">
          <WorkbenchFileIcon type={props.type} open={props.open} />
          <span className="select-none">{props.name}</span>
        </span>

        {props.hasChildren && (
          <ChevronRight
            size={14}
            strokeWidth={1}
            className={`shrink-0 transition-transform ${props.open ? 'rotate-90' : ''}`}
          />
        )}
      </div>

      {props.children}
    </li>
  )
}
