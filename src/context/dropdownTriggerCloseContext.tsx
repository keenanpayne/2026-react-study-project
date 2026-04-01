/**
 * Lets content rendered inside a dropdown (e.g. menu items) call the same
 * close handler as the trigger, without threading props through every child.
 */
import { createContext, useContext } from 'react'

type DropdownTriggerCloseContextValue = {
  close: () => void
}

export const DropdownTriggerCloseContext =
  createContext<DropdownTriggerCloseContextValue | null>(null)

/** Returns `{ close }` from the nearest provider, or `null` if outside the tree. */
export function useDropdownTriggerClose() {
  return useContext(DropdownTriggerCloseContext)
}
