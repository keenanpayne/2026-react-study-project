import type { FileContents } from '@pierre/diffs/react'

export type MockWorkbenchDatabaseTable = {
  id: number
  type: MockWorkbenchFileTreeItemType
  name: string
  created_at: Date
  updated_at: Date
  children?: MockWorkbenchDatabaseRow[]
  selected?: boolean
}

export type MockWorkbenchDatabaseRow = {
  id: number
  type: MockWorkbenchFileTreeItemType
  name: string
  created_at: Date
  updated_at: Date
  children?: MockWorkbenchDatabaseColumn[]
  expandable?: boolean
  selected?: boolean
}

export type MockWorkbenchDatabaseColumn = {
  id: number
  type: MockWorkbenchFileTreeItemType
  name: string
  value: string | number | null
  created_at: Date
  updated_at: Date
}

export const MockWorkbenchDatabaseTables: MockWorkbenchDatabaseTable[] = [
  {
    id: 1,
    name: 'users',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:02.578Z'),
    updated_at: new Date('2025-11-23T19:10:02.578Z'),
    children: [
      {
        id: 1,
        type: 'row',
        expandable: false,
        name: 'Keenan Payne',
        created_at: new Date('2025-11-23T19:10:02.578Z'),
        updated_at: new Date('2025-11-23T19:10:02.578Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'email',
            value: 'keenan@example.com',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'full_name',
            value: 'Keenan Payne',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'timezone',
            value: 'America/Los_Angeles',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:02.578Z',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'updated_at',
            value: '2025-11-23T19:10:02.578Z',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'social_accounts',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:02.578Z'),
    updated_at: new Date('2025-11-23T19:10:02.578Z'),
    children: [],
  },
  {
    id: 3,
    name: 'posts',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:58.705Z'),
    updated_at: new Date('2025-11-23T19:10:58.705Z'),
    children: [
      {
        id: 1,
        type: 'row',
        expandable: false,
        name: "This is what I'm thinking about",
        created_at: new Date('2025-11-23T19:10:58.705Z'),
        updated_at: new Date('2025-11-23T19:10:58.705Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'user_id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'content',
            value: "This is what I'm thinking about",
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'status',
            value: 'draft',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'scheduled_at',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'published_at',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 7,
            type: 'column',
            name: 'error_message',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 8,
            type: 'column',
            name: 'is_thread',
            value: 'false',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 9,
            type: 'column',
            name: 'thread_order',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 10,
            type: 'column',
            name: 'thread_parent_id',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 11,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:58.705Z',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 12,
            type: 'column',
            name: 'updated_at',
            value: '2025-11-23T19:10:58.705Z',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'post_platforms',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:58.814Z'),
    updated_at: new Date('2025-11-23T19:10:58.905Z'),
    children: [
      {
        id: 1,
        type: 'row',
        expandable: false,
        name: 'twitter',
        created_at: new Date('2025-11-23T19:10:58.814Z'),
        updated_at: new Date('2025-11-23T19:10:58.814Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'post_id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'platform',
            value: 'twitter',
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'platform_post_id',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'status',
            value: 'pending',
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'error_message',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 7,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:58.814Z',
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
        ],
      },
      {
        id: 2,
        type: 'row',
        expandable: false,
        name: 'bluesky',
        created_at: new Date('2025-11-23T19:10:58.905Z'),
        updated_at: new Date('2025-11-23T19:10:58.905Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 2,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'post_id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'platform',
            value: 'bluesky',
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'platform_post_id',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'status',
            value: 'pending',
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'error_message',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 7,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:58.905Z',
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'post_media',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:02.578Z'),
    updated_at: new Date('2025-11-23T19:10:02.578Z'),
    children: [],
  },
]

export type MockWorkbenchFileTreeItemType =
  | 'directory'
  | 'file'
  | 'table'
  | 'row'
  | 'column'

export type MockWorkbenchFileTreeNode = {
  id?: number
  name: string
  type?: MockWorkbenchFileTreeItemType
  value?: string | number | null
  open?: boolean
  selected?: boolean
  expandable?: boolean
  children?: MockWorkbenchFileTreeNode[]
}

export const MockWorkbenchFileTree: MockWorkbenchFileTreeNode[] = [
  { name: '.bolt', type: 'directory' },
  {
    name: 'src',
    type: 'directory',
    open: true,
    children: [
      { name: 'components', type: 'directory' },
      { name: 'contexts', type: 'directory' },
      { name: 'hooks', type: 'directory' },
      { name: 'lib', type: 'directory' },
      { name: 'pages', type: 'directory' },
      { name: 'services', type: 'directory' },
      { name: 'utils', type: 'directory' },
      { name: 'App.tsx', selected: true, type: 'file' },
      { name: 'index.css', type: 'file' },
      { name: 'main.tsx', type: 'file' },
      { name: 'vite-env.d.ts', type: 'file' },
    ],
  },
  { name: 'supabase', type: 'directory' },
  { name: '.env', type: 'file' },
  { name: '.gitignore', type: 'file' },
  { name: '.eslint.config.js', type: 'file' },
  { name: 'IMPLEMENTATION_SUMMARY.md', type: 'file' },
  { name: 'index.html', type: 'file' },
  { name: 'MASTODON_SETUP_GUIDE.md', type: 'file' },
  { name: 'package-lock.json', type: 'file' },
  { name: 'package.json', type: 'file' },
  { name: 'PHASE_2_MASTODON_COMPLETE.md', type: 'file' },
  { name: 'postcss.config.js', type: 'file' },
  { name: 'tailwind.config.js', type: 'file' },
  { name: 'tsconfig.app.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'tsconfig.node.json', type: 'file' },
  { name: 'TWITTER_SETUP_GUIDE.md', type: 'file' },
  { name: 'vite.config.ts', type: 'file' },
]

export const MockWorkbenchFile: FileContents = {
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
}

export const MockWorkbenchTerminal: FileContents = {
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
}
