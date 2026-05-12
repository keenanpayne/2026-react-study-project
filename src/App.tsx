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

const STREAM_INITIAL_DELAY = 1400
const STREAM_STEP_DELAY = 1100
const STREAM_ACTION_STEP_DELAY = 750
const STREAM_PLAN_ITEM_STEP_DELAY = 450

const buildVisiblePlanSections = (
  sectionIndex: number,
  itemCount: number,
): ChatPlanSection[] =>
  MockChatResponse.planSections
    .slice(0, sectionIndex + 1)
    .map((section, index) =>
      index === sectionIndex
        ? { ...section, items: section.items.slice(0, itemCount) }
        : section,
    )

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
      const queueStreamStep = (
        callback: () => void,
        stepDelay = STREAM_STEP_DELAY,
      ) => {
        const delay = streamDelay
        const timer = setTimeout(callback, delay)
        streamTimersRef.current.push(timer)
        streamDelay += stepDelay
      }

      queueStreamStep(() => {
        setChatStatus('streaming')
        setChatResponse({ openingText: MockChatResponse.openingText })
      })

      MockChatActions.forEach((_, index) => {
        queueStreamStep(() => {
          setChatActions(MockChatActions.slice(0, index + 1))
        }, STREAM_ACTION_STEP_DELAY)
      })

      queueStreamStep(() => {
        setChatResponse((current) => ({
          ...current,
          followUpText: MockChatResponse.followUpText,
        }))
      })

      queueStreamStep(() => {
        setChatResponse((current) => ({
          ...current,
          questionsIntro: MockChatResponse.questionsIntro,
          questions: MockChatResponse.questions,
        }))
      })

      queueStreamStep(() => {
        setChatResponse((current) => ({
          ...current,
          planTitle: MockChatResponse.planTitle,
        }))
      })

      MockChatResponse.planSections.forEach((section, sectionIndex) => {
        section.items.forEach((_, itemIndex) => {
          queueStreamStep(() => {
            setChatResponse((current) => ({
              ...current,
              planSections: buildVisiblePlanSections(
                sectionIndex,
                itemIndex + 1,
              ),
            }))
          }, STREAM_PLAN_ITEM_STEP_DELAY)
        })
      })

      queueStreamStep(() => {
        setChatResponse((current) => ({
          ...current,
          summaryTitle: MockChatResponse.summaryTitle,
          summaryText: MockChatResponse.summaryText,
        }))
      })

      queueStreamStep(() => {
        setChatResponse((current) => ({
          ...current,
          closingText: MockChatResponse.closingText,
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
