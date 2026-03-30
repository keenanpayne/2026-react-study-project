import { ChevronRight, File as FileIcon, FolderTree, Rocket, SearchCode, SquareTerminal, Zap } from "lucide-react";
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
      <p className={`flex items-center gap-1.5 cursor-pointer py-1 text-sm transition-colors ${props.nested ? 'px-4' : 'px-1.5'} ${props.selected ? 'bg-sky-100 dark:bg-sky-800/50' : 'text-gray-500 dark:text-zinc-300 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}>
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
  lang: 'typescript',
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

const terminal: FileContents = {
  name: 'Terminal',
  lang: 'bash',
  contents: `5:27:20 PM [vite] page reload MASTODON_SETUP_GUIDE.md
5:27:20 PM [vite] Pre-transform error: Failed to resolve import "../contexts/AuthContext" from "src/pages/Signup.tsx". Does the file exist?
5:27:20 PM [vite] page reload src/hooks/usePosts.ts
5:27:20 PM [vite] page reload src/pages/Login.tsx
5:27:20 PM [vite] page reload src/pages/Signup.tsx
5:27:20 PM [vite] Pre-transform error: Failed to resolve import "../contexts/AuthContext" from "src/pages/Calendar.tsx". Does the file exist?
5:27:20 PM [vite] Pre-transform error: Failed to resolve import "./contexts/AuthContext" from "src/App.tsx". Does the file exist?
5:27:20 PM [vite] page reload src/pages/Dashboard.tsx
5:27:21 PM [vite] hmr update /src/index.css, /src/pages/Dashboard.tsx
5:27:22 PM [vite] hmr update /src/components/Layout.tsx
5:27:22 PM [vite] hmr update /src/contexts/AuthContext.tsx
5:27:22 PM [vite] hmr update /src/components/ProtectedRoute.tsx
5:27:22 PM [vite] hmr update /src/components/StatusBadge.tsx
5:27:22 PM [vite] hmr update /src/pages/Integrations.tsx
5:27:22 PM [vite] hmr update /src/pages/Composer.tsx, /src/index.css
5:27:22 PM [vite] hmr update /src/pages/Composer.tsx, /src/index.css (x2)
5:27:22 PM [vite] hmr update /src/pages/Integrations.tsx, /src/pages/Composer.tsx, /src/index.css
5:27:22 PM [vite] hmr update /src/pages/Composer.tsx, /src/index.css
5:27:23 PM [vite] ✨ new dependencies optimized: react-router-dom, @supabase/supabase-js
5:27:23 PM [vite] ✨ optimized dependencies changed. reloading
5:49:06 PM [vite] .env changed, restarting server...
5:49:06 PM [vite] hmr update /src/pages/Composer.tsx, /src/index.css
5:49:06 PM [vite] hmr update /src/pages/Integrations.tsx, /src/index.css
5:49:06 PM [vite] server restarted.
5:49:08 PM [vite] .env changed, restarting server...
5:49:08 PM [vite] hmr update /src/pages/Composer.tsx, /src/index.css
5:49:08 PM [vite] hmr update /src/pages/Integrations.tsx, /src/index.css
5:49:09 PM [vite] server restarted.`,
};

type EditorCodebaseProps = {
  isVisible: boolean;
}

export default function EditorCodebase(props: EditorCodebaseProps) {
  if (!props.isVisible) return null;

  return (
    <main className="flex-1 relative mb-3 rounded-xl border border-gray-200 dark:border-zinc-700 min-h-0 h-full w-full">
      <div className="@container/editor-codebase grid grid-cols-12 h-full">
        <aside className="col-span-4 @2xl:col-span-3 border-r border-gray-200 dark:border-zinc-700 overflow-scroll">
          <header className="px-1.5 py-1 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 rounded-tl-xl">
            <nav className="flex items-center gap-1.5">
              <Button size="md" radius="md">
                <FolderTree size={18} strokeWidth={1.5} />
                <span className="font-medium">Files</span>
              </Button>

              <Button size="md" radius="md">
                <SearchCode size={18} strokeWidth={1.5} />
                <span className="font-medium">Search</span>
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

        <article className="col-span-8 @2xl:col-span-9 overflow-scroll rounded-tr-xl">
          <File
            file={file}
            options={{
              theme: { dark: 'pierre-dark', light: 'pierre-light' },
            }}
          />
        </article>

        <section className="col-span-12 border-t border-gray-200 dark:border-zinc-700">
          <header className="p-1.5 border-b border-gray-200 dark:border-zinc-700">
            <nav className="flex items-center gap-2">
              <Button size="md" radius="pill" variant="subtle">
                <Zap size={18} strokeWidth={1.5} />
                Bolt
              </Button>

              <Button size="md" radius="pill" variant="ghost">
                <Rocket size={18} strokeWidth={1.5} />
                Publish Output
              </Button>

              <Button size="md" radius="pill" variant="ghost">
                <SquareTerminal size={18} strokeWidth={1.5} />
                Terminal
              </Button>
            </nav>
          </header>

          <File
            file={terminal}
            options={{
              theme: { dark: 'pierre-dark', light: 'pierre-light' },
              disableLineNumbers: true,
              disableFileHeader: true,
            }}
            className="max-h-[200px] overflow-scroll rounded-b-xl px-1.5 py-0.5 text-xs leading-tight"
          />
        </section>
      </div>
    </main>
  )
}