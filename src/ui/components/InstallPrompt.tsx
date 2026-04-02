import { useState } from 'react'
import { useInstallPrompt } from '~/hooks/useInstallPrompt'
import Button from './Button'
import BoltLogo from './BoltLogo'

export default function InstallPrompt() {
  const { isInstallable, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('pwa-install-dismissed') === 'true',
  )

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true')
    setDismissed(true)
  }

  if (!isInstallable || dismissed) return null

  return (
    <div
      role="alertdialog"
      aria-label="Install application"
      className="border-border-default bg-surface-raised fixed right-4 bottom-45 left-4 z-100 flex items-center justify-between gap-5 rounded-lg border px-4 py-3 shadow-xl md:right-4 md:bottom-4 md:left-auto md:max-w-sm"
    >
      <div className="flex items-center gap-3">
        <BoltLogo className="h-5 shrink-0" wordmark />

        <p className="font-medium">Install Bolt</p>
      </div>

      <div className="flex shrink-0 gap-1.5">
        <Button
          variant="subtle"
          onClick={handleDismiss}
          className="text-text-muted hover:text-text-secondary rounded-md px-3 py-1.5 text-sm transition-colors"
        >
          Dismiss
        </Button>

        <Button
          variant="primary"
          radius="md"
          size="flat"
          onClick={promptInstall}
          className="px-3 py-1.5 text-sm font-medium"
        >
          Install
        </Button>
      </div>
    </div>
  )
}
