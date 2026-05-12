import type { ReactElement, ReactNode } from 'react'
import {
  Tooltip as BaseTooltip,
  type TooltipPositionerProps,
  type TooltipRootProps,
  type TooltipTriggerProps,
} from '@base-ui/react/tooltip'
import { cx } from '~/utils/cx'

type TooltipProps = Omit<TooltipRootProps, 'children'> & {
  children: ReactElement
  content: ReactNode
  className?: string
  triggerClassName?: string
  positionerClassName?: string
  popupClassName?: string
  side?: TooltipPositionerProps['side']
  align?: TooltipPositionerProps['align']
  sideOffset?: TooltipPositionerProps['sideOffset']
  alignOffset?: TooltipPositionerProps['alignOffset']
  collisionPadding?: TooltipPositionerProps['collisionPadding']
  delay?: TooltipTriggerProps['delay']
  closeDelay?: TooltipTriggerProps['closeDelay']
  closeOnClick?: TooltipTriggerProps['closeOnClick']
}

export default function Tooltip({
  children,
  content,
  className,
  triggerClassName,
  positionerClassName,
  popupClassName,
  side = 'top',
  align = 'center',
  sideOffset = 8,
  alignOffset,
  collisionPadding,
  delay,
  closeDelay,
  closeOnClick,
  ...rootProps
}: TooltipProps) {
  return (
    <BaseTooltip.Root {...rootProps}>
      <BaseTooltip.Trigger
        render={children}
        className={triggerClassName}
        delay={delay}
        closeDelay={closeDelay}
        closeOnClick={closeOnClick}
      />

      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
          className={positionerClassName}
        >
          <BaseTooltip.Popup
            className={cx(
              'bg-inverse text-text-inverse z-50 max-w-64 rounded-md px-2 py-1 text-xs font-medium shadow-lg transition-all duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
              className,
              popupClassName,
            )}
          >
            <BaseTooltip.Arrow className="pointer-events-none flex size-2.5 items-center justify-center data-[side=bottom]:-top-[5px] data-[side=left]:-right-[5px] data-[side=right]:-left-[5px] data-[side=top]:-bottom-[5px]">
              <span className="bg-inverse block size-2 rotate-45 rounded-[1px]" />
            </BaseTooltip.Arrow>

            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}

export type { TooltipProps }
