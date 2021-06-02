#!/bin/bash -eu
# -e fail fast if any command fails
# -u uset variables fail

# My Account build script for CI
# this script is intended to be run this from the project root dir (with .nvmrc)

echo "start build.sh"

source scripts/ci/nvm.sh

source scripts/ci/yarn-install.sh

echo "run linters"
yarn lint:sass
yarn lint:ts

echo "run unit and mockserver tests"
yarn test:ci
yarn test:mockserver

echo "build application (AOT)"
yarn build:aot

# echo "build service worker manifest"
# yarn precache:aot

source scripts/ci/arm.sh

source scripts/ci/build-metadata.sh

echo "upload artifact to octopus"
cd config && node octopus.deploy.config.js -v "${bamboo_buildNumber}"

#### if you require branch specific logic, you can do it as follows:
# if ["${bamboo.planRepository.branchName}" == "obsidian/development"]
# then
#    echo "OBSIDIAN BUILD"
# else
#    echo "NON-OBSIDIAN BUILD"
# fi
####