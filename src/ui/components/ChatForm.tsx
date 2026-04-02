import { useCallback, useRef, useState } from 'react'
import {
  Plus,
  ChevronsUpDown,
  MousePointerClick,
  Lightbulb,
  ArrowUp,
} from 'lucide-react'
import Button from './Button'
import ToggleButton from './ToggleButton'
import DropdownAttachments from './DropdownAttachments'
import DropdownModels from './DropdownModels'
import DropdownTrigger from './DropdownTrigger'
import { formatTokens } from '~/utils/formatTokens'

type ModelInfo = {
  id: string
  label: string
  logoSrc: string
}

type ChatFormProps = {
  tokens: number
  selectedModel?: ModelInfo
  upsellMessage?: string
  onSubmit?: (message: string) => void
}

const DEFAULT_MODEL: ModelInfo = {
  id: 'sonnet-4.5',
  label: 'Sonnet 4.5',
  logoSrc: '/anthropic.svg',
}

function getPlaceholder(selectActive: boolean, planActive: boolean): string {
  const parts: string[] = []
  if (planActive) parts.push('What do you want to plan?')
  if (selectActive) parts.push('Select an element from the output on the right')
  return parts.length > 0
    ? parts.join('\n')
    : 'How can Bolt help you today? (or /command)'
}

export default function ChatForm({
  tokens,
  selectedModel = DEFAULT_MODEL,
  upsellMessage = 'Switch to Pro for 33x more usage',
  onSubmit,
}: ChatFormProps) {
  const [message, setMessage] = useState('')
  const [selectActive, setSelectActive] = useState(false)
  const [planActive, setPlanActive] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = message.trim().length > 0

  const handleSubmit = useCallback(() => {
    const trimmed = message.trim()
    if (!trimmed) return
    onSubmit?.(trimmed)
    setMessage('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [message, onSubmit])

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value)
      const el = e.target
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`
    },
    [],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (canSend) handleSubmit()
      }
    },
    [canSend, handleSubmit],
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="group/form bg-surface mb-3 shrink-0 px-4 pb-3 md:mb-0"
    >
      <aside className="border-border-default mx-2 hidden flex-col justify-between gap-0.5 rounded-t-lg border-t border-r border-l px-2 py-1.5 text-xs group-focus-within/form:flex md:flex md:flex-row md:gap-0">
        <span aria-live="polite">
          {formatTokens(tokens)} daily tokens remaining.
        </span>

        <Button
          size="flat"
          variant="plain"
          className="text-accent hover:underline"
        >
          {upsellMessage}
        </Button>
      </aside>

      <div className="relative w-full rounded-xl border border-transparent bg-[linear-gradient(var(--color-surface-raised),var(--color-surface-raised)),linear-gradient(to_bottom_right,var(--color-blue-400),var(--color-blue-100))] [background-clip:padding-box,border-box] bg-origin-border p-3 shadow-md transition-shadow focus-within:shadow-[0_0_0_1px_var(--color-focus-ring)] md:pb-0 md:shadow-sm md:group-focus-within/form:pb-0 md:focus-within:shadow-[0_0_0_1px_var(--color-focus-ring)]">
        <label htmlFor="command" className="sr-only">
          Command
        </label>

        <textarea
          ref={textareaRef}
          id="command"
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder(selectActive, planActive)}
          className="w-full resize-none px-1.5 py-1 text-base outline-none group-focus-within/form:min-h-20 focus:outline-none focus-visible:outline-none md:min-h-20 md:text-sm"
        />

        <div
          role="toolbar"
          aria-label="Message options"
          className="hidden items-center justify-between gap-3 py-1.5 group-focus-within/form:flex md:flex"
        >
          <div className="flex items-center gap-3">
            <DropdownTrigger
              size="flat"
              variant="plain"
              className="group/button shrink-0 rounded-full"
              dropdown={<DropdownAttachments />}
            >
              <span className="sr-only">Upload</span>
              <Plus
                size={28}
                aria-hidden="true"
                className="icon-circle bg-surface-emphasis group-hover/button:bg-hover-strong p-1.25"
              />
            </DropdownTrigger>

            <DropdownTrigger
              size="md"
              radius="xl"
              className="group/trigger shrink-0"
              popupType="listbox"
              dropdown={<DropdownModels />}
            >
              <img
                src={selectedModel.logoSrc}
                alt=""
                className="h-4 w-4 shrink-0 object-contain grayscale group-focus-within/trigger:grayscale-0 group-hover/trigger:grayscale-0 group-active/trigger:grayscale-0"
              />

              <span className="text-text-secondary text-xs">
                {selectedModel.label}
              </span>

              <ChevronsUpDown
                size={14}
                strokeWidth={1}
                aria-hidden="true"
                className="stroke-icon-default"
              />
            </DropdownTrigger>
          </div>

          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="flex items-center gap-1.5">
              <ToggleButton
                icon={MousePointerClick}
                label="Select"
                active={selectActive}
                onToggle={() => setSelectActive((v) => !v)}
              />

              <ToggleButton
                icon={Lightbulb}
                label="Plan"
                active={planActive}
                onToggle={() => setPlanActive((v) => !v)}
              />
            </div>

            <Button
              size="flat"
              variant="plain"
              className="group/button shrink-0"
              type="submit"
              disabled={!canSend}
            >
              <span className="sr-only">Send Message</span>
              <ArrowUp
                size={28}
                aria-hidden="true"
                className="icon-circle bg-accent-bg group-hover/button:bg-accent-bg-hover stroke-white p-1.25"
              />
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
