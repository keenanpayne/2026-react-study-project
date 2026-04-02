import type { FileContents } from '@pierre/diffs/react'

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
