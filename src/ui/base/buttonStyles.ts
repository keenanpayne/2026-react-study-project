import { cva, type VariantProps } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex cursor-pointer items-center text-left transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        flat: "",
        sm: "text-xs p-1 gap-1.5",
        md: "text-sm px-2 py-1.5 gap-2",
        lg: "text-base px-3 py-2 gap-2.5",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      variant: {
        ghost: "hover:bg-gray-100 dark:hover:bg-zinc-700",
        plain: "",
        selected:
          "bg-sky-200/50 hover:bg-sky-200/50 dark:bg-sky-900/75 dark:hover:bg-sky-900/75",
        subtle:
          "bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",
        primary:
          "bg-gray-900 text-white hover:bg-gray-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300",
      },
      iconOnly: {
        false: null,
        true: null,
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "justify-center p-1.5 gap-0" },
      { iconOnly: true, size: "md", class: "justify-center p-2 gap-0" },
      { iconOnly: true, size: "lg", class: "justify-center p-2.5 gap-0" },
    ],
    defaultVariants: {
      size: "md",
      variant: "ghost",
      iconOnly: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonStyles>;
export type ButtonSize = NonNullable<ButtonVariants["size"]>;
export type ButtonRadius = NonNullable<ButtonVariants["radius"]>;
export type ButtonVariant = NonNullable<ButtonVariants["variant"]>;
