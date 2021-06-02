#!/bin/bash -eu
# -e fail fast if any command fails
# -u uset variables fail

source scripts/ci/nvm.sh

echo "writing metadata.json"

touch dist/aot/metadata.json

# assumes node is available
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")

# use for local testing only
# bamboo_buildTimeStamp='2010-01-01T01:00:00.000+01:00'
# bamboo_buildResultKey='BAM-BOO-JOB1-8'
# bamboo_planRepository_branch='development'
# bamboo_resultsUrl='https://www.google.com'
# bamboo_buildNumber='8'


## TODO: add this line if approved security-wise
## buildUrl: '$bamboo_resultsUrl'

cat <<EOF > ./dist/aot/metadata.json
{
    version: '$PACKAGE_VERSION',
    timestamp: '$bamboo_buildTimeStamp',
    branch: '$bamboo_planRepository_branch',
    resultKey: '$bamboo_buildResultKey',
    buildNumber: $bamboo_buildNumber
}
EOF

