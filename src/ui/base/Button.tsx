import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonRadius,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type SharedButtonProps = {
  as?: "a" | "button";
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  radius?: ButtonRadius;
  variant?: ButtonVariant;
  iconOnly?: boolean;
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
  const buttonClassName = getButtonClassName({
    size,
    radius,
    variant,
    iconOnly,
    className,
  });

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