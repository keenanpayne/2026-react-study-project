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
import MockWorkbenchPreview from './data/MockWorkbenchPreview'
import {
  MockWorkbenchDatabaseTables,
  MockWorkbenchFile,
  MockWorkbenchFileTree,
  MockWorkbenchTerminal,
} from './data/MockWorkbenchCodebase'
import {
  MockUserBoltTokens,
  MockUserCurrentProject,
  MockUserProjects,
  MockUserTeams,
} from './data/MockUser'
import { useMobileNavigation } from './hooks/useMobileNavigation'

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const {
    activePane,
    setActivePane,
    activeMobileView,
    handleMobileViewChange,
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
            actionsExpanded={true}
            actionOnClick={() => setIsActionDialogOpen(false)}
          />
        )}
      </Dialog>

      <main className="h-full pb-15 md:grid md:grid-cols-12 md:pb-0 lg:grid-cols-[450px_1fr]">
        <section
          className={`relative h-full min-h-0 flex-col md:col-span-6 lg:col-auto ${isMobileChat ? 'flex' : 'hidden md:flex'}`}
        >
          <ChatHeader
            teams={MockUserTeams}
            projects={MockUserProjects}
            currentProject={MockUserCurrentProject}
          />

          <div className="min-h-0 flex-1 overflow-auto">
            <ChatMessage
              onOpenActionDetails={() => setIsActionDialogOpen(true)}
            />
            <ChatForm tokens={MockUserBoltTokens} />
          </div>
        </section>

        <div
          className={`mx-3 h-full min-h-0 flex-col overflow-scroll md:col-span-6 md:ml-0 lg:col-auto ${isMobileChat ? 'hidden md:flex' : 'flex'}`}
        >
          <WorkbenchHeader
            activePane={activePane}
            onPaneChange={setActivePane}
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
          />
        </div>
      </main>

      <MobileNavigation
        activeView={activeMobileView}
        onViewChange={handleMobileViewChange}
      />
    </>
  )
}
