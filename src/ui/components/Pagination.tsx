import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  depth?: number
  label?: string
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  depth = 0,
  label,
}: PaginationProps) {
  return (
    <nav
      aria-label={label ? `Pagination for ${label}` : 'Pagination'}
      className="flex items-center gap-1 py-1"
      style={{ paddingLeft: `${0.375 + depth * 0.625}rem` }}
    >
      <Button
        size="sm"
        radius="md"
        iconOnly
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} strokeWidth={1.5} aria-hidden="true" />
      </Button>

      <span
        role="status"
        aria-live="polite"
        className="text-text-muted px-1 text-xs select-none"
      >
        {page + 1} / {totalPages}
      </span>

      <Button
        size="sm"
        radius="md"
        iconOnly
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </Button>
    </nav>
  )
}
