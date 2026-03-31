import { useState } from "react";
import { Database } from "lucide-react";
import WorkbenchContainer from "../base/WorkbenchContainer";
import WorkbenchContents from "../base/WorkbenchContents";
import WorkbenchRightContent from "../base/WorkbenchRightContent";
import WorkbenchLeftSidebar from "./WorkbenchLeftSidebar";
import DatabaseRowEditForm from "./DatabaseRowEditForm";
import { type MockWorkbenchFileTreeNode } from "../../data/MockWorkbenchCodebase";

function buildEditedValues(row: MockWorkbenchFileTreeNode | null): Record<string, string> {
  if (!row?.children) return {};

  const values: Record<string, string> = {};
  for (const col of row.children) {
    values[col.name] = col.value !== null && col.value !== undefined ? String(col.value) : "";
  }
  return values;
}

type WorkbenchDatabaseProps = {
  list: MockWorkbenchFileTreeNode[];
  isVisible: boolean;
}

export default function WorkbenchDatabase(props: WorkbenchDatabaseProps) {
  const [selectedNode, setSelectedNode] = useState<MockWorkbenchFileTreeNode | null>(null);
  const [selectedRow, setSelectedRow] = useState<MockWorkbenchFileTreeNode | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  function findParentTable(row: MockWorkbenchFileTreeNode): MockWorkbenchFileTreeNode | undefined {
    return props.list.find((table) =>
      table.children?.some((r) => r === row)
    );
  }

  function handleSelectNode(node: MockWorkbenchFileTreeNode | null) {
    if (node?.type === "row") {
      const parentTable = findParentTable(node);
      if (parentTable) {
        setSelectedNode(parentTable);
        handleSelectRow(node);
        return;
      }
    }

    setSelectedNode(node);
    setSelectedRow(null);
    setEditedValues({});
  }

  function handleSelectRow(row: MockWorkbenchFileTreeNode | null) {
    setSelectedRow(row);
    setEditedValues(buildEditedValues(row));
  }

  if (!props.isVisible) return null;

  return (
    <WorkbenchContainer>
      <WorkbenchContents>
        <WorkbenchLeftSidebar
          list={props.list}
          listLabel="Tables"
          listIcon={Database}
          selectedNode={selectedNode}
          selectedRow={selectedRow}
          onSelect={handleSelectNode}
        />

        <WorkbenchRightContent>
          <div className="flex flex-col gap-3">
            <header className="flex items-center justify-between gap-1 border-b border-gray-200 dark:border-zinc-700 px-5 py-2">
              <h1>
                {selectedNode ? <>Table: <span className="font-bold">{selectedNode.name}</span></> : "Tables"}
              </h1>

              <p className="text-sm">
                {selectedNode
                  ? `${selectedNode.children?.length ?? 0} ${selectedNode.type === "table" ? "rows" : "columns"}`
                  : "View and manage database tables and records. Ask Bolt to create or modify tables."}
              </p>
            </header>

            <div className="px-4 py-2">
              {selectedNode?.children && selectedNode.children.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-700">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
                        {selectedNode.children[0].children?.map((col) => (
                          <th
                            key={col.name}
                            className="px-4 py-2 text-left font-medium text-gray-600 dark:text-zinc-300 whitespace-nowrap"
                          >
                            {col.name}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {selectedNode.children.map((row) => {
                        const isSelected = selectedRow === row;
                        return (
                          <tr
                            key={row.name}
                            onClick={() => handleSelectRow(isSelected ? null : row)}
                            className={`border-b last:border-b-0 border-gray-200 dark:border-zinc-700 cursor-pointer ${
                              isSelected
                                ? "bg-blue-50 dark:bg-blue-900/20"
                                : "hover:bg-gray-50 dark:hover:bg-zinc-800/30"
                            }`}
                          >
                            {row.children?.map((col) => (
                              <td
                                key={col.name}
                                className="px-4 py-2 text-gray-700 dark:text-zinc-300 whitespace-nowrap"
                              >
                                {col.value !== null && col.value !== undefined
                                  ? String(col.value)
                                  : <span className="text-gray-400 dark:text-zinc-500">NULL</span>}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : selectedNode ? (
                <p className="text-sm text-gray-500 dark:text-zinc-400">No rows in this table.</p>
              ) : null}
            </div>

            {selectedRow?.children && (
              <div className="px-4 pb-4">
                <DatabaseRowEditForm
                  selectedRow={selectedRow}
                  editedValues={editedValues}
                  onValueChange={(name, value) =>
                    setEditedValues((prev) => ({ ...prev, [name]: value }))
                  }
                  onClose={() => handleSelectRow(null)}
                  onSave={() => handleSelectRow(null)}
                />
              </div>
            )}
          </div>
        </WorkbenchRightContent>
      </WorkbenchContents>
    </WorkbenchContainer>
  )
}