const express = require('express');
const fs = require('fs')
const glob = require('glob');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { resolvers } = require('./resolvers/resolvers')
const { queries } = require('./queries/queries')
const { mutations } = require('./mutations/mutations')

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
    resolvers: {
      ...resolvers,
      ...queries,
      ...mutations
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema, resolvers)
