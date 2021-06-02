#!/bin/bash

echo "install yarn (if required) then run to update package dependencies"
yarn || (npm install -g yarn && yarn)
