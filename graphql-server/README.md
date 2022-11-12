# GraphQL Server

This module is to house all the graphQL queries for the template server to use. Clients can make direct calls to the GraphQL server for mutations. It's primarily the data provider for the template server.

## Getting started

To install, run:

```
npm ci
```

To run the server:

```
npm start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Development

When updating the schema it is important to update your typescript types. To do this, run:

```
npm run generate
```