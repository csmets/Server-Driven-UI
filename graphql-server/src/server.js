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
      if (obj.primary) {
        return 'FeedHeading';
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
  Action: {
    __resolveType(obj) {
      if (obj.cacheIds) {
        return 'EditNameSubmitAction'
      }
    }
  },
  FormElement: {
    __resolveType(obj) {
      if (obj.label) {
        return 'Button'
      }
      if (obj.formId) {
        return 'TextInput'
      }
    }
  },
  Query: {
    feed: () => {
      return {
        elements: [
          {
            id: `heading`,
            primary: 'Example list of feed items',
            signal: {
              type: signalEnum.TITLE,
              reference: null
            }
          },
          {
            paragraph: [{
              value: "This is a description"
            }]
          },
          ...fetchFeed()
        ]
      }
    },
    editName: () => {
      return {
        elements: [
          {
            formId: 'headingInput',
            placeholder: 'Updating heading title'
          },
          {
            label: 'Edit title',
            action: {
              inputIds: ['headingInput'],
              cacheIds: [
                {
                  key: 'heading',
                  value: 'heading'
                }
              ]
            }
          }
        ]
      }
    }
  },
  Mutation: {
    save: async (_, { feedId, cacheIds }) => {
      await sleep(2000)

      let feedFavouriteCountCacheId = null;
      let feedFavouriteCacheId = null;

      if (cacheIds && cacheIds.length) {
        cacheIds.forEach((id) => {
          if (id.key === 'feedFavourite') {
            feedFavouriteCacheId = id.value;
          }
          if (id.key === 'feedFavouriteCount') {
            feedFavouriteCountCacheId = id.value;
          }
        })
      }

      if (inMemoryFavouriteFeeds.savedItems) {
        const found = inMemoryFavouriteFeeds.savedItems?.filter(item => item.feedId === feedId)

        if (found && found.length > 0) {
          // unsaving

          const remove = inMemoryFavouriteFeeds.savedItems?.filter(item => item.feedId !== feedId);
          inMemoryFavouriteFeeds.savedItems = remove

          return {
            feedFavouriteCount: feedFavouriteCount(feedCount(feedId), feedId, feedFavouriteCountCacheId, false),
            feedFavourite: feedFavourite(feedCount(feedId), feedId, feedFavouriteCacheId, cacheIds, false)
          }
        } else {
          // saving

          const writeFeed = {
            feedId
          };
          inMemoryFavouriteFeeds.savedItems.push(writeFeed);

          return {
            feedFavouriteCount: feedFavouriteCount(feedCount(feedId), feedId, feedFavouriteCountCacheId, true),
            feedFavourite: feedFavourite(feedCount(feedId), feedId, feedFavouriteCacheId, cacheIds, true)
          }
        }
      }
      return {};
    },
    updateHeading: async (_, { heading, cacheIds }) => {
      await sleep(2000)

      let cacheId = null;

      if (cacheIds && cacheIds.length) {
        cacheIds.forEach((id) => {
          if (id.key === 'heading') {
            cacheId = id.value;
          }
        })
      }

      return {
        heading: {
          id: cacheId,
          primary: heading,
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

const inMemoryFavouriteFeeds = {
  savedItems: []
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