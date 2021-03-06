#!/bin/sh

set -e
set -x

export INPUT_DESTINATION_HEAD_BRANCH=$INPUT_HEAD_BRANCH

if [ -z "$INPUT_SOURCE_FOLDER" ]
then
  echo "Source folder must be defined"
  return -1
fi

if [ $INPUT_DESTINATION_HEAD_BRANCH == "main" ] || [ $INPUT_DESTINATION_HEAD_BRANCH == "master"]
then
  echo "Destination head branch cannot be 'main' nor 'master'"
  return -1
fi

if [ -z "$INPUT_PULL_REQUEST_REVIEWERS" ]
then
  PULL_REQUEST_REVIEWERS=$INPUT_PULL_REQUEST_REVIEWERS
else
  PULL_REQUEST_REVIEWERS='-r '$INPUT_PULL_REQUEST_REVIEWERS
fi

NODE_DIR=$(pwd)
CLONE_DIR=$(mktemp -d)

PR_URL="https://github.com/moovfinancial/moov-node/pull/$INPUT_PULL_REQUEST_NUMBER"

echo "Setting git variables"
export GITHUB_TOKEN=$API_TOKEN_GITHUB
git config --global user.email "$INPUT_USER_EMAIL"
git config --global user.name "$INPUT_USER_NAME"

echo "Cloning destination git repository"
git clone "https://$INPUT_USER_NAME:$API_TOKEN_GITHUB@github.com/$INPUT_DESTINATION_REPO.git" "$CLONE_DIR"
cd "$CLONE_DIR"

echo "Creating Branch if not exist"
git checkout $INPUT_DESTINATION_HEAD_BRANCH || git checkout -b $INPUT_DESTINATION_HEAD_BRANCH
git pull origin $INPUT_DESTINATION_HEAD_BRANCH || echo "New branch, no pull needed"


echo "Copying contents to git repo"
mkdir -p $CLONE_DIR/$INPUT_DESTINATION_FOLDER
cp -r ${NODE_DIR}/${INPUT_SOURCE_FOLDER} "${CLONE_DIR}/${INPUT_DESTINATION_FOLDER}"


echo "Adding git commit"
git add content/node/
if git status | grep -oq "content/node/"
then
  git commit --message "Update from https://github.com/$GITHUB_REPOSITORY/commit/$GITHUB_SHA"
  echo "Pushing git commit"
  git push origin $INPUT_DESTINATION_HEAD_BRANCH
  echo "Creating a pull request"
  if [ $(gh pr list -H $INPUT_DESTINATION_HEAD_BRANCH | wc -l) -eq 0 ]
  then
    gh pr create -t "Auto PR from moov-node changes" \
                -b "Syncing changes from [moov-node PR]($PR_URL)" \
                -B "main" \
                -H $INPUT_DESTINATION_HEAD_BRANCH 
  else
    echo "PR Already Created"
  fi
else
  echo "No changes detected"
fi