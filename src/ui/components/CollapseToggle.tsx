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
}: CollapseToggleProps) {
  const Icon = iconMap[direction][isExpanded ? 'expanded' : 'collapsed']

  return (
    <Button
      size="sm"
      radius="md"
      variant="ghost"
      iconOnly
      onClick={onToggle}
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      aria-expanded={isExpanded}
      className={className}
    >
      <Icon size={18} strokeWidth={1} />
    </Button>
  )
}
