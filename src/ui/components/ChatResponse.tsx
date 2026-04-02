import ChatPlan from './ChatPlan'
import ChatActions from './ChatActions'
import type { ChatActionData, ChatResponseData } from '~/types/chat'

type ChatResponseProps = {
  response: ChatResponseData
  actions: ChatActionData[]
  actionsExpanded: boolean
  actionOnClick: () => void
}

export default function ChatResponse({
  response,
  actions,
  actionsExpanded,
  actionOnClick,
}: ChatResponseProps) {
  return (
    <>
      <p>{response.openingText}</p>

      <ChatActions
        actions={actions}
        count={actions.length}
        actionsExpanded={actionsExpanded}
        actionOnClick={actionOnClick}
      />

      <p>{response.followUpText}</p>

      <p>{response.questionsIntro}</p>

      <ol className="list-outside list-decimal space-y-3 pl-6">
        {response.questions.map((q) => (
          <li key={q.id}>
            <strong>{q.label}</strong> {q.text}
          </li>
        ))}
      </ol>

      <hr className="border-border-default my-3 border-2" />

      <h2 className="text-lg font-semibold">{response.planTitle}</h2>

      <ol className="space-y-5">
        {response.planSections.map((section) => (
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

      <hr className="border-border-default my-3 border-2" />

      <h2 className="text-lg font-semibold">{response.summaryTitle}</h2>

      <p>{response.summaryText}</p>

      <p>{response.closingText}</p>

      <ChatPlan
        title={response.plan.title}
        version={response.plan.version}
        createdAt={response.plan.createdAt}
      />
    </>
  )
}
