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
        aria-hidden="true"
      />
    )
  if (props.type === 'directory' && props.open)
    return (
      <FolderOpen
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
        aria-hidden="true"
      />
    )
  if (props.type === 'file')
    return (
      <FileIcon
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
        aria-hidden="true"
      />
    )
  if (props.type === 'table')
    return (
      <TableProperties
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
        aria-hidden="true"
      />
    )
  if (props.type === 'row')
    return (
      <Rows3
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
        aria-hidden="true"
      />
    )
  if (props.type === 'column')
    return (
      <Columns3
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        className={iconClassName}
        aria-hidden="true"
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
      <button
        type="button"
        className={`flex w-full cursor-pointer items-center gap-1.5 py-1 pr-1.5 text-left text-sm transition-colors ${props.selected ? 'bg-selected' : 'text-text-muted hover:bg-hover-item hover:text-text-heading'}`}
        style={{ paddingLeft: `${0.375 + depth * 0.625}rem` }}
        aria-expanded={props.hasChildren ? props.open : undefined}
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
            aria-hidden="true"
            className={`shrink-0 transition-transform ${props.open ? 'rotate-90' : ''}`}
          />
        )}
      </button>

      {props.children}
    </li>
  )
}
