#!/bin/bash

echo "Note you must be using github's 'merge' not 'squash and merge' from you team branch to development for this to work. commit messages must begin with 'dsp xxxxx' or 'dsp-xxxxx'"

BRANCH=$1
BASE_BRANCH=${2:-development} # default to the development branch

if [ -z $BRANCH ]
then
    echo "You must provide at least 1 branch to compare: usage >source ./scripts/dsp-branch-compare.sh development master"
else
    echo "compare dsp commits present in $BRANCH but not in $BASE_BRANCH"

    git log --abbrev-commit --date=relative $BASE_BRANCH..$BRANCH |
                sed 'y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/' | # to lowercase
                grep -oi 'dsp[ -]\?[[:digit:]]\{5\}' | # filter 'dsp ' or 'dsp-'
                sed 's/dsp /dsp-/' | # add missing '-''
                sed 's/^/https:\/\/aglenergy.atlassian.net\/browse\//' | #add Jira url
                sort -u # sort unique values
fi
