const express = require('express');
const fs = require('fs')
const glob = require('glob');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { fetchFeed, feedCount } = require('./feed');
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
    save: (_, { feedId, signals }) => {
      const emitSignals = signals.map((signal) => {
        switch (signal.type) {
          case signalEnum.FAVOURITE:
            return {
              signal: {
                type: signalEnum.FAVOURITE,
                reference: signal.reference
              },
              value: {
                text: "https://cdn-icons-png.flaticon.com/512/1076/1076984.png"
              }
            };
          case signalEnum.FAVOURITE_COUNT:
            return {
              signal: {
                type: signalEnum.FAVOURITE_COUNT,
                reference: signal.reference
              },
              value: {
                text: feedCount(feedId) + 1
              }
            };
          default:
            return null;
        }
      })
      return {
        emitSignals
      }
    },
    unsave: (_, { feedId, signals }) => {
      const emitSignals = signals.map((signal) => {
        switch (signal.type) {
          case signalEnum.FAVOURITE:
            return {
              signal: {
                type: signalEnum.FAVOURITE,
                reference: signal.reference
              },
              value: {
                text: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              }
            };
          case signalEnum.FAVOURITE_COUNT:
            return {
              signal: {
                type: signalEnum.FAVOURITE_COUNT,
                reference: signal.reference
              },
              value: {
                text: feedCount(feedId) - 1
              }
            };
          default:
            return null;
        }
      })
      return {
        emitSignals
      }
    },
    updateHeading: (_, { heading }) => {
      return {
        signals: [{
          signal: {
            type: signalEnum.TITLE,
            reference: null
          },
          value: {
            text: heading
          }
        }]
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