import { useCallback, useEffect, useRef, useState } from 'react'
import type { UIEvent } from 'react'
import { ArrowDown } from 'lucide-react'
import Dialog from './ui/components/Dialog'
import ChatResponse from './ui/components/ChatResponse'
import ChatHeader from './ui/components/ChatHeader'
import ChatMessage from './ui/components/ChatMessage'
import ChatForm from './ui/components/ChatForm'
import ChatQuestionForm from './ui/components/ChatQuestionForm'
import Button from './ui/components/Button'
import WorkbenchHeader from './ui/components/WorkbenchHeader'
import WorkbenchPreview from './ui/components/WorkbenchPreview'
import WorkbenchCodebase from './ui/components/WorkbenchCodebase'
import WorkbenchDatabase from './ui/components/WorkbenchDatabase'
import MobileNavigation from './ui/components/MobileNavigation'
import MockWorkbenchPreview from './ui/components/MockWorkbenchPreview'
import { MockWorkbenchDatabaseTables } from './data/mockDatabase'
import { MockWorkbenchFileTree } from './data/mockFileTree'
import { MockWorkbenchFile } from './data/mockEditorFile'
import { MockWorkbenchTerminal } from './data/mockTerminal'
import {
  MockUserBoltTokens,
  MockUserCurrentProject,
  MockUserProjects,
  MockUserTeams,
} from './data/mockUser'
import {
  MockChatActions,
  MockChatResponse,
  MockChatResponseEmpty,
} from './data/mockChat'
import { useMobileNavigation } from './hooks/useMobileNavigation'
import InstallPrompt from './ui/components/InstallPrompt'
import type {
  ChatActionData,
  ChatQuestionAnswer,
  ChatQuestionAnswerValue,
  ChatPlanSection,
  ChatResponseData,
} from '~/types/chat'
import type { WorkbenchDatabaseSection } from '~/types/navigation'

type ChatStatus =
  | 'idle'
  | 'loading'
  | 'streaming'
  | 'awaitingQuestions'
  | 'complete'
type ChatResponseTextKey =
  | 'openingText'
  | 'followUpText'
  | 'questionsIntro'
  | 'planTitle'
  | 'summaryTitle'
  | 'summaryText'
  | 'closingText'

const STREAM_INITIAL_DELAY = 1500
const STREAM_WORD_DELAY = 95
const STREAM_CLAUSE_DELAY = 180
const STREAM_SENTENCE_DELAY = 320
const STREAM_SECTION_PAUSE = 375
const STREAM_ACTION_STEP_DELAY = 750
const STREAM_FINAL_PAUSE = 700
const MANUAL_SCROLL_DELTA = 1
const SCROLL_BOTTOM_THRESHOLD = 8

type StreamQueueHelpers = {
  queueStreamStep: (callback: () => void) => void
  pauseStream: (delay: number) => void
  queueTextStream: (
    text: string,
    onUpdate: (visibleText: string) => void,
  ) => void
  queueResponseText: (key: ChatResponseTextKey, text: string) => void
}

const upsertQuestionAnswer = (
  answers: ChatQuestionAnswer[],
  answer: ChatQuestionAnswer,
) => [
  ...answers.filter(
    (currentAnswer) => currentAnswer.questionId !== answer.questionId,
  ),
  answer,
]

const buildVisiblePlanSections = (
  sectionIndex: number,
  visibleTitle: string,
  itemIndex?: number,
  visibleItem?: string,
): ChatPlanSection[] =>
  MockChatResponse.planSections
    .slice(0, sectionIndex + 1)
    .map((section, index) => {
      if (index !== sectionIndex) return section

      const visibleItems =
        itemIndex === undefined
          ? []
          : [...section.items.slice(0, itemIndex), visibleItem ?? '']

      return { ...section, title: visibleTitle, items: visibleItems }
    })

const getWordTokens = (text: string) => text.match(/\s*\S+\s*/g) ?? []

