import type { FileContents } from "@pierre/diffs/react";

export type MockWorkbenchDatabaseTable = {
  id: number;
  type: MockWorkbenchFileTreeItemType;
  name: string;
  children: MockWorkbenchDatabaseRow[];
}

export type MockWorkbenchDatabaseRow = {
  id: number;
  type: MockWorkbenchFileTreeItemType;
  title: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export const MockWorkbenchDatabaseTables: MockWorkbenchDatabaseTable[] = [
  {
    id: 1,
    name: "posts",
    type: "table",
    children: [
      {
        id: 1,
        type: "row",
        title: "Post 1",
        name: "Content 1",
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
      },
    ],
  },
  {
    id: 2,
    name: "post_media",
    type: "table",
    children: [
      {
        id: 1,
        type: "row",
        title: "Post Media 1",
        name: "Content 1",
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
      },
    ],
  },
  {
    id: 3,
    name: "social_accounts",
    type: "table",
    children: [
      {
        id: 1,
        type: "row",
        title: "Social Account 1",
        name: "Content 1",
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
      },
    ],
  },
  {
    id: 4,
    name: "post_platforms",
    type: "table",
    children: [
      {
        id: 1,
        type: "row",
        title: "Post Platform 1",
        name: "Content 1",
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
      },
    ],
  },
  {
    id: 5,
    name: "users",
    type: "table",
    children: [
      {
        id: 1,
        type: "row",
        title: "User 1",
        name: "Content 1",
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
      },
    ],
  },
];

export type MockWorkbenchFileTreeItemType = "directory" | "file" | "table" | "row" | "column";

export type MockWorkbenchFileTreeNode = {
  name: string;
  type?: MockWorkbenchFileTreeItemType;
  open?: boolean;
  selected?: boolean;
  children?: MockWorkbenchFileTreeNode[];
};

export const MockWorkbenchFileTree: MockWorkbenchFileTreeNode[] = [
  { name: ".bolt", type: "directory" },
  {
    name: "src",
    type: "directory",
    open: true,
    children: [
      { name: "components", type: "directory" },
      { name: "contexts", type: "directory" },
      { name: "hooks", type: "directory" },
      { name: "lib", type: "directory" },
      { name: "pages", type: "directory" },
      { name: "services", type: "directory" },
      { name: "utils", type: "directory" },
      { name: "App.tsx", selected: true, type: "file" },
      { name: "index.css", type: "file" },
      { name: "main.tsx", type: "file" },
      { name: "vite-env.d.ts", type: "file" },
    ],
  },
  { name: "supabase", type: "directory" },
  { name: ".env", type: "file" },
  { name: ".gitignore", type: "file" },
  { name: ".eslint.config.js", type: "file" },
  { name: "IMPLEMENTATION_SUMMARY.md", type: "file" },
  { name: "index.html", type: "file" },
  { name: "MASTODON_SETUP_GUIDE.md", type: "file" },
  { name: "package-lock.json", type: "file" },
  { name: "package.json", type: "file" },
  { name: "PHASE_2_MASTODON_COMPLETE.md", type: "file" },
  { name: "postcss.config.js", type: "file" },
  { name: "tailwind.config.js", type: "file" },
  { name: "tsconfig.app.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
  { name: "tsconfig.node.json", type: "file" },
  { name: "TWITTER_SETUP_GUIDE.md", type: "file" },
  { name: "vite.config.ts", type: "file" },
];

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
};

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
};