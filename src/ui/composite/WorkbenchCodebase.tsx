import { File, type FileContents } from '@pierre/diffs/react';
import type { MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";
import WorkbenchLeftSidebar from "./WorkbenchLeftSidebar";
import WorkbenchContainer from "../base/WorkbenchContainer";
import WorkbenchContents from "../base/WorkbenchContents";
import WorkbenchTerminal from "./WorkbenchTerminal";
import WorkbenchRightContent from "../base/WorkbenchRightContent";

type WorkbenchCodebaseProps = {
  file: FileContents;
  fileList: MockWorkbenchFileTreeNode[];
  terminal: FileContents;
  isVisible: boolean;
}

export default function WorkbenchCodebase(props: WorkbenchCodebaseProps) {
  if (!props.isVisible) return null;

  return (
    <WorkbenchContainer>
      <WorkbenchContents>
        <WorkbenchLeftSidebar fileList={props.fileList} />

        <WorkbenchRightContent>
          <File
            file={props.file}
            options={{
              theme: { dark: 'pierre-dark', light: 'pierre-light' },
            }}
          />
        </WorkbenchRightContent>

        <WorkbenchTerminal file={props.terminal} />
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}