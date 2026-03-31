import { useCallback, useState } from 'react';
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
import type { MobileView, WorkbenchPane } from './ui/composite/MobileNavigation';
import MockWorkbenchPreview from './data/MockWorkbenchPreview';
import { MockWorkbenchDatabaseTables, MockWorkbenchFile, MockWorkbenchFileTree, MockWorkbenchTerminal } from './data/MockWorkbenchCodebase';
import { MockUserBoltTokens, MockUserCurrentProject, MockUserProjects, MockUserTeams } from './data/MockUser';

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [activePane, setActivePane] = useState<WorkbenchPane>('preview');
  const [activeMobileView, setActiveMobileView] = useState<MobileView>('chat');

  const handleMobileViewChange = useCallback((view: MobileView) => {
    setActiveMobileView(view);

    if (view !== 'chat') {
      setActivePane(view);
    }
  }, []);

  const isMobileChat = activeMobileView === 'chat';

  return (
    <>
      <Dialog
        title="Action Details"
        open={isActionDialogOpen}
        onOpenChange={setIsActionDialogOpen}
      >
        {isActionDialogOpen && <ChatResponse actionsExpanded={true} actionOnClick={() => setIsActionDialogOpen(false)} />}
      </Dialog>

      <main className="h-full pb-15 md:pb-0 md:grid md:grid-cols-12 lg:grid-cols-[450px_1fr]">
        <section className={`relative flex-col md:col-span-6 lg:col-auto min-h-0 h-full ${isMobileChat ? 'flex' : 'hidden md:flex'}`}>
          <ChatHeader teams={MockUserTeams} projects={MockUserProjects} currentProject={MockUserCurrentProject} />

          <div className="min-h-0 flex-1 overflow-auto">
            <ChatMessage setIsActionDialogOpen={setIsActionDialogOpen} isActionDialogOpen={isActionDialogOpen} />
            <ChatForm tokens={MockUserBoltTokens} />
          </div>
        </section>

        <div className={`md:col-span-6 lg:col-auto min-h-0 h-full overflow-scroll mx-3 md:ml-0 flex-col ${isMobileChat ? 'hidden md:flex' : 'flex'}`}>
          <WorkbenchHeader activePane={activePane} onPaneChange={setActivePane} />
          <WorkbenchPreview isVisible={activePane === 'preview'} children={<MockWorkbenchPreview />} />
          <WorkbenchCodebase isVisible={activePane === 'codebase'} file={MockWorkbenchFile} list={MockWorkbenchFileTree} terminal={MockWorkbenchTerminal} />
          <WorkbenchDatabase isVisible={activePane === 'database'} list={MockWorkbenchDatabaseTables} />
        </div>
      </main>

      <MobileNavigation activeView={activeMobileView} onViewChange={handleMobileViewChange} />
    </>
  )
}
