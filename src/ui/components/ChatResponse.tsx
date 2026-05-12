import ChatPlan from './ChatPlan'
import ChatActions from './ChatActions'
import type {
  ChatActionData,
  ChatQuestion,
  ChatQuestionAnswer,
  ChatQuestionAnswerValue,
  ChatResponseData,
} from '~/types/chat'

type ChatResponseProps = {
  response: Partial<ChatResponseData>
  actions: ChatActionData[]
  questionAnswers?: ChatQuestionAnswer[]
  actionsExpanded: boolean
  actionOnClick: () => void
  isLoading?: boolean
  isStreaming?: boolean
}

const getOptionLabel = (question: ChatQuestion, optionId: string) =>
  question.options?.find((option) => option.id === optionId)?.label ?? optionId

const formatAnswerValue = (
  question: ChatQuestion,
  value: ChatQuestionAnswerValue | undefined,
) => {
  if (!value) return ''

  if (Array.isArray(value)) {
    return value
      .map((optionId) => getOptionLabel(question, optionId))
      .join(', ')
  }

  if (typeof value === 'string') {
    return getOptionLabel(question, value)
  }

  return value.fileName
}

export default function ChatResponse({
  response,
  actions,
  questionAnswers = [],
  actionsExpanded,
  actionOnClick,
  isLoading = false,
  isStreaming = false,
}: ChatResponseProps) {
  const hasActions = actions.length > 0
  const hasQuestions = response.questions && response.questions.length > 0
  const hasPlanSections =
    response.planSections && response.planSections.length > 0
  const hasSummary = response.summaryTitle || response.summaryText
  const showPlanDivider = response.planTitle || hasPlanSections

  return (
    <>
      {response.openingText && <p>{response.openingText}</p>}

      {hasActions && (
        <ChatActions
          actions={actions}
          count={actions.length}
          actionsExpanded={actionsExpanded}
          actionOnClick={actionOnClick}
        />
      )}

      {response.followUpText && <p>{response.followUpText}</p>}

      {response.questionsIntro && <p>{response.questionsIntro}</p>}

      {hasQuestions && (
        <ol className="list-outside list-decimal space-y-3 pl-6">
          {response.questions?.map((question) => {
            const answer = questionAnswers.find(
              (a) => a.questionId === question.id,
            )
            return (
              <li key={question.id}>
                <strong>{question.label}</strong> {question.text}
                {answer && (
                  <p className="mt-1 text-xs">
                    <span
                      className={`mt-1 text-xs ${
                        answer.status === 'skipped'
                          ? 'text-text-warning'
                          : 'text-text-success'
                      }`}
                    >
                      {answer.status === 'skipped' ? 'Skipped' : 'Answered:'}
                    </span>{' '}
                    {formatAnswerValue(question, answer.value)}
                  </p>
                )}
              </li>
            )
          })}
        </ol>
      )}

      {showPlanDivider && (
        <hr className="border-border-default my-3 border-2" />
      )}

      {response.planTitle && (
        <h2 className="text-lg font-semibold">{response.planTitle}</h2>
      )}

      {hasPlanSections && (
        <ol className="space-y-5">
          {response.planSections?.map((section) => (
            <li key={section.id}>
              <h3 className="font-semibold">
                {section.id}. {section.title}
              </h3>

              <ul className="mt-3 list-outside list-disc space-y-1.5 pl-6">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}

      {hasSummary && <hr className="border-border-default my-3 border-2" />}

      {response.summaryTitle && (
        <h2 className="text-lg font-semibold">{response.summaryTitle}</h2>
      )}

      {response.summaryText && <p>{response.summaryText}</p>}

      {response.closingText && <p>{response.closingText}</p>}

      {response.plan && (
        <ChatPlan
          title={response.plan.title}
          version={response.plan.version}
          createdAt={response.plan.createdAt}
        />
      )}

      {(isLoading || isStreaming) && (
        <div
          role="status"
          aria-live="polite"
          className="text-text-secondary flex items-center gap-2 text-sm"
        >
          <span className="flex gap-1" aria-hidden="true">
            <span className="bg-icon-muted h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="bg-icon-muted h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
            <span className="bg-icon-muted h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
          </span>
          {isLoading ? 'Thinking...' : 'Streaming response...'}
        </div>
      )}
    </>
  )
}
