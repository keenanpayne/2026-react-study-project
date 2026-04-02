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
import type { FileTreeItemType } from '~/types/workbench'
import { cx } from '~/utils/cx'

const ICON_SIZE = 14
const ICON_STROKE_WIDTH = 1.5
const ICON_CLASS = 'shrink-0'

const ICON_BY_TYPE: Record<
  FileTreeItemType,
  typeof FileIcon | [typeof FolderClosed, typeof FolderOpen]
> = {
  directory: [FolderClosed, FolderOpen],
  file: FileIcon,
  table: TableProperties,
  row: Rows3,
  column: Columns3,
}

function WorkbenchFileIcon({
  type,
  open,
}: {
  type?: FileTreeItemType
  open?: boolean
}) {
  if (!type) return null

  const entry = ICON_BY_TYPE[type]
  const Icon = Array.isArray(entry) ? (open ? entry[1] : entry[0]) : entry

  return (
    <Icon
      size={ICON_SIZE}
      strokeWidth={ICON_STROKE_WIDTH}
      className={ICON_CLASS}
      aria-hidden="true"
    />
  )
}

type WorkbenchFileProps = {
  name: string
  type?: FileTreeItemType
  children?: ReactNode
  depth?: number
  open?: boolean
  selected?: boolean
  hasChildren?: boolean
  truncate?: boolean
  onToggle?: () => void
  onClick?: () => void
}

export default function WorkbenchFile({
  name,
  type,
  children,
  depth = 0,
  open,
  selected,
  hasChildren,
  truncate,
  onToggle,
  onClick,
}: WorkbenchFileProps) {
  return (
    <li>
      <button
        type="button"
        className={`flex w-full cursor-pointer items-center gap-1.5 py-1 pr-1.5 text-left text-sm transition-colors ${selected ? 'bg-selected' : 'text-text-muted hover:bg-hover-item hover:text-text-heading'}`}
        style={{ paddingLeft: `${0.375 + depth * 0.625}rem` }}
        aria-expanded={hasChildren ? open : undefined}
        onClick={() => {
          if (hasChildren) onToggle?.()
          onClick?.()
        }}
      >
        <span
          className={cx(
            'flex flex-1 items-center gap-1.5',
            truncate && 'min-w-0',
          )}
        >
          <WorkbenchFileIcon type={type} open={open} />
          <span className={cx('select-none', truncate && 'truncate')}>
            {name}
          </span>
        </span>

        {hasChildren && (
          <ChevronRight
            size={14}
            strokeWidth={1}
            aria-hidden="true"
            className={`shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
          />
        )}
      </button>

      {children}
    </li>
  )
}
