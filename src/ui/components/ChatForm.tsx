import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Plus,
  ChevronsUpDown,
  MousePointerClick,
  Lightbulb,
  ArrowUp,
  FileText,
  Save,
} from 'lucide-react'
import Button from './Button'
import ToggleButton from './ToggleButton'
import Dropdown, {
  DROPDOWN_ICON_SIZE,
  DROPDOWN_ICON_STROKE_WIDTH,
} from './Dropdown'
import DropdownAttachments from './DropdownAttachments'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import DropdownModels from './DropdownModels'
import DropdownSeparator from './DropdownSeparator'
import DropdownTrigger from './DropdownTrigger'
import { useDropdownTriggerClose } from '~/context/dropdownTriggerCloseContext'
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

type MessageDraft = {
  id: string
  text: string
  createdAt: number
}

const DEFAULT_MODEL: ModelInfo = {
  id: 'sonnet-4.5',
  label: 'Sonnet 4.5',
  logoSrc: '/anthropic.svg',
}

const CHAT_MESSAGE_DRAFTS_STORAGE_KEY = 'bolt-chat-message-drafts'

function createDraftId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function createMessageDraft(text: string): MessageDraft {
  return {
    id: createDraftId(),
    text,
    createdAt: Date.now(),
  }
}

function sortDraftsNewestFirst(drafts: MessageDraft[]) {
  return [...drafts].sort((a, b) => b.createdAt - a.createdAt)
}

function readMessageDrafts(): MessageDraft[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(CHAT_MESSAGE_DRAFTS_STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return sortDraftsNewestFirst(
      parsed.filter(
        (draft): draft is MessageDraft =>
          draft != null &&
          typeof draft.id === 'string' &&
          typeof draft.text === 'string' &&
          typeof draft.createdAt === 'number',
      ),
    )
  } catch {
    return []
  }
}

function writeMessageDrafts(drafts: MessageDraft[]) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(
    CHAT_MESSAGE_DRAFTS_STORAGE_KEY,
    JSON.stringify(sortDraftsNewestFirst(drafts)),
  )
}

function getPlaceholder(selectActive: boolean, planActive: boolean): string {
  const parts: string[] = []
  if (planActive) parts.push('What do you want to plan?')
  if (selectActive) parts.push('Select an element from the output on the right')
  return parts.length > 0
    ? parts.join('\n')
    : 'How can Bolt help you today? (or /command)'
}

function getDraftPreview(text: string) {
  return text.trim().replace(/\s+/g, ' ').slice(0, 80)
}

function formatDraftCreatedAt(createdAt: number) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(createdAt)
}

type ChatDraftsDropdownProps = {
  drafts: MessageDraft[]
  canSaveDraft: boolean
  onSaveDraft: () => void
  onApplyDraft: (draft: MessageDraft) => void
}

function ChatDraftsDropdown({
  drafts,
  canSaveDraft,
  onSaveDraft,
  onApplyDraft,
}: ChatDraftsDropdownProps) {
  const closeCtx = useDropdownTriggerClose()

  const handleSaveDraft = () => {
    onSaveDraft()
    closeCtx?.close()
  }

  const handleApplyDraft = (draft: MessageDraft) => {
    onApplyDraft(draft)
    closeCtx?.close()
  }

  return (
    <Dropdown align="top" className="max-w-80 min-w-64">
      <DropdownList>
        <DropdownItem
          size="sm"
          role="menuitem"
          icon={
            <Save
              size={DROPDOWN_ICON_SIZE}
              strokeWidth={DROPDOWN_ICON_STROKE_WIDTH}
              className="stroke-icon-default shrink-0"
              aria-hidden
            />
          }
          title="Save new draft"
          disabled={!canSaveDraft}
          onSelect={handleSaveDraft}
        />

        <DropdownSeparator />

        {drafts.length === 0 ? (
          <DropdownItem
            size="sm"
            role="menuitem"
            title={<span className="text-text-muted">No saved drafts</span>}
            disabled
          />
        ) : (
          drafts.map((draft) => (
            <DropdownItem
              key={draft.id}
              size="sm"
              role="menuitem"
              title={
                <span className="block max-w-56 truncate">
                  {getDraftPreview(draft.text)}
                </span>
              }
              append={formatDraftCreatedAt(draft.createdAt)}
              onSelect={() => handleApplyDraft(draft)}
            />
          ))
        )}
      </DropdownList>
    </Dropdown>
  )
}

