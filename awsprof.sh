#!/usr/bin/env bash

DIR="$(command cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

__awsprof_cwd_is_set() {
  echo "$(node ${DIR}/src/cli.js --checkCurrent)"
}

__awsprof_use() {
  local output="$(node ${DIR}/src/cli.js "$@")"
  local lastLine=$(echo "$output" | tail -1)

  if [[ $lastLine == "AWS_PROFILE="* ]]; then
    export $lastLine
  fi
}

__awsprof_prompt() {
  node ${DIR}/src/cli.js "$@"
}

awsprof() {
  if [[ $1 == "use" ]]; then
    local current="$(__awsprof_cwd_is_set)"
    if [[ $current == "-1" ]]; then
      __awsprof_prompt "$@"
    else
      echo "AWS_PROFILE=$AWS_PROFILE"
    fi

    __awsprof_use "$@"
  else
    node ${DIR}/src/cli.js "$@"
    if [[ $1 == "reset" ]]; then
      unset AWS_PROFILE
    fi
  fi
}

awsprof use --skipPrompt
