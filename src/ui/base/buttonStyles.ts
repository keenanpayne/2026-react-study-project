export type ButtonSize = "flat" | "sm" | "md" | "lg";
export type ButtonRadius = "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "ghost" | "plain" | "selected" | "subtle" | "primary";

import { cx } from "../../utils/cx";

type ButtonClassNameOptions = {
  size?: ButtonSize;
  radius?: ButtonRadius;
  variant?: ButtonVariant;
  iconOnly?: boolean;
  className?: string;
};

const baseClassName =
  "inline-flex cursor-pointer items-center text-left transition-colors disabled:pointer-events-none disabled:opacity-50";

const sizeClassNameMap: Record<ButtonSize, string> = {
  flat: "",
  sm: "text-xs p-1 gap-1.5",
  md: "text-sm px-2 py-1.5 gap-2",
  lg: "text-base px-3 py-2 gap-2.5",
};

const iconOnlyClassNameMap: Record<ButtonSize, string> = {
  flat: "",
  sm: "justify-center p-1.5 gap-0",
  md: "justify-center p-2 gap-0",
  lg: "justify-center p-2.5 gap-0",
};

const radiusClassNameMap: Record<ButtonRadius, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const variantClassNameMap: Record<ButtonVariant, string> = {
  ghost: "hover:bg-gray-100 dark:hover:bg-zinc-700",
  plain: "",
  selected: "bg-sky-200/50 hover:bg-sky-200/50 dark:bg-sky-900/75 dark:hover:bg-sky-900/75",
  subtle: "bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",
  primary: "bg-gray-900 text-white hover:bg-gray-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300",
};

export function getButtonClassName({
  size = "md",
  radius,
  variant,
  iconOnly = false,
  className,
}: ButtonClassNameOptions) {
  const resolvedVariant = variant ?? (size === "flat" ? "plain" : "ghost");

  return cx(
    baseClassName,
    iconOnly ? iconOnlyClassNameMap[size] : sizeClassNameMap[size],
    radius ? radiusClassNameMap[radius] : "",
    variantClassNameMap[resolvedVariant],
    className,
  );
}
