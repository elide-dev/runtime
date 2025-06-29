#!/bin/bash

# This script will be run bazel when building process starts to
# generate key-value information that represents the status of the
# workspace. The output should be like
#
# KEY1 VALUE1
# KEY2 VALUE2
#
# If the script exits with non-zero code, it's considered as a failure
# and the output will be discarded.

set -eo pipefail # exit immediately if any command fails.

function remove_url_credentials() {
  which perl >/dev/null && perl -pe 's#//.*?:.*?@#//#' || cat
}

#commit_sha=$(git rev-parse HEAD)
#echo "COMMIT_SHA $commit_sha"

#git_branch=$(git rev-parse --abbrev-ref HEAD)
#echo "GIT_BRANCH $git_branch"

#git_tree_status=$(git diff-index --quiet HEAD -- && echo 'Clean' || echo 'Modified')
#echo "GIT_TREE_STATUS $git_tree_status"

app_version=$(cat .version)
echo "VERSION $app_version"

package_version="$(cat .release)"
echo "PACKAGE_VERSION $package_version"

package_version="$(cat .release)"
echo "STABLE_APP_PACKAGE_VERSION $package_version-$app_version"
