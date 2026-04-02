import { useCallback, type KeyboardEvent, type ReactNode } from 'react'
import { Search } from 'lucide-react'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  focusOnMount?: boolean
  onBlur?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  className?: string
  icon?: ReactNode
  iconSize?: number
  iconStrokeWidth?: number
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  focusOnMount,
  onBlur,
  onKeyDown,
  className,
  icon,
  iconSize,
  iconStrokeWidth,
}: SearchInputProps) {
  const inputRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (focusOnMount && node) node.focus()
    },
    [focusOnMount],
  )

  return (
    <div
      className={`flex items-center gap-2 rounded-md focus-within:shadow-[0_0_0_2px_var(--color-focus-ring)] ${className ?? ''}`}
      role="search"
    >
      {icon ? (
        icon
      ) : (
        <Search
          size={iconSize ?? 16}
          strokeWidth={iconStrokeWidth ?? 1}
          aria-hidden="true"
        />
      )}
      <input
        ref={inputRef}
        type="search"
        aria-label={placeholder ?? 'Search'}
        placeholder={placeholder ?? 'Search'}
        className="w-full border-0 bg-transparent py-2 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
