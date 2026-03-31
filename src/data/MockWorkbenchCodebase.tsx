import type { FileContents } from "@pierre/diffs/react";

export type MockWorkbenchFileTreeNode = {
  name: string;
  isDirectory?: boolean;
  open?: boolean;
  selected?: boolean;
  children?: MockWorkbenchFileTreeNode[];
};

export const MockWorkbenchFileTree: MockWorkbenchFileTreeNode[] = [
  { name: ".bolt", isDirectory: true },
  {
    name: "src",
    isDirectory: true,
    open: true,
    children: [
      { name: "components", isDirectory: true },
      { name: "contexts", isDirectory: true },
      { name: "hooks", isDirectory: true },
      { name: "lib", isDirectory: true },
      { name: "pages", isDirectory: true },
      { name: "services", isDirectory: true },
      { name: "utils", isDirectory: true },
      { name: "App.tsx", selected: true },
      { name: "index.css" },
      { name: "main.tsx" },
      { name: "vite-env.d.ts" },
    ],
  },
  { name: "supabase", isDirectory: true },
  { name: ".env" },
  { name: ".gitignore" },
  { name: ".eslint.config.js" },
  { name: "IMPLEMENTATION_SUMMARY.md" },
  { name: "index.html" },
  { name: "MASTODON_SETUP_GUIDE.md" },
  { name: "package-lock.json" },
  { name: "package.json" },
  { name: "PHASE_2_MASTODON_COMPLETE.md" },
  { name: "postcss.config.js" },
  { name: "tailwind.config.js" },
  { name: "tsconfig.app.json" },
  { name: "tsconfig.json" },
  { name: "tsconfig.node.json" },
  { name: "TWITTER_SETUP_GUIDE.md" },
  { name: "vite.config.ts" },
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