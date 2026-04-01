import { File, type FileContents } from '@pierre/diffs/react'
import type { MockWorkbenchFileTreeNode } from '~/data/MockWorkbenchCodebase'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchTerminal from './WorkbenchTerminal'
import WorkbenchRightContent from './WorkbenchRightContent'
import { FolderTree } from 'lucide-react'
import { DIFF_FILE_OPTIONS } from '~/utils/diffOptions'

type WorkbenchCodebaseProps = {
  file: FileContents
  list: MockWorkbenchFileTreeNode[]
  terminal: FileContents
  isVisible: boolean
}

export default function WorkbenchCodebase(props: WorkbenchCodebaseProps) {
  return (
    <WorkbenchContainer className={props.isVisible ? '' : 'hidden'}>
      <WorkbenchContents>
        <div className="flex min-h-0 flex-col @md:flex-1 @md:flex-row">
          <WorkbenchLeftSidebar
            list={props.list}
            listLabel="Files"
            listIcon={FolderTree}
          />

          <WorkbenchRightContent>
            <File file={props.file} options={DIFF_FILE_OPTIONS} />
          </WorkbenchRightContent>
        </div>

        <WorkbenchTerminal file={props.terminal} />
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}
