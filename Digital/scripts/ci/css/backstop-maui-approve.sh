#!/bin/bash -eu

# unzip to aot folder
#rm -rf aot/*
#unzip backstop/development/reference/*.zip aot/

source scripts/ci/yarn-install.sh

source scripts/ci/local-server-start.sh

## TODO: this is slow, in the future just fetch the artifacts from test and approve
echo "Running in CI mode"
export TASK="yarn css:local:pages:test"
xvfb-run --auto-servernum --server-args='-screen 0, 1024x768x16' ${TASK}
export TASK="yarn css:local:pages:approve"
xvfb-run --auto-servernum --server-args='-screen 0, 1024x768x16' ${TASK}

#source scripts/ci/local-server-stop.sh
# zip backstop/development/reference/`git rev-parse HEAD`.zip -r aot/



