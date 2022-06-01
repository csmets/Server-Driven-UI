# Template Server

This server side application is used for clients to retrieve the page response. It is designed to remove a lot of the weight clients would have to make in favour of retrieve a single response. The template server may make multiple graphql requests asynchronously and stitch these responses into a single one.

To install:

```
npm ci
```

To run:

```
npm start
```

It will require graphql-server to be running for it to work.