import { useEffect, useRef } from 'react'
import { File, type FileContents } from '@pierre/diffs/react'
import type { TreeNode } from '~/types/workbench'
import WorkbenchLeftSidebar from './WorkbenchLeftSidebar'
import WorkbenchContainer from './WorkbenchContainer'
import WorkbenchContents from './WorkbenchContents'
import WorkbenchTerminal from './WorkbenchTerminal'
import WorkbenchRightContent from './WorkbenchRightContent'
import { FolderTree } from 'lucide-react'
import { DIFF_FILE_OPTIONS } from '~/utils/diffOptions'
import { useCollapsible } from '~/hooks/useCollapsible'

type WorkbenchCodebaseProps = {
  file: FileContents
  list: TreeNode[]
  terminal: FileContents
  /**
   * Controls CSS visibility rather than mount/unmount. All panes stay mounted
   * to preserve scroll position, form state, and editor content across tab
   * switches. Hidden panes use `display: none` via the Tailwind `hidden` class.
   */
  isVisible: boolean
}

export default function WorkbenchCodebase({
  file,
  list,
  terminal,
  isVisible,
}: WorkbenchCodebaseProps) {
  const sidebarExpandedRef = useRef(true)
  const contentExpandedRef = useRef(true)

  const { isExpanded: sidebarExpanded, toggle: toggleSidebar } = useCollapsible(
    true,
    () => !sidebarExpandedRef.current || contentExpandedRef.current,
  )
  const { isExpanded: contentExpanded, toggle: toggleContent } = useCollapsible(
    true,
    () => !contentExpandedRef.current || sidebarExpandedRef.current,
  )

  useEffect(() => {
    sidebarExpandedRef.current = sidebarExpanded
    contentExpandedRef.current = contentExpanded
  }, [sidebarExpanded, contentExpanded])

  return (
    <WorkbenchContainer className={isVisible ? '' : 'hidden'}>
      <WorkbenchContents>
        <div className="flex min-h-0 flex-col @md:flex-1 @md:flex-row">
          <WorkbenchLeftSidebar
            list={list}
            listLabel="Files"
            listIcon={FolderTree}
            panelExpanded={sidebarExpanded}
            onPanelToggle={toggleSidebar}
            collapseDisabled={sidebarExpanded && !contentExpanded}
          />

          <WorkbenchRightContent
            title={
              <>
                <span className="px-1 font-mono antialiased">
                  src / App.tsx
                </span>
              </>
            }
            panelExpanded={contentExpanded}
            onPanelToggle={toggleContent}
            collapseDisabled={contentExpanded && !sidebarExpanded}
          >
            <File file={file} options={DIFF_FILE_OPTIONS} />
          </WorkbenchRightContent>
        </div>

        <WorkbenchTerminal file={terminal} />
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}
