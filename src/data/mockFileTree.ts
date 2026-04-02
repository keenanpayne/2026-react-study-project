import type { MockWorkbenchFileTreeItemType } from '~/types/workbench'

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
