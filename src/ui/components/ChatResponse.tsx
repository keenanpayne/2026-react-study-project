import ChatPlan from './ChatPlan'
import ChatActions from './ChatActions'
import type { ChatActionData, ChatResponseData } from '~/types/chat'

type ChatResponseProps = {
  response: Partial<ChatResponseData>
  actions: ChatActionData[]
  actionsExpanded: boolean
  actionOnClick: () => void
  isLoading?: boolean
  isStreaming?: boolean
}

export default function ChatResponse({
  response,
  actions,
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
          {response.questions?.map((q) => (
            <li key={q.id}>
              <strong>{q.label}</strong> {q.text}
            </li>
          ))}
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

              <ul className="mt-3 list-outside list-disc space-y-3 pl-6">
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
