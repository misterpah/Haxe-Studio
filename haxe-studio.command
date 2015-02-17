#!/bin/bash
path="$(cd "$(dirname "$BASH_SOURCE")" && pwd)"
cd "$path"
open "./runtime/osx/node-webkit.app" --args "$path/core"
