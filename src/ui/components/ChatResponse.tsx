import ChatPlan from './ChatPlan'
import ChatActions from './ChatActions'
import { MockChatResponse } from '~/data/MockChat'

type ChatResponseProps = {
  actionsExpanded: boolean
  actionOnClick: () => void
}

export default function ChatResponse(props: ChatResponseProps) {
  return (
    <>
      <p>{MockChatResponse.openingText}</p>

      <ChatActions
        count={MockChatResponse.actionsCount}
        actionsExpanded={props.actionsExpanded}
        actionOnClick={props.actionOnClick}
      />

      <p>{MockChatResponse.followUpText}</p>

      <p>{MockChatResponse.questionsIntro}</p>

      <ol className="list-outside list-decimal space-y-3 pl-6">
        {MockChatResponse.questions.map((q) => (
          <li key={q.id}>
            <strong>{q.label}</strong> {q.text}
          </li>
        ))}
      </ol>

      <hr className="my-3 border-2 border-gray-200 dark:border-zinc-600" />

      <h2 className="text-lg font-semibold">{MockChatResponse.planTitle}</h2>

      <ol className="space-y-5">
        {MockChatResponse.planSections.map((section) => (
          <li key={section.id}>
            <h3 className="font-semibold">
              {section.id}. {section.title}
            </h3>

            <ul className="mt-3 list-outside list-disc space-y-3 pl-6">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <hr className="my-3 border-2 border-gray-200 dark:border-zinc-600" />

      <h2 className="text-lg font-semibold">{MockChatResponse.summaryTitle}</h2>

      <p>{MockChatResponse.summaryText}</p>

      <p>{MockChatResponse.closingText}</p>

      <ChatPlan
        title={MockChatResponse.plan.title}
        version={MockChatResponse.plan.version}
        createdAt={MockChatResponse.plan.createdAt}
      />
    </>
  )
}
