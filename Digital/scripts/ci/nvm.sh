#!/bin/bash

# the following nvm.sh script initialises nvm for the current shell/terminal session (may be in a diffferent file location on a mac)
export NVM_DIR=$HOME/.nvm
source $HOME/.nvm/nvm.sh

echo "install project node version if does not exist (and switch to it)"
nvm install
