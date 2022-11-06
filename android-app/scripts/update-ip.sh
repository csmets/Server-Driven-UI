#!/bin/bash

if [ -n "$0" ]
then
  LOCAL_IP=$1
fi

cp scripts/ip-template-file.kt app/src/main/java/com/example/androidapp/config/ip.kt

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # linux
  if [ -z "$0" ]
  then
    LOCAL_IP=$(ifconfig getifaddr en0)
  fi
  sed -i 's/ipaddress/'$LOCAL_IP'/g' app/src/main/java/com/example/androidapp/config/ip.kt
elif [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  if [ -z "$0" ]
  then
    LOCAL_IP=$(ipconfig getifaddr en0)
  fi
  sed -i '' 's/ipaddress/'$LOCAL_IP'/g' app/src/main/java/com/example/androidapp/config/ip.kt
fi
