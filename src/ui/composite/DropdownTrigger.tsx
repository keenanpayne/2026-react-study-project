import { useEffect, useRef, useState, type ReactNode } from "react";
import Button, { type ButtonProps } from "../base/Button";
import { cx } from "../../utils/cx";

type DropdownTriggerProps = Extract<ButtonProps, { as?: "button" }> & {
  dropdown: ReactNode;
  wrapperClassName?: string;
};

export default function DropdownTrigger(props: DropdownTriggerProps) {
  const { dropdown, wrapperClassName, onClick, children, ...buttonProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Close dropdown when clicking away
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close dropdown with `esc` key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        const trigger = rootRef.current?.querySelector<HTMLElement>("[data-dropdown-trigger='true']");
        trigger?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={cx("relative inline-flex", wrapperClassName)}>
      <Button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        data-dropdown-trigger="true"
        onClick={(event) => {
          setIsOpen((current) => !current);
          onClick?.(event);
        }}
        {...buttonProps}
      >
        {children}
      </Button>

      {isOpen ? dropdown : null}
    </div>
  );
}
