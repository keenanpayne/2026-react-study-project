import type { KeyboardEvent } from 'react'
import { Lock } from 'lucide-react'
import Dropdown from './Dropdown'
import DropdownList from './DropdownList'
import DropdownSeparator from './DropdownSeparator'
import { useDropdownTriggerClose } from './dropdownTriggerCloseContext'
import DropdownLabel from './DropdownLabel'

const LOGO_CLASS = 'h-4 w-4 shrink-0 object-contain'
const ROW_CLASS =
  'mx-1 my-1 flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.25 text-sm transition-colors hover:bg-hover-item'

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

function ModelOption(props: { row: ModelRow; onActivate: () => void }) {
  const { row, onActivate } = props
  const locked = row.status === 'locked'
  const active = row.status === 'active'
  const comingSoon = row.status === 'comingSoon'

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onActivate()
    }
  }

  return (
    <li
      role="option"
      aria-selected={active}
      aria-disabled={locked || comingSoon}
      tabIndex={0}
      className={`${ROW_CLASS} ${locked ? 'opacity-55' : ''} ${active ? 'bg-selected hover:bg-selected-hover' : ''}`}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2">
        <img src={row.logoSrc} alt="" className={LOGO_CLASS} loading="lazy" />

        <span className="text-text-secondary min-w-0">
          <span className="font-medium">{row.label}</span>

          {comingSoon && (
            <span className="text-text-muted ml-1 text-xs font-normal">
              (Coming Soon)
            </span>
          )}
        </span>
      </span>

      {locked ? (
        <Lock
          size={14}
          strokeWidth={1.5}
          className="stroke-icon-default shrink-0"
          aria-hidden
        />
      ) : null}
    </li>
  )
}

export default function DropdownModels() {
  const closeCtx = useDropdownTriggerClose()

  const handleRowActivate = () => {
    closeCtx?.close()
  }

  return (
    <Dropdown align="top" className="min-w-50">
      <DropdownList>
        <DropdownLabel label="Select a Model" />

        {MODEL_ROWS.map((row) => (
          <ModelOption key={row.id} row={row} onActivate={handleRowActivate} />
        ))}

        <DropdownSeparator />

        <ModelOption row={CODEX_ROW} onActivate={handleRowActivate} />
      </DropdownList>
    </Dropdown>
  )
}
