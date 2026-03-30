import { useState } from 'react';
import Dialog from './ui/composite/Dialog';
import ChatResponse from './ui/composite/ChatResponse';
import ChatHeader from './ui/composite/ChatHeader';
import ChatMessage from './ui/composite/ChatMessage';
import ChatForm from './ui/composite/ChatForm';
import EditorHeader from './ui/composite/EditorHeader';
import EditorOutput from './ui/composite/EditorOutput';
import EditorCodebase from './ui/composite/EditorCodebase';
import EditorDatabase from './ui/composite/EditorDatabase';
import MockEditorOutput from './data/MockEditorOutput';
import { MockEditorFile, MockEditorFileList, MockEditorTerminal } from './data/MockEditorFiles';
import { MockUserBoltTokens, MockUserCurrentProject, MockUserProjects, MockUserTeams } from './data/MockUser';

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [isEditorOutputVisible, setIsEditorOutputVisible] = useState(true);
  const [isEditorCodebaseVisible, setIsEditorCodebaseVisible] = useState(false);
  const [isEditorDatabaseVisible, setIsEditorDatabaseVisible] = useState(false);

  return (
    <>
      <Dialog title="Action Details" children={<ChatResponse actionsExpanded={true} actionOnClick={() => false} />} open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen} />

      <main className="h-full md:grid md:grid-cols-12 lg:grid-cols-[450px_1fr]">
        <section className="relative flex flex-col md:col-span-6 lg:col-auto min-h-0 h-full">
          <ChatHeader teams={MockUserTeams} projects={MockUserProjects} currentProject={MockUserCurrentProject} />

          <div className="min-h-0 flex-1 overflow-auto">
            <ChatMessage setIsActionDialogOpen={setIsActionDialogOpen} isActionDialogOpen={isActionDialogOpen} />
            <ChatForm tokens={MockUserBoltTokens} />
          </div>
        </section>

        <div className="md:col-span-6 lg:col-auto min-h-0 h-full overflow-scroll mx-3 md:ml-0 flex flex-col">
          <EditorHeader isEditorOutputVisible={isEditorOutputVisible} setIsEditorOutputVisible={setIsEditorOutputVisible} isEditorCodebaseVisible={isEditorCodebaseVisible} setIsEditorCodebaseVisible={setIsEditorCodebaseVisible} isEditorDatabaseVisible={isEditorDatabaseVisible} setIsEditorDatabaseVisible={setIsEditorDatabaseVisible} />
          <EditorOutput isVisible={isEditorOutputVisible} children={<MockEditorOutput />} />
          <EditorCodebase isVisible={isEditorCodebaseVisible} file={MockEditorFile} fileList={MockEditorFileList} terminal={MockEditorTerminal} />
          <EditorDatabase isVisible={isEditorDatabaseVisible} />
        </div>
      </main>
    </>
  )
}
