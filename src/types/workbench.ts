export type MockWorkbenchFileTreeItemType =
  | 'directory'
  | 'file'
  | 'table'
  | 'row'
  | 'column'

export type TreeNode = {
  id?: number
  name: string
  type?: MockWorkbenchFileTreeItemType
  value?: string | number | null
  open?: boolean
  selected?: boolean
  expandable?: boolean
  created_at?: Date
  updated_at?: Date
  children?: TreeNode[]
}
