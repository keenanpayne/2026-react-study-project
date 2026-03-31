import { useState } from 'react';
import Dialog from './ui/composite/Dialog';
import ChatResponse from './ui/composite/ChatResponse';
import ChatHeader from './ui/composite/ChatHeader';
import ChatMessage from './ui/composite/ChatMessage';
import ChatForm from './ui/composite/ChatForm';
import WorkbenchHeader from './ui/composite/WorkbenchHeader';
import WorkbenchPreview from './ui/composite/WorkbenchPreview';
import WorkbenchCodebase from './ui/composite/WorkbenchCodebase';
import WorkbenchDatabase from './ui/composite/WorkbenchDatabase';
import MobileNavigation from './ui/composite/MobileNavigation';
import type { MobileView } from './ui/composite/MobileNavigation';
import MockWorkbenchPreview from './data/MockWorkbenchPreview';
import { MockWorkbenchDatabaseTables, MockWorkbenchFile, MockWorkbenchFileTree, MockWorkbenchTerminal } from './data/MockWorkbenchCodebase';
import { MockUserBoltTokens, MockUserCurrentProject, MockUserProjects, MockUserTeams } from './data/MockUser';

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [isWorkbenchPreviewVisible, setIsWorkbenchPreviewVisible] = useState(true);
  const [isWorkbenchCodebaseVisible, setIsWorkbenchCodebaseVisible] = useState(false);
  const [isWorkbenchDatabaseVisible, setIsWorkbenchDatabaseVisible] = useState(false);
  const [activeMobileView, setActiveMobileView] = useState<MobileView>('chat');

  function handleMobileViewChange(view: MobileView) {
    setActiveMobileView(view);

    if (view === 'preview') {
      setIsWorkbenchPreviewVisible(true);
      setIsWorkbenchCodebaseVisible(false);
      setIsWorkbenchDatabaseVisible(false);
    } else if (view === 'codebase') {
      setIsWorkbenchPreviewVisible(false);
      setIsWorkbenchCodebaseVisible(true);
      setIsWorkbenchDatabaseVisible(false);
    } else if (view === 'database') {
      setIsWorkbenchPreviewVisible(false);
      setIsWorkbenchCodebaseVisible(false);
      setIsWorkbenchDatabaseVisible(true);
    }
  }

  const isMobileChat = activeMobileView === 'chat';

  return (
    <>
      <Dialog title="Action Details" children={<ChatResponse actionsExpanded={true} actionOnClick={() => false} />} open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen} />

      <main className="h-full pb-15 md:pb-0 md:grid md:grid-cols-12 lg:grid-cols-[450px_1fr]">
        <section className={`relative flex-col md:col-span-6 lg:col-auto min-h-0 h-full ${isMobileChat ? 'flex' : 'hidden md:flex'}`}>
          <ChatHeader teams={MockUserTeams} projects={MockUserProjects} currentProject={MockUserCurrentProject} />

          <div className="min-h-0 flex-1 overflow-auto">
            <ChatMessage setIsActionDialogOpen={setIsActionDialogOpen} isActionDialogOpen={isActionDialogOpen} />
            <ChatForm tokens={MockUserBoltTokens} />
          </div>
        </section>

        <div className={`md:col-span-6 lg:col-auto min-h-0 h-full overflow-scroll mx-3 md:ml-0 flex-col ${isMobileChat ? 'hidden md:flex' : 'flex'}`}>
          <WorkbenchHeader isWorkbenchPreviewVisible={isWorkbenchPreviewVisible} setIsWorkbenchPreviewVisible={setIsWorkbenchPreviewVisible} isWorkbenchCodebaseVisible={isWorkbenchCodebaseVisible} setIsWorkbenchCodebaseVisible={setIsWorkbenchCodebaseVisible} isWorkbenchDatabaseVisible={isWorkbenchDatabaseVisible} setIsWorkbenchDatabaseVisible={setIsWorkbenchDatabaseVisible} />
          <WorkbenchPreview isVisible={isWorkbenchPreviewVisible} children={<MockWorkbenchPreview />} />
          <WorkbenchCodebase isVisible={isWorkbenchCodebaseVisible} file={MockWorkbenchFile} list={MockWorkbenchFileTree} terminal={MockWorkbenchTerminal} />
          <WorkbenchDatabase isVisible={isWorkbenchDatabaseVisible} list={MockWorkbenchDatabaseTables} />
        </div>
      </main>

      <MobileNavigation activeView={activeMobileView} onViewChange={handleMobileViewChange} />
    </>
  )
}
