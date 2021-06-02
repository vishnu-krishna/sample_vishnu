#!/bin/bash -eu

export TASK="yarn smoke $1"

echo "start smoke.sh"

source scripts/ci/nvm.sh

source scripts/ci/yarn-install.sh

source scripts/ci/update-webdriver.sh

echo "Running in CI mode"
xvfb-run --auto-servernum --server-args='-screen 0, 1024x768x16' ${TASK}
