import type { LucideIcon } from 'lucide-react'
import Button from './Button'
import { cx } from '~/utils/cx'

type ToggleButtonProps = {
  icon: LucideIcon
  label: string
  active: boolean
  onToggle: () => void
}

export default function ToggleButton({
  icon: Icon,
  label,
  active,
  onToggle,
}: ToggleButtonProps) {
  return (
    <Button
      size="md"
      radius="pill"
      variant={active ? 'selected' : 'ghost'}
      className="group/button shrink-0"
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
        className={cx(
          'text-xs',
          active ? 'text-text-selected' : 'text-text-secondary',
        )}
      >
        {label}
      </span>
    </Button>
  )
}
