import type { ReactNode } from 'react'

type WorkbenchRightContentProps = {
  children?: ReactNode
}

export default function WorkbenchRightContent(
  props: WorkbenchRightContentProps,
) {
  return (
    <div className="col-span-12 overflow-scroll rounded-tr-xl @md:col-span-7 @lg:col-span-8 @2xl:col-span-9">
      {props.children}
    </div>
  )
}
