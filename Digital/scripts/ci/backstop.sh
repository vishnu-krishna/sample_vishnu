#!/bin/bash -eu

export TASK="yarn css:local:test"

source scripts/ci/yarn-install.sh

source scripts/ci/local-server-start.sh

# unzip to aot folder
#rm -rf aot/*
#unzip backstop/development/reference/*.zip aot/

echo "Running in CI mode"
xvfb-run --auto-servernum --server-args='-screen 0, 1024x768x16' ${TASK}
export TASK='yarn css:local:approve'
xvfb-run --auto-servernum --server-args='-screen 0, 1024x768x16' ${TASK}

scripts/ci/local-server-stop.sh
# zip backstop/development/reference/`git rev-parse HEAD`.zip -r aot/



