import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonStyles } from "./buttonStyles";

type SharedButtonProps = VariantProps<typeof buttonStyles> & {
  as?: "a" | "button";
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps | "href"> & {
    as?: "button";
    href?: never;
  };

type ButtonAsAnchorProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export default function Button({
  as = "button",
  children,
  className,
  size,
  radius,
  variant,
  iconOnly,
  ...rest
}: ButtonProps) {
  const resolvedVariant = variant ?? (size === "flat" ? "plain" : "ghost");
  const buttonClassName = buttonStyles({ size, radius, variant: resolvedVariant, iconOnly, className });

  if (as === "a") {
    const anchorProps = rest as Omit<ButtonAsAnchorProps, keyof SharedButtonProps>;

    return (
      <a className={buttonClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    ButtonAsButtonProps,
    keyof SharedButtonProps
  >;

  return (
    <button type={type} className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}