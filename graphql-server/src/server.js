const express = require('express');
const fs = require('fs')
const glob = require('glob');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { fetchFeed } = require('./feed')

const graphqlFiles = glob.sync('./graphql/**/*.graphql');
let schema = "";

graphqlFiles.forEach(element => {
  try {
    const file = fs.readFileSync(element, 'utf8');
    schema += file;
  } catch (error) {
    console.error(error);
  }
});

// The root provides a resolver function for each API endpoint
var resolvers = {
  FeedElement: {
    __resolveType(obj, args, context) {
      console.log(obj, args, context);
      if (obj.type == 'image') {
        return 'FeedImage';
      }
      if (obj.type == 'typography') {
        return 'FeedCaption';
      }
      if (obj.type == 'icon') {
        return 'FeedFavourite';
      }

      return null
    }
  },
  Query: {
    feed: () => fetchFeed()
  }
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema, resolvers)