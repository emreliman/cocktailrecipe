#!/usr/bin/env sh
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push  https://github.com/findikkiran/cocktail-recipe-app.git master
cd -