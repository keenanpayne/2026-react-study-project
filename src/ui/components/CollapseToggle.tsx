import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  PanelBottomClose,
  PanelBottomOpen,
} from 'lucide-react'
import Button from './Button'

type CollapseToggleProps = {
  isExpanded: boolean
  onToggle: () => void
  direction: 'horizontal' | 'horizontal-right' | 'vertical'
  className?: string
  controls?: string
  label?: string
}

const iconMap = {
  horizontal: { expanded: PanelLeftClose, collapsed: PanelLeftOpen },
  'horizontal-right': { expanded: PanelRightClose, collapsed: PanelRightOpen },
  vertical: { expanded: PanelBottomClose, collapsed: PanelBottomOpen },
} as const

export default function CollapseToggle({
  isExpanded,
  onToggle,
  direction,
  className,
  controls,
  label,
}: CollapseToggleProps) {
  const Icon = iconMap[direction][isExpanded ? 'expanded' : 'collapsed']
  const action = isExpanded ? 'Collapse' : 'Expand'
  const ariaLabel = label ? `${action} ${label}` : action

  return (
    <Button
      size="sm"
      radius="md"
      variant="ghost"
      iconOnly
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-expanded={isExpanded}
      aria-controls={controls}
      className={`shrink-0 ${className}`}
    >
      <Icon size={18} strokeWidth={1} aria-hidden="true" />
    </Button>
  )
}
