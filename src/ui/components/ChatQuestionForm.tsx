import { useCallback, useMemo, useState } from 'react'
import { ImageUp } from 'lucide-react'
import Button from './Button'
import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react'
import type {
  ChatQuestion,
  ChatQuestionAnswer,
  ChatQuestionAnswerValue,
  ChatQuestionOption,
} from '~/types/chat'

type ChatQuestionFormProps = {
  question: ChatQuestion
  questionIndex: number
  questionCount: number
  initialAnswer?: ChatQuestionAnswer
  onSubmit: (value: ChatQuestionAnswerValue) => void
  onSkip: () => void
  onSkipAll: () => void
  onBack: () => void
}

type QuestionTextareaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'onChange' | 'value'
> & {
  value: string
  onValueChange: (value: string) => void
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

const isFileAnswerValue = (
  value: ChatQuestionAnswerValue | undefined,
): value is { fileName: string; fileSize: number; fileType: string } =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

function QuestionTextarea({
  className = '',
  value,
  onValueChange,
  ...props
}: QuestionTextareaProps) {
  const textareaClassName = [
    'border-border-default focus:ring-focus-ring resize-none rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <textarea
      {...props}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      className={textareaClassName}
    />
  )
}

function OptionCard({
  option,
  type,
  name,
  checked,
  onChange,
}: {
  option: ChatQuestionOption
  type: 'checkbox' | 'radio'
  name: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="border-border-default hover:bg-hover-item has-checked:border-brandOutline has-checked:bg-selected flex cursor-pointer gap-3 rounded-lg border px-3 py-2 transition-colors">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-0.5"
      />
      <span className="flex flex-col gap-1">
        <span className="text-sm">{option.label}</span>
        {option.description && (
          <span className="text-text-secondary text-xs">
            {option.description}
          </span>
        )}
      </span>
    </label>
  )
}

export default function ChatQuestionForm({
  question,
  questionIndex,
  questionCount,
  initialAnswer,
  onSubmit,
  onSkip,
  onSkipAll,
  onBack,
}: ChatQuestionFormProps) {
  const initialAnswerValue =
    initialAnswer?.status === 'answered' ? initialAnswer.value : undefined
  const options = useMemo(() => question.options ?? [], [question.options])
  const optionIds = useMemo(
    () => new Set(options.map((option) => option.id)),
    [options],
  )
  const customResponseOption = useMemo(
    () => options.find((option) => option.allowsCustomResponse),
    [options],
  )
  const [textValue, setTextValue] = useState(() =>
    question.answerType === 'text' && typeof initialAnswerValue === 'string'
      ? initialAnswerValue
      : '',
  )
  const [selectedSingle, setSelectedSingle] = useState(() =>
    question.answerType === 'single-select' &&
    typeof initialAnswerValue === 'string'
      ? initialAnswerValue
      : '',
  )
  const [selectedMulti, setSelectedMulti] = useState<string[]>(() =>
    question.answerType === 'multi-select' && Array.isArray(initialAnswerValue)
      ? [
          ...initialAnswerValue.filter((value) => optionIds.has(value)),
          ...(customResponseOption &&
          initialAnswerValue.some((value) => !optionIds.has(value))
            ? [customResponseOption.id]
            : []),
        ]
      : [],
  )
  const [customResponseValue, setCustomResponseValue] = useState(() =>
    question.answerType === 'multi-select' && Array.isArray(initialAnswerValue)
      ? (initialAnswerValue.find((value) => !optionIds.has(value)) ?? '')
      : '',
  )
  const [selectedFileAnswer, setSelectedFileAnswer] = useState<{
    fileName: string
    fileSize: number
    fileType: string
  } | null>(() =>
    question.answerType === 'image-upload' &&
    isFileAnswerValue(initialAnswerValue)
      ? initialAnswerValue
      : null,
  )
  const optionName = `chat-question-${question.id}`
  const canSkip = question.allowSkip !== false
  const wasSkipped = initialAnswer?.status === 'skipped'
  const isCustomResponseSelected =
    customResponseOption !== undefined &&
    selectedMulti.includes(customResponseOption.id)

  const canSubmit =
    (question.answerType === 'text' && textValue.trim().length > 0) ||
    (question.answerType === 'single-select' && selectedSingle.length > 0) ||
    (question.answerType === 'multi-select' &&
      selectedMulti.length > 0 &&
      (!isCustomResponseSelected || customResponseValue.trim().length > 0)) ||
    (question.answerType === 'image-upload' && selectedFileAnswer !== null)

  const handleMultiToggle = useCallback((optionId: string) => {
    setSelectedMulti((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    )
  }, [])

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return

    if (question.answerType === 'text') {
      onSubmit(textValue.trim())
      return
    }

    if (question.answerType === 'single-select') {
      onSubmit(selectedSingle)
      return
    }

    if (question.answerType === 'multi-select') {
      onSubmit(
        selectedMulti.map((optionId) => {
          const option = options.find((option) => option.id === optionId)

          return option?.allowsCustomResponse
            ? customResponseValue.trim()
            : optionId
        }),
      )
      return
    }

    if (selectedFileAnswer) {
      onSubmit(selectedFileAnswer)
    }
  }, [
    canSubmit,
    customResponseValue,
    onSubmit,
    options,
    question.answerType,
    selectedFileAnswer,
    selectedMulti,
    selectedSingle,
    textValue,
  ])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
      className="mb-3 shrink-0 px-4 pb-3 md:mb-0"
    >
      <div className="border-border-default bg-surface rounded-xl border">
        <div className="mb-1.5 gap-3">
          <header className="bg-surface-muted border-border-default flex items-center justify-between rounded-t-xl border-b px-4 py-2">
            <p className="text-xs">
              Question {questionIndex + 1} of {questionCount}
            </p>

            <Button
              size="sm"
              radius="md"
              variant="plain"
              className="shrink-0 hover:underline"
              onClick={onSkipAll}
            >
              Skip all
            </Button>
          </header>

          <div className="px-4 py-2">
            <h2 className="mt-1 text-sm font-semibold">{question.label}</h2>

            <p className="mt-1 mb-3 text-sm leading-relaxed">{question.text}</p>

            {wasSkipped && (
              <p className="text-text-secondary mb-3 text-xs">
                This question is currently skipped. Submit an answer to replace
                it.
              </p>
            )}

            {question.answerType === 'text' && (
              <QuestionTextarea
                id={`chat-question-${question.id}-text`}
                value={textValue}
                onValueChange={setTextValue}
                onKeyDown={handleKeyDown}
                placeholder={question.placeholder ?? 'Type your answer...'}
                className="min-h-24 w-full"
              />
            )}

            {question.answerType === 'single-select' && (
              <div className="grid gap-2">
                {options.map((option) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    type="radio"
                    name={optionName}
                    checked={selectedSingle === option.id}
                    onChange={() => setSelectedSingle(option.id)}
                  />
                ))}
              </div>
            )}

            {question.answerType === 'multi-select' && (
              <div className="grid gap-2">
                {options.map((option) => (
                  <div key={option.id} className="grid gap-2">
                    <OptionCard
                      option={option}
                      type="checkbox"
                      name={optionName}
                      checked={selectedMulti.includes(option.id)}
                      onChange={() => handleMultiToggle(option.id)}
                    />
                    {option.allowsCustomResponse &&
                      selectedMulti.includes(option.id) && (
                        <QuestionTextarea
                          id={`chat-question-${question.id}-custom-response`}
                          value={customResponseValue}
                          onValueChange={setCustomResponseValue}
                          placeholder="Type a custom post feature..."
                          className="ml-6 min-h-20"
                        />
                      )}
                  </div>
                ))}
              </div>
            )}

            {question.answerType === 'image-upload' && (
              <label className="bg-surface-raised border-border-default hover:bg-hover-item flex cursor-pointer items-center gap-3 rounded-lg border border-dashed p-4 transition-colors">
                <ImageUp
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="stroke-icon-default shrink-0"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium">
                    {selectedFileAnswer
                      ? selectedFileAnswer.fileName
                      : 'Upload an image'}
                  </span>
                  <span className="text-text-secondary text-xs">
                    {selectedFileAnswer
                      ? `${selectedFileAnswer.fileType || 'Image'} · ${formatFileSize(selectedFileAnswer.fileSize)}`
                      : 'PNG, JPG, GIF, or WebP'}
                  </span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.item(0)

                    setSelectedFileAnswer(
                      file
                        ? {
                            fileName: file.name,
                            fileSize: file.size,
                            fileType: file.type,
                          }
                        : null,
                    )
                  }}
                />
              </label>
            )}
          </div>
        </div>

        <footer className="flex items-center justify-between gap-3 px-3 pb-3">
          <Button
            size="md"
            radius="lg"
            variant="ghost"
            disabled={!canSkip}
            onClick={onSkip}
          >
            Skip
          </Button>

          <div className="flex items-center gap-1.5">
            {questionIndex > 0 && (
              <Button size="md" radius="lg" variant="subtle" onClick={onBack}>
                Back
              </Button>
            )}

            <Button
              size="md"
              radius="lg"
              variant="blue"
              type="submit"
              disabled={!canSubmit}
            >
              {questionIndex === questionCount - 1 ? 'Continue' : 'Next'}
            </Button>
          </div>
        </footer>
      </div>
    </form>
  )
}
