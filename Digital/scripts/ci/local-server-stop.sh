#!/bin/bash -u
# no -e to ensure all steps run regardless of result

# sources nvm and runs yarn to install dependencies
source scripts/ci/nvm.sh

echo "Stopping mockserver"
yarn mockserver:stop:bg

echo "Stopping web server"
yarn server:aot:stop:bg