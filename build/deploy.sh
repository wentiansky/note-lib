#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist

git init
git config user.name 'wentiansky'
git config user.email '2087152746@qq.com'
git add -A
git commit -m 'deploy'

git push -f git@github.com:wentiansky/note-lib.git master:gh-pages
# git push -f https://github.com/wentiansky/note-lib.git

cd -