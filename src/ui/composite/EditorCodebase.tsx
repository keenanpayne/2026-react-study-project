import { ChevronRight, File as FileIcon, FolderTree, Search } from "lucide-react";
import Button from "../base/Button";
import type { ReactNode } from "react";
import {
  type FileContents,
  File,
} from '@pierre/diffs/react';

type FileItemProps = {
  name: string;
  isDirectory?: boolean;
  children?: ReactNode;
  nested?: boolean;
  open?: boolean;
  selected?: boolean;
}

function FileItem(props: FileItemProps) {
  return (
    <li>
      <p className={`flex items-center gap-1.5 cursor-pointer py-1 text-sm transition-colors ${props.nested ? 'px-4' : 'px-1.5'} ${props.selected ? 'bg-sky-100 dark:bg-sky-900/20' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}>
        {props.isDirectory ? <ChevronRight size={14} strokeWidth={1} className={`shrink-0 ${props.open ? 'rotate-90' : ''}`} /> : <FileIcon size={12} strokeWidth={1.5} className="shrink-0" />}
        {props.name}
      </p>

      {props.children && (
        <>
          {props.children}
        </>
      )}
    </li>
  )
}

type FileItemListProps = {
  children: ReactNode;
}

function FileItemList(props: FileItemListProps) {
  return (
    <ul className="text-left h-full">
      {props.children}
    </ul>
  )
}

const file: FileContents = {
  name: 'src/App.tsx',
  contents: `import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Integrations } from './pages/Integrations';
import { Composer } from './pages/Composer';
import { Calendar } from './pages/Calendar';
import { PostDetail } from './pages/PostDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/composer"
            element={
              <ProtectedRoute>
                <Layout>
                  <Composer />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Layout>
                  <Calendar />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/integrations"
            element={
              <ProtectedRoute>
                <Layout>
                  <Integrations />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/:postId"
            element={
              <ProtectedRoute>
                <Layout>
                  <PostDetail />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;`,
};

type EditorCodebaseProps = {
  isVisible: boolean;
}

export default function EditorCodebase(props: EditorCodebaseProps) {
  if (!props.isVisible) return null;

  return (
    <main className="flex-1 relative mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full">
      <section className="grid grid-cols-12 h-full">
        <aside className="col-span-3 border-r border-gray-200 dark:border-zinc-700 overflow-scroll">
          <header className="p-1.5 border-b border-gray-200 dark:border-zinc-700">
            <nav className="flex items-center gap-1.5">
              <Button size="sm" rounded="md">
                <FolderTree size={16} strokeWidth={1.5} />
                Files
              </Button>

              <Button size="sm" rounded="md">
                <Search size={16} strokeWidth={1.5} />
                Search
              </Button>
            </nav>
          </header>

          <FileItemList>
            <FileItem name=".bolt" isDirectory={true} />
            <FileItem name="src" isDirectory={true} open>
              <FileItemList>
                <FileItem name="components" isDirectory={true} nested />
                <FileItem name="contexts" isDirectory={true} nested />
                <FileItem name="hooks" isDirectory={true} nested />
                <FileItem name="lib" isDirectory={true} nested />
                <FileItem name="pages" isDirectory={true} nested />
                <FileItem name="services" isDirectory={true} nested />
                <FileItem name="utils" isDirectory={true} nested />
                <FileItem name="App.tsx" nested selected />
                <FileItem name="index.css" nested />
                <FileItem name="main.tsx" nested />
                <FileItem name="vite-env.d.ts" nested />
              </FileItemList>
            </FileItem>
            <FileItem name="supabase" isDirectory={true} />
            <FileItem name=".env" />
            <FileItem name=".gitignore" />
            <FileItem name=".eslint.config.js" />
            <FileItem name="IMPLEMENTATION_SUMMARY.md" />
            <FileItem name="index.html" />
            <FileItem name="MASTODON_SETUP_GUIDE.md" />
            <FileItem name="package-lock.json" />
            <FileItem name="package.json" />
            <FileItem name="PHASE_2_MASTODON_COMPLETE.md" />
            <FileItem name="postcss.config.js" />
            <FileItem name="tailwind.config.js" />
            <FileItem name="tsconfig.app.json" />
            <FileItem name="tsconfig.json" />
            <FileItem name="tsconfig.node.json" />
            <FileItem name="TWITTER_SETUP_GUIDE.md" />
            <FileItem name="vite.config.ts" />
          </FileItemList>
        </aside>

        <article className="col-span-9 overflow-scroll rounded-tr-xl">
          <File
            file={file}
            options={{
              theme: { dark: 'pierre-dark', light: 'pierre-light' },
            }}
          />
        </article>

        <div className="col-span-12 border-t border-gray-200 dark:border-zinc-700">
          <header>
            <nav className="flex items-center gap-1.5">
              <Button size="md" rounded="md">Bolt</Button>
              <Button size="md" rounded="md">Publish Output</Button>
              <Button size="md" rounded="md">Terminal</Button>
            </nav>
          </header>
        </div>
      </section>
    </main>
  )
}