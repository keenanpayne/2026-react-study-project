import { useRef, useEffect, type KeyboardEvent } from 'react'
import { Search } from 'lucide-react'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  onBlur?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  className?: string
  icon?: ReactNode
  iconSize?: number
  iconStrokeWidth?: number
}

export default function SearchInput(props: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus()
    }
  }, [props.autoFocus])

  return (
    <div
      className={`flex items-center gap-2 rounded-md focus-within:shadow-[0_0_0_2px_var(--color-focus-ring)] ${props.className ?? ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {props.icon ? (
        props.icon
      ) : (
        <Search
          size={props.iconSize ?? 16}
          strokeWidth={props.iconStrokeWidth ?? 1}
        />
      )}
      <input
        ref={inputRef}
        type="search"
        placeholder={props.placeholder ?? 'Search'}
        className="w-full border-0 bg-transparent py-2 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
      />
    </div>
  )
}
