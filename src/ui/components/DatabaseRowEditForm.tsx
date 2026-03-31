import { X } from "lucide-react";
import { type MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";
import Button from "./Button";

type DatabaseRowEditFormProps = {
  selectedRow: MockWorkbenchFileTreeNode;
  editedValues: Record<string, string>;
  onValueChange: (columnName: string, value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function DatabaseRowEditForm(props: DatabaseRowEditFormProps) {
  if (!props.selectedRow.children) return null;

  return (
    <div className="rounded-lg border border-gray-200 dark:border-zinc-700">
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
        <h2 className="text-sm font-medium text-gray-700 dark:text-zinc-300">
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

      <div className="p-4 flex flex-col gap-3">
        {props.selectedRow.children.map((col) => {
          const isNumeric = typeof col.value === "number";

          return (
            <div key={col.name} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                {col.name}
              </label>

              <input
                type={isNumeric ? "number" : "text"}
                value={props.editedValues[col.name] ?? ""}
                onChange={(e) => props.onValueChange(col.name, e.target.value)}
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          );
        })}

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={props.onClose}
            variant="subtle"
            radius="md"
            size="md"
          >
            Cancel
          </Button>

          <Button
            onClick={props.onSave}
            variant="primary"
            radius="md"
            size="md"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
