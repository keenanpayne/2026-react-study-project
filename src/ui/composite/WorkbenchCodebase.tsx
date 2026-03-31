import { File, type FileContents } from '@pierre/diffs/react';
import type { MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";
import WorkbenchLeftSidebar from "./WorkbenchLeftSidebar";
import WorkbenchContainer from "../base/WorkbenchContainer";
import WorkbenchContents from "../base/WorkbenchContents";
import WorkbenchTerminal from "./WorkbenchTerminal";
import WorkbenchRightContent from "../base/WorkbenchRightContent";
import { FolderTree } from 'lucide-react';
import { DIFF_FILE_OPTIONS } from '../../utils/diffOptions';

type WorkbenchCodebaseProps = {
  file: FileContents;
  list: MockWorkbenchFileTreeNode[];
  terminal: FileContents;
  isVisible: boolean;
}

export default function WorkbenchCodebase(props: WorkbenchCodebaseProps) {
  if (!props.isVisible) return null;

  return (
    <WorkbenchContainer>
      <WorkbenchContents>
        <WorkbenchLeftSidebar list={props.list} listLabel="Files" listIcon={FolderTree} />

        <WorkbenchRightContent>
          <File
            file={props.file}
            options={DIFF_FILE_OPTIONS}
          />
        </WorkbenchRightContent>

        <WorkbenchTerminal file={props.terminal} />
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}