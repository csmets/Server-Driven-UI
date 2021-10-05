const express = require('express');
const fs = require('fs')
const glob = require('glob');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { fetchFeed } = require('./feed');

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
    __resolveType(obj) {
      if (obj.src) {
        return 'FeedImage';
      }
      if (obj.text) {
        return 'FeedCaption';
      }
      if (obj.columns) {
        return 'ColumnLayout';
      }

      return null;
    }
  },
  FeedViewElement: {
    __resolveType(obj) {
      if (obj.paragraph) {
        return 'TypographyContent';
      }
      if (obj.items) {
        return 'FeedItem';
      }

      return null;
    }
  },
  Column: {
    __resolveType(obj) {
      if (obj.count) {
        return 'FeedFavouriteCount';
      }
      if (obj.icon) {
        return 'FeedFavourite'
      }
    }
  },
  Query: {
    feed: () => {
      return {
        elements: [
          {
            paragraph: [{
              text: "This is a description"
            }]
          },
          ...fetchFeed()
        ]
      }
    }
  },
  Mutation: {
    save: (_, { feedId }) => {
      return {
        signals: [
          {
            signalId: `signal-${feedId}`,
            key: 'SAVED'
          }
        ]
      }
    },
    unsave: (_, { feedId }) => {
      return {
        signals: [
          {
            signalId: `signal-${feedId}`,
            key: 'UNSAVED'
          }
        ]
      }
    }
  }
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

  app.use(cors(corsOptions))
  const server = new ApolloServer({
    cors: {
      origin: '*',
      credentials: true
    },
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema, resolvers)