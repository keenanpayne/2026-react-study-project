import { useId, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { TreeNode } from '~/types/workbench'
import Button from './Button'

type DatabaseRowEditFormProps = {
  selectedRow: TreeNode
  editedValues: Record<string, string>
  onValueChange: (columnName: string, value: string) => void
  onClose: () => void
  onSave: () => void
}

export default function DatabaseRowEditForm({
  selectedRow,
  editedValues,
  onValueChange,
  onClose,
  onSave,
}: DatabaseRowEditFormProps) {
  const formId = useId()

  if (!selectedRow.children) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave()
  }

  return (
    <form className="panel-card rounded-lg" onSubmit={handleSubmit}>
      <div className="section-header flex items-center justify-between rounded-t-lg px-4 py-3">
        <h2 className="text-text-secondary text-sm font-medium">
          Edit Row: {selectedRow.name}
        </h2>

        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          radius="md"
          iconOnly
          type="button"
          aria-label="Close"
        >
          <X size={16} aria-hidden="true" />
        </Button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {selectedRow.children.map((col) => {
          const isNumeric = typeof col.value === 'number'
          const fieldId = `${formId}-${col.name}`

          return (
            <div key={col.name} className="flex flex-col gap-1">
              <label
                className="text-text-muted text-xs font-medium"
                htmlFor={fieldId}
              >
                {col.name}
              </label>

              <input
                type={isNumeric ? 'number' : 'text'}
                value={editedValues[col.name] ?? ''}
                onChange={(e) => onValueChange(col.name, e.target.value)}
                name={col.name}
                id={fieldId}
                className="input-base"
              />
            </div>
          )
        })}

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={onClose}
            variant="danger"
            radius="md"
            size="lg"
            type="button"
          >
            Cancel
          </Button>

          <Button variant="success" radius="md" size="lg" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}
