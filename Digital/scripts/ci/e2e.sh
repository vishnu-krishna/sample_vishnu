#!/bin/bash -eu

export TASK="yarn e2e local"

echo "start e2e.sh"

source scripts/ci/nvm.sh

source scripts/ci/yarn-install.sh

source scripts/ci/update-webdriver.sh

source scripts/ci/local-server-start.sh

echo "Running in CI mode"
xvfb-run --auto-servernum --server-args='-screen 0, 1024x768x16' ${TASK}