const getWordDelay = (wordToken: string, index: number) => {
  const word = wordToken.trim()

  if (/[.!?]$/.test(word)) return STREAM_SENTENCE_DELAY
  if (/[,;:]$/.test(word)) return STREAM_CLAUSE_DELAY

  return STREAM_WORD_DELAY + (index % 4) * 18
}

const isScrolledToBottom = (element: HTMLDivElement) =>
  element.scrollHeight - element.scrollTop - element.clientHeight <=
  SCROLL_BOTTOM_THRESHOLD

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [activeDatabaseSection, setActiveDatabaseSection] =
    useState<WorkbenchDatabaseSection>('database')
  const [chatMessage, setChatMessage] = useState<string | null>(null)
  const [chatResponse, setChatResponse] = useState<Partial<ChatResponseData>>(
    {},
  )
  const [chatActions, setChatActions] = useState<ChatActionData[]>([])
  const [chatStatus, setChatStatus] = useState<ChatStatus>('idle')
  const [questionAnswers, setQuestionAnswers] = useState<ChatQuestionAnswer[]>(
    [],
  )
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [isScrollToBottomVisible, setIsScrollToBottomVisible] = useState(false)
  const streamTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const isChatAutoScrollEnabledRef = useRef(true)
  const lastChatScrollTopRef = useRef(0)
  const {
    activePane,
    handlePaneChange,
    activeMobileView,
    handleMobileViewChange,
    chatRef,
    workbenchRef,
  } = useMobileNavigation()

  const isMobileChat = activeMobileView === 'chat'
  const isLoading = chatStatus === 'loading'
  const isStreaming = chatStatus === 'streaming'
  const isAnsweringQuestions = chatStatus === 'awaitingQuestions'
  const hasChatStarted = chatMessage !== null
  const isMockConversationComplete = chatStatus === 'complete'
  const activeQuestion = MockChatResponse.questions[activeQuestionIndex]
  const activeQuestionAnswer = questionAnswers.find(
    (answer) => answer.questionId === activeQuestion?.id,
  )

  const clearStreamTimers = useCallback(() => {
    streamTimersRef.current.forEach((timer) => clearTimeout(timer))
    streamTimersRef.current = []
  }, [])

  const scrollChatToBottom = useCallback((behavior: ScrollBehavior) => {
    const chatScrollEl = chatScrollRef.current
    if (!chatScrollEl) return

    lastChatScrollTopRef.current = chatScrollEl.scrollTop
    chatScrollEl.scrollTo({
      top: chatScrollEl.scrollHeight,
      behavior,
    })
  }, [])

  const handleScrollToBottomClick = useCallback(() => {
    isChatAutoScrollEnabledRef.current = true
    setIsScrollToBottomVisible(false)
    scrollChatToBottom('smooth')
  }, [scrollChatToBottom])

  const resetChatAutoScroll = useCallback(() => {
    isChatAutoScrollEnabledRef.current = true
    setIsScrollToBottomVisible(false)
    lastChatScrollTopRef.current = chatScrollRef.current?.scrollTop ?? 0
  }, [])

  useEffect(() => clearStreamTimers, [clearStreamTimers])

  useEffect(() => {
    const chatScrollEl = chatScrollRef.current
    if (
      !chatScrollEl ||
      chatStatus === 'idle' ||
      !isChatAutoScrollEnabledRef.current
    ) {
      return
    }

    scrollChatToBottom(chatStatus === 'streaming' ? 'smooth' : 'auto')
  }, [chatActions, chatResponse, chatStatus, scrollChatToBottom])

  const handleChatScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      const chatScrollEl = event.currentTarget
      const nextScrollTop = chatScrollEl.scrollTop
      const previousScrollTop = lastChatScrollTopRef.current
      const isAtBottom = isScrolledToBottom(chatScrollEl)

      lastChatScrollTopRef.current = nextScrollTop

      if (isAtBottom) {
        isChatAutoScrollEnabledRef.current = true
        setIsScrollToBottomVisible(false)
        return
      }

      if (
        chatStatus === 'streaming' &&
        isChatAutoScrollEnabledRef.current &&
        nextScrollTop < previousScrollTop - MANUAL_SCROLL_DELTA
      ) {
        isChatAutoScrollEnabledRef.current = false
        setIsScrollToBottomVisible(true)
      }
    },
    [chatStatus],
  )

  const runStreamQueue = useCallback(
    (
      initialDelay: number,
      buildQueue: (helpers: StreamQueueHelpers) => void,
    ) => {
      let streamDelay = initialDelay
      const queueStreamStep = (callback: () => void) => {
        const delay = streamDelay
        const timer = setTimeout(callback, delay)
        streamTimersRef.current.push(timer)
      }
      const pauseStream = (delay: number) => {
        streamDelay += delay
      }
      const queueTextStream = (
        text: string,
        onUpdate: (visibleText: string) => void,
      ) => {
        const wordTokens = getWordTokens(text)

        wordTokens.forEach((wordToken, index) => {
          queueStreamStep(() =>
            onUpdate(wordTokens.slice(0, index + 1).join('')),
          )
          pauseStream(getWordDelay(wordToken, index))
        })
      }
      const queueResponseText = (key: ChatResponseTextKey, text: string) => {
        queueTextStream(text, (visibleText) => {
          setChatResponse((current) => ({
            ...current,
            [key]: visibleText,
          }))
        })
      }

      buildQueue({
        queueStreamStep,
        pauseStream,
        queueTextStream,
        queueResponseText,
      })
    },
    [],
  )

  const queuePlanStream = useCallback(
    (initialDelay = 0) => {
      runStreamQueue(
        initialDelay,
        ({
          queueStreamStep,
          pauseStream,
          queueTextStream,
          queueResponseText,
        }) => {
          pauseStream(STREAM_SECTION_PAUSE)
          queueResponseText('planTitle', MockChatResponse.planTitle)

          MockChatResponse.planSections.forEach((section, sectionIndex) => {
            pauseStream(STREAM_SECTION_PAUSE)
            queueTextStream(section.title, (visibleTitle) => {
              setChatResponse((current) => ({
                ...current,
                planSections: buildVisiblePlanSections(
                  sectionIndex,
                  visibleTitle,
                ),
              }))
            })

            section.items.forEach((item, itemIndex) => {
              pauseStream(STREAM_SECTION_PAUSE)
              queueTextStream(item, (visibleItem) => {
                setChatResponse((current) => ({
                  ...current,
                  planSections: buildVisiblePlanSections(
                    sectionIndex,
                    section.title,
                    itemIndex,
                    visibleItem,
                  ),
                }))
              })
            })
          })

          pauseStream(STREAM_SECTION_PAUSE)
          queueResponseText('summaryTitle', MockChatResponse.summaryTitle)
          pauseStream(STREAM_SECTION_PAUSE)
          queueResponseText('summaryText', MockChatResponse.summaryText)

          pauseStream(STREAM_SECTION_PAUSE)
          queueResponseText('closingText', MockChatResponse.closingText)

          pauseStream(STREAM_FINAL_PAUSE)
          queueStreamStep(() => {
            setChatResponse((current) => ({
              ...current,
              plan: MockChatResponse.plan,
            }))
            setChatStatus('complete')
          })
        },
      )
    },
    [runStreamQueue],
  )

  const handleChatSubmit = useCallback(
    (message: string) => {
      clearStreamTimers()
      resetChatAutoScroll()
      setChatMessage(message)
      setChatResponse({})
      setChatActions([])
      setQuestionAnswers([])
      setActiveQuestionIndex(0)
      setChatStatus('loading')

      runStreamQueue(
        STREAM_INITIAL_DELAY,
        ({ queueStreamStep, pauseStream, queueResponseText }) => {
          queueStreamStep(() => {
            setChatStatus('streaming')
          })
          queueResponseText('openingText', MockChatResponse.openingText)
          pauseStream(STREAM_SECTION_PAUSE)

          MockChatActions.forEach((action) => {
            queueStreamStep(() => {
              setChatActions((current) => [
                ...current,
                { ...action, isLoading: true },
              ])
            })
            pauseStream(STREAM_ACTION_STEP_DELAY)
            queueStreamStep(() => {
              setChatActions((current) =>
                current.map((currentAction) =>
                  currentAction.id === action.id
                    ? { ...currentAction, isLoading: false }
                    : currentAction,
                ),
              )
            })
          })

          pauseStream(STREAM_SECTION_PAUSE)
          queueResponseText('followUpText', MockChatResponse.followUpText)

          pauseStream(STREAM_SECTION_PAUSE)
          queueStreamStep(() => {
            if (MockChatResponse.questions.length > 0) {
              setChatStatus('awaitingQuestions')
              return
            }

            setChatStatus('streaming')
            queuePlanStream()
          })
        },
      )
    },
    [clearStreamTimers, queuePlanStream, resetChatAutoScroll, runStreamQueue],
  )

  const finishQuestions = useCallback(
    (answers: ChatQuestionAnswer[]) => {
      resetChatAutoScroll()
      setQuestionAnswers(answers)
      setChatResponse((current) => ({
        ...current,
        questionsIntro: MockChatResponse.questionsIntro,
        questions: MockChatResponse.questions,
      }))
      setActiveQuestionIndex(MockChatResponse.questions.length - 1)
      setChatStatus('streaming')
      queuePlanStream()
    },
    [queuePlanStream, resetChatAutoScroll],
  )

  const handleQuestionSubmit = useCallback(
    (value: ChatQuestionAnswerValue) => {
      if (!activeQuestion) return

      const nextAnswers = upsertQuestionAnswer(questionAnswers, {
        questionId: activeQuestion.id,
        status: 'answered',
        value,
      })

      if (activeQuestionIndex >= MockChatResponse.questions.length - 1) {
        finishQuestions(nextAnswers)
        return
      }

      setQuestionAnswers(nextAnswers)
      setActiveQuestionIndex((current) => current + 1)
    },
    [activeQuestion, activeQuestionIndex, finishQuestions, questionAnswers],
  )

  const handleQuestionSkip = useCallback(() => {
    if (!activeQuestion) return

    const nextAnswers = upsertQuestionAnswer(questionAnswers, {
      questionId: activeQuestion.id,
      status: 'skipped',
    })

    if (activeQuestionIndex >= MockChatResponse.questions.length - 1) {
      finishQuestions(nextAnswers)
      return
    }

    setQuestionAnswers(nextAnswers)
    setActiveQuestionIndex((current) => current + 1)
  }, [activeQuestion, activeQuestionIndex, finishQuestions, questionAnswers])

  const handleQuestionSkipAll = useCallback(() => {
    const answeredQuestionIds = new Set(
      questionAnswers.map((answer) => answer.questionId),
    )
    const skippedAnswers = MockChatResponse.questions
      .filter((question) => !answeredQuestionIds.has(question.id))
      .map<ChatQuestionAnswer>((question) => ({
        questionId: question.id,
        status: 'skipped',
      }))

    finishQuestions([...questionAnswers, ...skippedAnswers])
  }, [finishQuestions, questionAnswers])

  const handleQuestionBack = useCallback(() => {
    setActiveQuestionIndex((current) => Math.max(current - 1, 0))
  }, [])

  return (
    <>
      <Dialog
        title="Action Details"
        open={isActionDialogOpen}
        onOpenChange={setIsActionDialogOpen}
      >
        {isActionDialogOpen && (
          <ChatResponse
            response={MockChatResponse}
            actions={MockChatActions}
            actionsExpanded={true}
            actionOnClick={() => setIsActionDialogOpen(false)}
          />
        )}
      </Dialog>

      <a
        href="#main-content"
        className="focus:bg-inverse focus:text-text-inverse sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>

      <h1 className="sr-only">Bolt</h1>
      <main
        id="main-content"
        className="h-full overflow-hidden pb-15 md:grid md:grid-cols-12 md:pb-0 lg:grid-cols-[450px_1fr]"
      >
        <section
          ref={chatRef}
          aria-label="Chat"
          tabIndex={-1}
          className={`relative h-full min-h-0 flex-col outline-none md:col-span-6 lg:col-auto ${isMobileChat ? 'flex' : 'hidden md:flex'}`}
        >
          <ChatHeader
            teams={MockUserTeams}
            projects={MockUserProjects}
            currentProject={MockUserCurrentProject}
          />

          <div
            ref={chatScrollRef}
            className="min-h-0 flex-1 overflow-auto"
            onScroll={handleChatScroll}
          >
            {!chatMessage && <ChatMessage response={MockChatResponseEmpty} />}

            {chatMessage && (
              <ChatMessage
                message={chatMessage}
                response={chatResponse}
                actions={chatActions}
                questionAnswers={questionAnswers}
                isLoading={isLoading}
                isStreaming={isStreaming}
                onOpenActionDetails={() => setIsActionDialogOpen(true)}
              />
            )}
          </div>

          {isAnsweringQuestions && activeQuestion ? (
            <ChatQuestionForm
              key={activeQuestion.id}
              question={activeQuestion}
              questionIndex={activeQuestionIndex}
              questionCount={MockChatResponse.questions.length}
              initialAnswer={activeQuestionAnswer}
              onSubmit={handleQuestionSubmit}
              onSkip={handleQuestionSkip}
              onSkipAll={handleQuestionSkipAll}
              onBack={handleQuestionBack}
            />
          ) : (
            <div className="relative shrink-0">
              {isScrollToBottomVisible && (
                <div className="pointer-events-none absolute right-0 bottom-full left-0 z-10 mb-3 flex justify-center">
                  <Button
                    size="md"
                    radius="pill"
                    variant="subtle"
                    iconOnly
                    aria-label="Scroll to latest response"
                    className="border-border-default bg-surface-raised pointer-events-auto border shadow-lg"
                    onClick={handleScrollToBottomClick}
                  >
                    <ArrowDown size={18} aria-hidden="true" />
                  </Button>
                </div>
              )}

              <ChatForm
                tokens={MockUserBoltTokens}
                onSubmit={handleChatSubmit}
              />
            </div>
          )}
        </section>

        <section
          ref={workbenchRef}
          aria-label="Workbench"
          tabIndex={-1}
          className={`mx-3 h-full min-h-0 flex-col overflow-scroll outline-none md:col-span-6 md:ml-0 lg:col-auto ${isMobileChat ? 'hidden md:flex' : 'flex'}`}
        >
          <WorkbenchHeader
            teams={MockUserTeams}
            activePane={activePane}
            onPaneChange={handlePaneChange}
            activeDatabaseSection={activeDatabaseSection}
            onDatabaseSectionChange={setActiveDatabaseSection}
            chatInitiated={hasChatStarted}
          />

          <WorkbenchPreview
            isVisible={activePane === 'preview'}
            showStartPlaceholder={!isMockConversationComplete}
            hasChatStarted={hasChatStarted}
            onImplementPlan={() => handleChatSubmit('Implement this plan')}
            children={
              isMockConversationComplete ? <MockWorkbenchPreview /> : null
            }
          />

          <WorkbenchCodebase
            isVisible={activePane === 'codebase'}
            file={MockWorkbenchFile}
            list={MockWorkbenchFileTree}
            terminal={MockWorkbenchTerminal}
          />

          <WorkbenchDatabase
            isVisible={activePane === 'database'}
            list={MockWorkbenchDatabaseTables}
            activeDatabaseSection={activeDatabaseSection}
          />
        </section>
      </main>

      <MobileNavigation
        teams={MockUserTeams}
        activeView={activeMobileView}
        onViewChange={handleMobileViewChange}
      />

      <InstallPrompt />
    </>
  )
}
