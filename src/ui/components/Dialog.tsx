import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

type DialogProps = {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: ReactNode
}

export default function Dialog({
  title,
  open,
  onOpenChange,
  children,
}: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="bg-surface-overlay fixed inset-0 z-20 min-h-dvh transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />

        <BaseDialog.Popup
          className={`bg-surface-raised fixed top-1/2 left-1/2 z-30 flex max-h-[75dvh] w-[calc(100%-var(--spacing)*6)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 md:max-h-[80dvh] md:w-full md:max-w-xl`}
        >
          <BaseDialog.Title className="border-border-strong mb-1 flex items-center justify-between border-b px-6 py-4 text-xl font-semibold">
            {title}

            <BaseDialog.Close className="cursor-pointer">
              <span className="sr-only">Close dialog</span>
              <X size={20} strokeWidth={1} />
            </BaseDialog.Close>
          </BaseDialog.Title>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-4">
            {children}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
