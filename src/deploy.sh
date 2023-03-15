#!/bin/bash

ng build --configuration=production --base-href --base-href "https://hugo-nascimento.github.io/api-sptrans/"
cp dist/sptrans/index.html dist/404.html
cd ..
cd dist
cd sptrans
git init
git add .
git commit -m "Deploy to GitHub Pages"
git push --force https://github.com/hugo-nascimento/api-sptrans.git master:gh-pages