export default function ChatForm({
  tokens,
  selectedModel = DEFAULT_MODEL,
  upsellMessage = 'Switch to Pro for 33x more usage',
  onSubmit,
}: ChatFormProps) {
  const [message, setMessage] = useState('')
  const [drafts, setDrafts] = useState<MessageDraft[]>(() =>
    readMessageDrafts(),
  )
  const [selectActive, setSelectActive] = useState(false)
  const [planActive, setPlanActive] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!isExpanded) return

    const handlePointerDown = (event: PointerEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isExpanded])

  const updateDrafts = useCallback(
    (updater: (currentDrafts: MessageDraft[]) => MessageDraft[]) => {
      setDrafts((currentDrafts) => {
        const nextDrafts = sortDraftsNewestFirst(updater(currentDrafts))
        writeMessageDrafts(nextDrafts)
        return nextDrafts
      })
    },
    [],
  )

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [])

  const canSend = message.trim().length > 0
  const canSaveDraft = message.trim().length > 0

  const handleSubmit = useCallback(() => {
    const trimmed = message.trim()
    if (!trimmed) return
    onSubmit?.(trimmed)
    setMessage('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [message, onSubmit])

  const handleSaveCurrentDraft = useCallback(() => {
    const currentMessage = textareaRef.current?.value ?? message
    if (!currentMessage.trim()) return

    updateDrafts((currentDrafts) => [
      createMessageDraft(currentMessage),
      ...currentDrafts,
    ])
  }, [message, updateDrafts])

  const handleApplyDraft = useCallback(
    (draft: MessageDraft) => {
      updateDrafts((currentDrafts) =>
        currentDrafts.filter((currentDraft) => currentDraft.id !== draft.id),
      )
      setMessage(draft.text)

      requestAnimationFrame(() => {
        textareaRef.current?.focus()
        resizeTextarea()
      })
    },
    [resizeTextarea, updateDrafts],
  )

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

  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentMessage = textareaRef.current?.value ?? message
      if (!currentMessage.trim()) return

      writeMessageDrafts([
        createMessageDraft(currentMessage),
        ...readMessageDrafts(),
      ])
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [message])

  return (
    <form
      ref={formRef}
      onFocus={() => setIsExpanded(true)}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      data-expanded={isExpanded || undefined}
      className="group/form bg-surface mb-3 shrink-0 px-4 pb-3 md:mb-0"
    >
      <div className="border-border-default mx-2 hidden flex-col justify-between gap-0.5 rounded-t-lg border-t border-r border-l px-2 py-1.5 text-xs group-data-expanded/form:flex md:flex md:flex-row md:gap-0">
        <span aria-live="polite">
          {formatTokens(tokens)} daily tokens remaining.
        </span>

        <Button
          size="flat"
          variant="plain"
          className="text-accent hover:underline"
          onMouseDown={(e) => e.preventDefault()}
        >
          {upsellMessage}
        </Button>
      </div>

      <div className="relative w-full rounded-xl border border-transparent bg-[linear-gradient(var(--color-surface-raised),var(--color-surface-raised)),linear-gradient(to_bottom_right,var(--color-brandHighlight),var(--color-brandContainer))] [background-clip:padding-box,border-box] bg-origin-border p-3 shadow-md transition-shadow focus-within:shadow-[0_0_0_1px_var(--color-focus-ring)] md:pb-0 md:shadow-sm md:group-data-expanded/form:pb-0 md:focus-within:shadow-[0_0_0_1px_var(--color-focus-ring)]">
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
          className="w-full resize-none px-1.5 py-1 text-base outline-none group-data-expanded/form:min-h-20 focus:outline-none focus-visible:outline-none md:min-h-20 md:text-sm"
        />

        <div
          role="toolbar"
          aria-label="Message options"
          className="hidden items-center justify-between gap-3 py-1.5 group-data-expanded/form:flex md:flex"
          onMouseDown={(e) => e.preventDefault()}
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
            <div className="flex items-center gap-1">
              <DropdownTrigger
                size="md"
                radius="pill"
                aria-label="Drafts"
                className="group/button flex shrink-0 items-center gap-0.5 leading-loose hover:gap-1 focus-visible:gap-1"
                dropdown={
                  <ChatDraftsDropdown
                    drafts={drafts}
                    canSaveDraft={canSaveDraft}
                    onSaveDraft={handleSaveCurrentDraft}
                    onApplyDraft={handleApplyDraft}
                  />
                }
              >
                <FileText
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="icon-interactive group-hover/button:stroke-icon-hover"
                />
                <span
                  aria-hidden="true"
                  className="text-text-secondary max-w-0 overflow-hidden text-xs leading-normal whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 group-hover/button:max-w-52 group-hover/button:opacity-100 group-focus-visible/button:max-w-52 group-focus-visible/button:opacity-100"
                >
                  Drafts
                </span>

                <span
                  className="bg-surfaceTwo group-hover/button:bg-hover-strong group-hover/button:text-text-primary flex h-3 w-3 items-center justify-center rounded-full p-2 text-[10px] font-medium -tracking-[0.125em] tabular-nums"
                  style={{ letterSpacing: '0' }}
                >
                  {drafts.length}
                </span>
              </DropdownTrigger>

              <ToggleButton
                icon={MousePointerClick}
                label="Select"
                active={selectActive}
                onToggle={() => setSelectActive((v) => !v)}
                displayLabelOnHover={true}
              />

              <ToggleButton
                icon={Lightbulb}
                label="Plan"
                active={planActive}
                onToggle={() => setPlanActive((v) => !v)}
                displayLabelOnHover={true}
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
                strokeWidth={1.5}
                aria-hidden="true"
                className="icon-circle bg-brand group-hover/button:bg-brand stroke-brandContainer group-hover/button:stroke-onBrand p-1.25"
              />
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
