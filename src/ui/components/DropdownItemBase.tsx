import type { ReactNode } from 'react'

const PREPEND_APPEND_CLASS = 'text-xs text-text-muted block w-full'

type DropdownItemBaseProps = {
  title: ReactNode
  prepend?: string
  append?: string
  icon?: ReactNode
  trailing?: ReactNode
  children?: ReactNode
}

export default function DropdownItemBase({
  title,
  prepend,
  append,
  icon,
  trailing,
  children,
}: DropdownItemBaseProps) {
  return (
    <>
      <span className="flex flex-1 items-center gap-2.5">
        {icon}

        <span>
          {prepend && <span className={PREPEND_APPEND_CLASS}>{prepend}</span>}
          {title}
          {append && <span className={PREPEND_APPEND_CLASS}>{append}</span>}
        </span>
      </span>

      {trailing}
      {children}
    </>
  )
}
