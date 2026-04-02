import type { FileOptions } from '@pierre/diffs/react'

export const DIFF_FILE_OPTIONS: FileOptions<undefined> = {
  theme: { dark: 'pierre-dark', light: 'pierre-light' },
  disableFileHeader: true,
}

export const DIFF_TERMINAL_OPTIONS: FileOptions<undefined> = {
  theme: { dark: 'pierre-dark', light: 'pierre-light' },
  disableLineNumbers: true,
  disableFileHeader: true,
}
