#!/bin/bash

npm run generate-schema
mv schema.json ./android/sdui-generate-types/src/main/graphql/schema.json
cp -R graphql/ ./android/sdui-generate-types/src/main/graphql/com/example/sduigeneratetypes
cd android
./gradle build
./gradlew --no-daemon build publishToMavenLocal
cd ../
rm -rf android/sdui-generate-types/src/main/graphql/com/example/sduigeneratetypes/*
rm android/sdui-generate-types/src/main/graphql/schema.json