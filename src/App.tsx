import { useState } from 'react';
import Dialog from './ui/composite/Dialog';
import ChatResponse from './ui/composite/ChatResponse';
import ChatHeader from './ui/composite/ChatHeader';
import ChatMessage from './ui/composite/ChatMessage';
import ChatForm from './ui/composite/ChatForm';
import EditorHeader from './ui/composite/EditorHeader';
import EditorOutput from './ui/composite/EditorOutput';

export default function App() {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);

  return (
    <>
      <Dialog title="Action Details" children={<ChatResponse actionsExpanded={true} actionOnClick={() => false} />} open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen} width="xl" />

      <main className="h-full md:grid md:grid-cols-12 lg:grid-cols-[450px_1fr]">
        <section className="relative md:col-span-6 lg:col-auto h-full overflow-scroll">
          <ChatHeader />
          <ChatMessage setIsActionDialogOpen={setIsActionDialogOpen} isActionDialogOpen={isActionDialogOpen} />
          <ChatForm />
        </section>

        <div className="md:col-span-6 lg:col-auto h-full overflow-scroll mr-3">
          <EditorHeader />
          <EditorOutput />
        </div>
      </main>
    </>
  )
}
