import { useState } from 'react'
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
import {
  MockChatActions,
  MockChatResponse,
  MockChatUserMessage,
} from './data/mockChat'
import { useMobileNavigation } from './hooks/useMobileNavigation'
import InstallPrompt from './ui/components/InstallPrompt'
import type { WorkbenchDatabaseSection } from '~/types/navigation'

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [activeDatabaseSection, setActiveDatabaseSection] =
    useState<WorkbenchDatabaseSection>('database')
  const {
    activePane,
    setActivePane,
    activeMobileView,
    handleMobileViewChange,
    chatRef,
    workbenchRef,
  } = useMobileNavigation()

  const isMobileChat = activeMobileView === 'chat'

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

          <div className="min-h-0 flex-1 overflow-auto">
            <ChatMessage
              message={MockChatUserMessage}
              response={MockChatResponse}
              actions={MockChatActions}
              onOpenActionDetails={() => setIsActionDialogOpen(true)}
            />
          </div>

          <ChatForm tokens={MockUserBoltTokens} />
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
