import type { TreeNode } from '~/types/workbench'

export function joinTreePath(parentPath: string, name: string): string {
  return parentPath ? `${parentPath}/${name}` : name
}

export function computeInitialExpanded(
  nodes: TreeNode[],
  parentPath: string,
): Set<string> {
  const expanded = new Set<string>()

  for (const node of nodes) {
    const path = joinTreePath(parentPath, node.name)

    if (node.children?.length) {
      const childExpanded = computeInitialExpanded(node.children, path)

      const hasSelectedChild = node.children.some((c) => c.selected)
      const shouldExpand =
        node.open || hasSelectedChild || childExpanded.size > 0

      if (shouldExpand) {
        expanded.add(path)
        childExpanded.forEach((p) => expanded.add(p))
      }
    }
  }

  return expanded
}

export function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
  const lowerQuery = query.toLowerCase()

  return nodes.reduce<TreeNode[]>((acc, node) => {
    const nameMatches = node.name.toLowerCase().includes(lowerQuery)

    if (node.children?.length) {
      if (nameMatches) {
        acc.push(node)
      } else {
        const filteredChildren = filterTree(node.children, query)

        if (filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren })
        }
      }
    } else if (nameMatches) {
      acc.push(node)
    }

    return acc
  }, [])
}

export function collectAllPaths(
  nodes: TreeNode[],
  parentPath: string,
): Set<string> {
  const paths = new Set<string>()

  for (const node of nodes) {
    const path = joinTreePath(parentPath, node.name)

    if (node.children?.length) {
      paths.add(path)
      collectAllPaths(node.children, path).forEach((p) => paths.add(p))
    }
  }

  return paths
}
