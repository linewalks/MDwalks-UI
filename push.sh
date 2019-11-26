#!/bin/sh

setup_git() {
  git config --global user.email "toyjhlee@gmail.com"
  git config --global user.name "toyjhlee"
}

commit_website_files() {
  git checkout -b gh-pages
  touch "$TRAVIS_BUILD_NUMBER"
  git add .
  git status
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git push origin master:master --force --quiet
  # git remote add origin-pages https://${GH_TOKEN}@github.com/linewalks/MDwalks-UI.git > /dev/null 2>&1
  # git push --quiet --set-upstream origin-pages gh-pages

  # git push --force --quiet "https://${GH_TOKEN}@github.com/linewalks/MDwalks-UI.git" master:master
  # git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}" master:master > /dev/null 2>&1
}

setup_git
commit_website_files
upload_files