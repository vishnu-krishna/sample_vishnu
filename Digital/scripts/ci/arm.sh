#!/bin/bash -eu
# -e fail fast if any command fails
# -u unset variables fail
# This script should be run after the my account artifact is created
# to copy the arm templates into the artifact for create my account webapp

echo "copy ARM files"

export ARM_TEMPLATE_DIR="scripts/armTemplate";
export ARTIFACT_DIR="dist/aot";

if [ -d $ARM_TEMPLATE_DIR ]; then
    mkdir -p $ARTIFACT_DIR/${ARM_TEMPLATE_DIR}

    cp -v $ARM_TEMPLATE_DIR/* $ARTIFACT_DIR/$ARM_TEMPLATE_DIR
    echo "copied ARM template files"
else
    echo "NOT copying ARM template files"
fi
