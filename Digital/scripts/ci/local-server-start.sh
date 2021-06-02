#!/bin/bash -eu

# sources nvm
source scripts/ci/nvm.sh

echo "Starting mockserver"
yarn mockserver:start:bg

echo "Starting web server"
yarn server:aot:start:bg

# shutdown should be done by calling local-server-stop.sh