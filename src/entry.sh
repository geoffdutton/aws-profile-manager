#!/usr/bin/env bash

aws_profile_echo() {
  output="$(aws-profile)"
  echo $output
}
