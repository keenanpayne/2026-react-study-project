#!/bin/sh

# Script to install git hooks from scripts/hooks/ to .git/hooks/
# This script always exits 0 so it never fails npm install.

HOOKS_DIR="scripts/hooks"
GIT_HOOKS_DIR=".git/hooks"

if [ -n "$CI" ] || [ -n "$NETLIFY" ]; then
  exit 0
fi

if [ ! -d "$GIT_HOOKS_DIR" ]; then
  exit 0
fi

if [ ! -d "$HOOKS_DIR" ]; then
  echo "Note: $HOOKS_DIR directory not found, skipping hook installation"
  exit 0
fi

echo "Installing git hooks..."

# Copy each hook from scripts/hooks/ to .git/hooks/
for hook in "$HOOKS_DIR"/*; do
  if [ -f "$hook" ]; then
    hook_name=$(basename "$hook")
    cp "$hook" "$GIT_HOOKS_DIR/$hook_name"
    chmod +x "$GIT_HOOKS_DIR/$hook_name"
    echo "  ✓ Installed $hook_name"
  fi
done

echo "Git hooks installed successfully!"
exit 0

