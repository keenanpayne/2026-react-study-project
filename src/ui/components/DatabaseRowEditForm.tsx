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

  return (
    <div className="panel-card rounded-lg">
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
          >
            Cancel
          </Button>

          <Button
            onClick={props.onSave}
            variant="success"
            radius="md"
            size="lg"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
