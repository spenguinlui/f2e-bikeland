#!/usr/bin/env sh

set -e

yarn run build

cd dist
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/spenguinlui/f2e-bikeland.git master:gh-pages

cd -