const express = require('express');
const fs = require('fs')
const glob = require('glob');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { fetchFeed } = require('./feed');
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
  Action: {
    __resolveType(obj) {
      if (obj.inputIds) {
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
            id: 'heading',
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
              emitSignal: {
                signal: {
                  type: signalEnum.TITLE,
                  reference: null
                },
                values: []
              }
            }
          }
        ]
      }
    }
  },
  Mutation: {
    save: async (_, { feedId }) => {
      await sleep(2000)

      return {
        success: true
      };
    },
    updateHeading: async (_, { formInputs }) => {
      await sleep(2000)

      return {
        success: true
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
