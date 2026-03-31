import type { ReactNode } from "react";

type WorkbenchRightContentProps = {
  children?: ReactNode;
}

export default function WorkbenchRightContent(props: WorkbenchRightContentProps) {
  return (
    <div className="col-span-12 @md:col-span-7 @lg:col-span-8 @2xl:col-span-9 overflow-scroll rounded-tr-xl">
      {props.children}
    </div>
  )
}