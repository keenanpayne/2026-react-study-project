import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

type DialogProps = {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: ReactNode
}

export default function Dialog(props: DialogProps) {
  return (
    <BaseDialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-20 min-h-dvh bg-black/35 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:bg-black/50 dark:opacity-70" />

        <BaseDialog.Popup
          className={`fixed top-1/2 left-1/2 z-30 flex max-h-[80dvh] w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-gray-50 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 md:max-w-xl dark:bg-zinc-800`}
        >
          <BaseDialog.Title className="mb-1 flex items-center justify-between border-b border-gray-300 px-6 py-4 text-xl font-semibold dark:border-zinc-600">
            {props.title}

            <BaseDialog.Close className="cursor-pointer">
              <span className="sr-only">Close dialog</span>
              <X size={20} strokeWidth={1} />
            </BaseDialog.Close>
          </BaseDialog.Title>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-4">
            {props.children}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
