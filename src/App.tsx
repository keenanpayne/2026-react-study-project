import { useCallback, useEffect, useRef, useState } from 'react'
import Dialog from './ui/components/Dialog'
import ChatResponse from './ui/components/ChatResponse'
import ChatHeader from './ui/components/ChatHeader'
import ChatMessage from './ui/components/ChatMessage'
import ChatForm from './ui/components/ChatForm'
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
import { MockChatActions, MockChatResponse } from './data/mockChat'
import { useMobileNavigation } from './hooks/useMobileNavigation'
import InstallPrompt from './ui/components/InstallPrompt'
import type {
  ChatActionData,
  ChatPlanSection,
  ChatResponseData,
} from '~/types/chat'
import type { WorkbenchDatabaseSection } from '~/types/navigation'

type ChatStatus = 'idle' | 'loading' | 'streaming' | 'complete'
type ChatResponseTextKey =
  | 'openingText'
  | 'followUpText'
  | 'questionsIntro'
  | 'planTitle'
  | 'summaryTitle'
  | 'summaryText'
  | 'closingText'

const STREAM_INITIAL_DELAY = 1500
const STREAM_CHARACTER_DELAY = 24
const STREAM_SPACE_DELAY = 32
const STREAM_COMMA_DELAY = 75
const STREAM_SENTENCE_DELAY = 150
const STREAM_SECTION_PAUSE = 375
const STREAM_ACTION_STEP_DELAY = 750
const STREAM_FINAL_PAUSE = 700

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

const buildVisibleQuestions = (
  questionIndex: number,
  visibleLabel: string,
  visibleText: string,
) =>
  MockChatResponse.questions
    .slice(0, questionIndex + 1)
    .map((question, index) =>
      index === questionIndex
        ? { ...question, label: visibleLabel, text: visibleText }
        : question,
    )

const getCharacterDelay = (character: string, index: number) => {
  if (/[.!?]/.test(character)) return STREAM_SENTENCE_DELAY
  if (/[,;:]/.test(character)) return STREAM_COMMA_DELAY
  if (/\s/.test(character)) return STREAM_SPACE_DELAY

  return STREAM_CHARACTER_DELAY + (index % 4) * 8
}

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
  const streamTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const {
    activePane,
    setActivePane,
    activeMobileView,
    handleMobileViewChange,
    chatRef,
    workbenchRef,
  } = useMobileNavigation()

  const isMobileChat = activeMobileView === 'chat'
  const isLoading = chatStatus === 'loading'
  const isStreaming = chatStatus === 'streaming'

  const clearStreamTimers = useCallback(() => {
    streamTimersRef.current.forEach((timer) => clearTimeout(timer))
    streamTimersRef.current = []
  }, [])

  useEffect(() => clearStreamTimers, [clearStreamTimers])

  useEffect(() => {
    const chatScrollEl = chatScrollRef.current
    if (!chatScrollEl || chatStatus === 'idle') return

    chatScrollEl.scrollTo({
      top: chatScrollEl.scrollHeight,
      behavior: chatStatus === 'streaming' ? 'smooth' : 'auto',
    })
  }, [chatActions, chatResponse, chatStatus])

  const handleChatSubmit = useCallback(
    (message: string) => {
      clearStreamTimers()
      setChatMessage(message)
      setChatResponse({})
      setChatActions([])
      setChatStatus('loading')

      let streamDelay = STREAM_INITIAL_DELAY
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
        const characters = Array.from(text)

        characters.forEach((character, index) => {
          queueStreamStep(() =>
            onUpdate(characters.slice(0, index + 1).join('')),
          )
          pauseStream(getCharacterDelay(character, index))
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

      queueStreamStep(() => {
        setChatStatus('streaming')
      })
      queueResponseText('openingText', MockChatResponse.openingText)
      pauseStream(STREAM_SECTION_PAUSE)

      MockChatActions.forEach((_, index) => {
        queueStreamStep(() => {
          setChatActions(MockChatActions.slice(0, index + 1))
        })
        pauseStream(STREAM_ACTION_STEP_DELAY)
      })

      pauseStream(STREAM_SECTION_PAUSE)
      queueResponseText('followUpText', MockChatResponse.followUpText)

      pauseStream(STREAM_SECTION_PAUSE)
      queueResponseText('questionsIntro', MockChatResponse.questionsIntro)

      MockChatResponse.questions.forEach((question, questionIndex) => {
        pauseStream(STREAM_SECTION_PAUSE)
        queueTextStream(question.label, (visibleLabel) => {
          setChatResponse((current) => ({
            ...current,
            questions: buildVisibleQuestions(questionIndex, visibleLabel, ''),
          }))
        })

        pauseStream(STREAM_COMMA_DELAY)
        queueTextStream(question.text, (visibleText) => {
          setChatResponse((current) => ({
            ...current,
            questions: buildVisibleQuestions(
              questionIndex,
              question.label,
              visibleText,
            ),
          }))
        })
      })

      pauseStream(STREAM_SECTION_PAUSE)
      queueResponseText('planTitle', MockChatResponse.planTitle)

      MockChatResponse.planSections.forEach((section, sectionIndex) => {
        pauseStream(STREAM_SECTION_PAUSE)
        queueTextStream(section.title, (visibleTitle) => {
          setChatResponse((current) => ({
            ...current,
            planSections: buildVisiblePlanSections(sectionIndex, visibleTitle),
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
    [clearStreamTimers],
  )

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

          <div ref={chatScrollRef} className="min-h-0 flex-1 overflow-auto">
            {chatMessage && (
              <ChatMessage
                message={chatMessage}
                response={chatResponse}
                actions={chatActions}
                isLoading={isLoading}
                isStreaming={isStreaming}
                onOpenActionDetails={() => setIsActionDialogOpen(true)}
              />
            )}
          </div>

          <ChatForm tokens={MockUserBoltTokens} onSubmit={handleChatSubmit} />
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
            onPaneChange={setActivePane}
            activeDatabaseSection={activeDatabaseSection}
            onDatabaseSectionChange={setActiveDatabaseSection}
          />

          <WorkbenchPreview
            isVisible={activePane === 'preview'}
            children={<MockWorkbenchPreview />}
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
