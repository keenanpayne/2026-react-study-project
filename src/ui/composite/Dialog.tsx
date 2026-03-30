import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Dialog as BaseDialog } from '@base-ui/react/dialog';

type DialogProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

export default function Dialog(props: DialogProps) {
  return (
    <BaseDialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/35 dark:bg-black/50 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute z-20" />

        <BaseDialog.Popup className={`flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-50 dark:bg-zinc-800 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 max-h-[80dvh] overflow-hidden w-full md:max-w-xl z-30`}>
          <BaseDialog.Title className="mb-1 text-xl font-semibold flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-zinc-600">
            {props.title}
            <BaseDialog.Close className="cursor-pointer">
              <span className="sr-only">Close dialog</span>
              <X size={20} strokeWidth={1} />
            </BaseDialog.Close>
          </BaseDialog.Title>

          <div className="flex-1 flex flex-col gap-3 px-6 py-4 overflow-y-auto">
            {props.children}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}