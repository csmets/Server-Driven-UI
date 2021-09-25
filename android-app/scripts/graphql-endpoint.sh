#!/bin/bash

LOCAL_IP=$(ipconfig getifaddr en0)

cp scripts/graphql-template-file.kt app/src/main/java/com/example/androidapp/config/GraphQLEndpoint.kt

sed -i '' 's/ipaddress/'$LOCAL_IP'/g' app/src/main/java/com/example/androidapp/config/GraphQLEndpoint.kt
