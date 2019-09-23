#!/usr/bin/env bash

output="$(node ./src/cli.js "$@")"
lastLine=$(echo "$output" | tail -1)

if [[ $lastLine == *"export AWS_PROFILE"* ]]; then
  . $lastLine
fi
echo "$output"
