import { useEffect, useRef, useState, type ReactNode } from "react";

type ButtonProps = {
  as?: 'link' | 'button';
  href?: string;
  className?: string;
  size?: "flat" | "sm" | "md" | "lg";
  children: ReactNode;
  openChildren?: ReactNode;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sizeClass = 
    props.size === 'flat' ? '' : 
    props.size === 'sm' ? 'text-xs p-1 gap-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800' : 
    props.size === 'md' ? 'text-sm px-2.5 py-1.5 py-1 gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800' : 
    props.size === 'lg' ? 'text-base px-3 py-2 gap-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800' : '';
  const isOpenClass = isOpen ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-transparent';
  const styles = `cursor-pointer text-left relative flex items-center transition-colors ${sizeClass} ${props.className ? props.className : ''} ${isOpenClass}`;

  useEffect(() => {
    if (!isOpen) return;

    // Close dropdown when clicking away
    const handlePointerDown = (event: PointerEvent) => {
      const root = linkRef.current ?? buttonRef.current;

      if (root && !root.contains(event.target as Node)) {
        setIsOpen(false);
        linkRef.current?.focus();
        buttonRef.current?.focus();
      }
    };

    // Close dropdown with `esc` key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        linkRef.current?.focus();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen])

  if (props.as === "link") {
    return (
      <a ref={linkRef} className={styles} href={props.href} onClick={() => { props.onClick?.(); }}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button ref={buttonRef} className={styles} onClick={() => { setIsOpen(!isOpen); props.onClick?.(); }}>
        {props.children}

        {isOpen && props.openChildren}
      </button>
    );
  }
}