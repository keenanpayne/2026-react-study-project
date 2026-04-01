import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
  'inline-flex cursor-pointer items-center text-left transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        flat: '',
        sm: 'text-xs p-1 gap-1.5',
        md: 'text-sm px-1.25 sm:px-2 py-1.5 gap-1.5',
        lg: 'text-sm px-1.5 sm:px-2 sm:px-3 py-1.5 gap-1.5',
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        pill: 'rounded-full',
      },
      variant: {
        ghost: 'hover:bg-hover-item',
        plain: '',
        selected: 'bg-selected hover:bg-selected-hover',
        subtle: 'bg-surface-emphasis hover:bg-hover-strong',
        primary: 'bg-inverse text-text-inverse hover:bg-inverse-hover',
        danger: 'bg-danger text-white hover:bg-danger-hover',
        success: 'bg-success text-white hover:bg-success-hover',
      },
      iconOnly: {
        false: null,
        true: null,
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'sm', class: 'justify-center p-1.5 gap-0' },
      { iconOnly: true, size: 'md', class: 'justify-center p-2 gap-0' },
      { iconOnly: true, size: 'lg', class: 'justify-center p-2.5 gap-0' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'ghost',
      iconOnly: false,
    },
  },
)

type SharedButtonProps = VariantProps<typeof buttonStyles> & {
  as?: 'a' | 'button'
  children: ReactNode
  className?: string
}

type ButtonAsButtonProps = SharedButtonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof SharedButtonProps | 'href'
  > & {
    as?: 'button'
    href?: never
  }

type ButtonAsAnchorProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    as: 'a'
    href: string
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

export default function Button({
  as = 'button',
  children,
  className,
  size,
  radius,
  variant,
  iconOnly,
  ...rest
}: ButtonProps) {
  const resolvedVariant = variant ?? (size === 'flat' ? 'plain' : 'ghost')
  const buttonClassName = buttonStyles({
    size,
    radius,
    variant: resolvedVariant,
    iconOnly,
    className,
  })

  if (as === 'a') {
    const anchorProps = rest as Omit<
      ButtonAsAnchorProps,
      keyof SharedButtonProps
    >

    return (
      <a className={buttonClassName} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = rest as Omit<
    ButtonAsButtonProps,
    keyof SharedButtonProps
  >

  return (
    <button type={type} className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  )
}
