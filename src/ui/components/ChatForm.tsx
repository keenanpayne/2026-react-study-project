import { useState } from 'react'
import {
  Plus,
  ChevronsUpDown,
  MousePointerClick,
  Lightbulb,
  ArrowUp,
} from 'lucide-react'
import Button from './Button'
import DropdownAttachments from './DropdownAttachments'
import DropdownModels from './DropdownModels'
import DropdownTrigger from './DropdownTrigger'

function formatTokens(tokens: number): string {
  if (tokens >= 1000000) {
    const value = Math.round(tokens / 100000) / 10
    return `${value % 1 === 0 ? value.toFixed(0) : value}M`
  } else if (tokens >= 1000) {
    const value = Math.round(tokens / 100) / 10
    if (value >= 1000) {
      return `${(value / 1000) % 1 === 0 ? (value / 1000).toFixed(0) : value / 1000}M`
    }
    return `${value % 1 === 0 ? value.toFixed(0) : value}k`
  }
  return tokens.toString()
}

type ChatFormProps = {
  tokens: number
}

export default function ChatForm({ tokens }: ChatFormProps) {
  const [message, setMessage] = useState('')
  const [selectActive, setSelectActive] = useState(false)
  const [planActive, setPlanActive] = useState(false)
  const canSend = message.trim().length > 0

  const toggleIconActive =
    'stroke-icon-active group-hover/button:stroke-icon-active transition-colors'
  const toggleIconInactive =
    'icon-interactive group-hover/button:stroke-icon-hover'

  const commandPlaceholder =
    selectActive && planActive
      ? 'What do you want to plan?\nSelect an element from the output on the right'
      : selectActive
        ? 'Select an element from the output on the right'
        : planActive
          ? 'What do you want to plan?'
          : 'How can Bolt help you today? (or /command)'

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="group/form bg-surface mb-3 shrink-0 px-4 pb-3 md:mb-0"
    >
      <aside className="border-border-default mx-2 hidden flex-col justify-between gap-0.5 rounded-t-lg border-t border-r border-l px-2 py-1.5 text-xs group-focus-within/form:flex md:flex md:flex-row md:gap-0">
        <span aria-live="polite">
          {formatTokens(tokens)} daily tokens remaining.
        </span>

        <Button size="flat" className="text-accent hover:underline">
          Switch to Pro for 33x more usage
        </Button>
      </aside>

      <div className="relative w-full rounded-xl border border-transparent bg-[linear-gradient(var(--color-surface-raised),var(--color-surface-raised)),linear-gradient(to_bottom_right,var(--color-blue-400),var(--color-blue-100))] [background-clip:padding-box,border-box] bg-origin-border p-3 shadow-md transition-shadow focus-within:shadow-[0_0_0_1px_var(--color-focus-ring)] md:pb-0 md:shadow-sm md:group-focus-within/form:pb-0 md:focus-within:shadow-[0_0_0_1px_var(--color-focus-ring)]">
        <label htmlFor="command" className="sr-only">
          Command
        </label>

        <textarea
          id="command"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={commandPlaceholder}
          className="w-full resize-none px-1.5 py-1 text-base outline-none group-focus-within/form:h-20 focus:outline-none focus-visible:outline-none md:h-20 md:text-sm"
        />

        <div
          role="toolbar"
          aria-label="Message options"
          className="hidden items-center justify-between gap-3 py-1.5 group-focus-within/form:flex md:flex"
        >
          <div className="flex items-center gap-3">
            <DropdownTrigger
              size="flat"
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
                src="/anthropic.svg"
                alt=""
                className="h-4 w-4 shrink-0 object-contain grayscale group-focus-within/trigger:grayscale-0 group-hover/trigger:grayscale-0 group-active/trigger:grayscale-0"
              />

              <span className="text-text-secondary text-xs">Sonnet 4.5</span>

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
              <Button
                size="md"
                radius="pill"
                variant={selectActive ? 'selected' : 'ghost'}
                className="group/button shrink-0"
                type="button"
                aria-label="Select"
                aria-pressed={selectActive}
                onClick={() => setSelectActive((v) => !v)}
              >
                <MousePointerClick
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={
                    selectActive ? toggleIconActive : toggleIconInactive
                  }
                />
                <span
                  className={
                    selectActive
                      ? 'text-text-selected text-xs'
                      : 'text-text-secondary text-xs'
                  }
                >
                  Select
                </span>
              </Button>

              <Button
                size="md"
                radius="pill"
                variant={planActive ? 'selected' : 'ghost'}
                className="group/button shrink-0"
                type="button"
                aria-label="Plan"
                aria-pressed={planActive}
                onClick={() => setPlanActive((v) => !v)}
              >
                <Lightbulb
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={planActive ? toggleIconActive : toggleIconInactive}
                />
                <span
                  className={
                    planActive
                      ? 'text-text-selected text-xs'
                      : 'text-text-secondary text-xs'
                  }
                >
                  Plan
                </span>
              </Button>
            </div>

            <Button
              size="flat"
              className="group/button shrink-0"
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
