import type { LucideIcon } from 'lucide-react'
import Button from './Button'
import { cx } from '~/utils/cx'

type ToggleButtonProps = {
  icon: LucideIcon
  label: string
  active: boolean
  onToggle: () => void
  displayLabelOnHover?: boolean
}

export default function ToggleButton({
  icon: Icon,
  label,
  active,
  onToggle,
  displayLabelOnHover = false,
}: ToggleButtonProps) {
  return (
    <Button
      size="md"
      radius="pill"
      variant={active ? 'selected' : 'ghost'}
      className={cx(
        'group/button flex shrink-0 items-center',
        displayLabelOnHover && 'gap-0 hover:gap-1 focus-visible:gap-1',
      )}
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onToggle}
    >
      <Icon
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
        className={cx(
          'transition-colors',
          active
            ? 'stroke-icon-active group-hover/button:stroke-icon-active'
            : 'icon-interactive group-hover/button:stroke-icon-hover',
        )}
      />
      <span
        aria-hidden={displayLabelOnHover ? true : undefined}
        className={cx(
          'text-xs leading-normal',
          active ? 'text-onBrandContainer' : 'text-text-secondary',
          displayLabelOnHover &&
            'max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 group-hover/button:max-w-52 group-hover/button:opacity-100 group-focus-visible/button:max-w-52 group-focus-visible/button:opacity-100',
        )}
      >
        {label}
      </span>
    </Button>
  )
}
