#!/bin/bash
# Format files with Prettier only when create or edit tools are used

# Read the JSON input from stdin
input=$(cat)

# Extract toolName from JSON using grep and sed
toolName=$(echo "$input" | grep -o '"toolName":"[^"]*"' | sed 's/"toolName":"\([^"]*\)"/\1/')

# Only run prettier if toolName is "create" or "edit"
if [ "$toolName" = "create" ] || [ "$toolName" = "edit" ]; then
  echo "Running prettier (toolName: $toolName)..."
  npx prettier --write .
else
  echo "Skipping prettier (toolName: $toolName)"
fi
