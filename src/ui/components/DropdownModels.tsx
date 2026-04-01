import { Lock } from 'lucide-react'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'
import DropdownLabel from './DropdownLabel'

type ModelRow = {
  id: string
  label: string
  logoSrc: string
  status: 'active' | 'locked' | 'comingSoon'
}

const MODEL_ROWS: ModelRow[] = [
  {
    id: 'sonnet-4.5',
    label: 'Sonnet 4.5',
    logoSrc: '/anthropic.svg',
    status: 'active',
  },
  {
    id: 'haiku-4.5',
    label: 'Haiku 4.5',
    logoSrc: '/anthropic.svg',
    status: 'locked',
  },
  {
    id: 'sonnet-4.6',
    label: 'Sonnet 4.6',
    logoSrc: '/anthropic.svg',
    status: 'locked',
  },
  {
    id: 'opus-4.5',
    label: 'Opus 4.5',
    logoSrc: '/anthropic.svg',
    status: 'locked',
  },
  {
    id: 'opus-4.6',
    label: 'Opus 4.6',
    logoSrc: '/anthropic.svg',
    status: 'locked',
  },
]

const CODEX_ROW: ModelRow = {
  id: 'codex',
  label: 'Codex',
  logoSrc: '/openai.webp',
  status: 'comingSoon',
}

function ModelItem({ row, onSelect }: { row: ModelRow; onSelect: () => void }) {
  return (
    <DropdownItem
      size="sm"
      role="option"
      icon={
        <img
          src={row.logoSrc}
          alt=""
          className="h-4 w-4 shrink-0 object-contain"
          loading="lazy"
        />
      }
      title={
        <>
          <span className="font-medium">{row.label}</span>
          {row.status === 'comingSoon' && (
            <span className="text-text-muted ml-1 text-xs font-normal">
              (Coming Soon)
            </span>
          )}
        </>
      }
      selected={row.status === 'active'}
      disabled={row.status === 'locked' || row.status === 'comingSoon'}
      trailing={
        row.status === 'locked' ? (
          <Lock
            size={14}
            strokeWidth={1.5}
            className="stroke-icon-default shrink-0"
            aria-hidden
          />
        ) : undefined
      }
      onSelect={onSelect}
    />
  )
}

export default function DropdownModels() {
  const closeCtx = useDropdownTriggerClose()

  const handleRowActivate = () => {
    closeCtx?.close()
  }

  return (
    <Dropdown align="top" className="min-w-50">
      <DropdownList role="listbox">
        <DropdownLabel label="Select a Model" />

        {MODEL_ROWS.map((row) => (
          <ModelItem key={row.id} row={row} onSelect={handleRowActivate} />
        ))}

        <DropdownSeparator />

        <ModelItem row={CODEX_ROW} onSelect={handleRowActivate} />
      </DropdownList>
    </Dropdown>
  )
}
