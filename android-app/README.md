# SDUI Android app

This is the android app that showcases SDUI.

The app will demonstrate the following:

- an SDUI feed that's being served via websockets.
- Hacker News feed done in SDUI that's served via websockets.
- REST API kitchen sick showcases SDUI components.

## Getting Started

It is recommended to build via [Android Studio](https://developer.android.com/studio).

Build it using the embedded JDK that's bundled with Android Studio.

Before running the app ensure you run the following script:

```
bash ./scripts/update-ip.sh
```

This is to setup the local IP address for the endpoints to the other services.

If you haven't done so, make sure the [GraphQL server](https://github.com/csmets/Server-Driven-UI/tree/master/graphql-server) and [Template server](https://github.com/csmets/Server-Driven-UI/tree/master/template-server) are running before loading the app.