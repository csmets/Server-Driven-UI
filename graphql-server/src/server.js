const express = require('express');
const fs = require('fs')
const glob = require('glob');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { fetchFeed, feedCount, feedFavouriteCount, feedFavourite } = require('./feed');
const { signalEnum } = require('./signal');

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
        return 'FeedFavourite';
      }
    }
  },
  SignalValue: {
    __resolveType(obj) {
      if (obj.text) {
        return 'SignalStringValue';
      }

      return null;
    }
  },
  Query: {
    feed: () => {
      return {
        heading: {
          id: `heading`,
          text: 'Example list of feed items',
          signal: {
            type: signalEnum.TITLE,
            reference: null
          }
        },
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
    save: async (_, { feedId, cacheId }) => {
      await sleep(2000)
      return {
        feedFavouriteCount: feedFavouriteCount(feedCount(feedId), feedId, true),
        feedFavourite: feedFavourite(feedCount(feedId), feedId, true)
      }
    },
    unsave: async (_, { feedId, cacheId }) => {
      await sleep(2000)
      return {
        feedFavouriteCount: feedFavouriteCount(feedCount(feedId), feedId, false),
        feedFavourite: feedFavourite(feedCount(feedId), feedId, false)
      }
    },
    updateHeading: async (_, { heading, cacheId }) => {
      await sleep(2000)
      return {
        heading: {
          id: cacheId,
          text: heading,
          signal: {
            type: signalEnum.TITLE,
            reference: null
          }
        }
      }
    }
  }
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


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