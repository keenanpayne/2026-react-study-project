import { type FormEvent } from 'react'
import { X } from 'lucide-react'
import { type MockWorkbenchFileTreeNode } from '~/data/MockWorkbenchCodebase'
import Button from './Button'

type DatabaseRowEditFormProps = {
  selectedRow: MockWorkbenchFileTreeNode
  editedValues: Record<string, string>
  onValueChange: (columnName: string, value: string) => void
  onClose: () => void
  onSave: () => void
}

export default function DatabaseRowEditForm(props: DatabaseRowEditFormProps) {
  if (!props.selectedRow.children) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    props.onSave()
  }

  return (
    <form className="panel-card rounded-lg" onSubmit={handleSubmit}>
      <div className="section-header flex items-center justify-between rounded-t-lg px-4 py-3">
        <h2 className="text-text-secondary text-sm font-medium">
          Edit Row: {props.selectedRow.name}
        </h2>

        <Button
          onClick={props.onClose}
          variant="ghost"
          size="sm"
          radius="md"
          iconOnly
          type="button"
          aria-label="Close"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {props.selectedRow.children.map((col) => {
          const isNumeric = typeof col.value === 'number'

          return (
            <div key={col.name} className="flex flex-col gap-1">
              <label
                className="text-text-muted text-xs font-medium"
                htmlFor={col.name}
              >
                {col.name}
              </label>

              <input
                type={isNumeric ? 'number' : 'text'}
                value={props.editedValues[col.name] ?? ''}
                onChange={(e) => props.onValueChange(col.name, e.target.value)}
                name={col.name}
                id={col.name}
                className="input-base"
              />
            </div>
          )
        })}

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={props.onClose}
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
