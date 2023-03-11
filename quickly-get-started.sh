#!/bin/bash

# run docker to setup server side apps
echo 'Firing up server containers'
docker-compose up -d

if [ -f ~/.nvm/nvm.sh ]; then
  echo 'sourcing nvm from ~/.nvm'
  . ~/.nvm/nvm.sh
elif command -v brew; then
  # https://docs.brew.sh/Manpage#--prefix-formula
  BREW_PREFIX=$(brew --prefix nvm)
  if [ -f "$BREW_PREFIX/nvm.sh" ]; then
    echo "sourcing nvm from brew ($BREW_PREFIX)"
    . $BREW_PREFIX/nvm.sh
  fi
fi


# setup tokens
echo 'Building tokens'
cd ./tokens
nvm use
npm ci
npm link
cd ../

# setup web app
echo 'Installing web app'
cd ./web-app
nvm use
npm ci
npm link @csmets/tokens
npm run dev