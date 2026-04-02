import { File, type FileContents } from '@pierre/diffs/react'
import type { TreeNode } from '~/types/workbench'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchTerminal from './WorkbenchTerminal'
import WorkbenchRightContent from './WorkbenchRightContent'
import { FolderTree } from 'lucide-react'
import { DIFF_FILE_OPTIONS } from '~/utils/diffOptions'

type WorkbenchCodebaseProps = {
  file: FileContents
  list: TreeNode[]
  terminal: FileContents
  isVisible: boolean
}

export default function WorkbenchCodebase({
  file,
  list,
  terminal,
  isVisible,
}: WorkbenchCodebaseProps) {
  return (
    <WorkbenchContainer className={isVisible ? '' : 'hidden'}>
      <WorkbenchContents>
        <div className="flex min-h-0 flex-col @md:flex-1 @md:flex-row">
          <WorkbenchLeftSidebar
            key={list.map((n) => n.name).join(':')}
            list={list}
            listLabel="Files"
            listIcon={FolderTree}
          />

          <WorkbenchRightContent>
            <File file={file} options={DIFF_FILE_OPTIONS} />
          </WorkbenchRightContent>
        </div>

        <WorkbenchTerminal file={terminal} />
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}
