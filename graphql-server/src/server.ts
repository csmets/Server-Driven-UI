import express from 'express';
import fs from 'fs';
import glob from 'glob';
import {ApolloServer} from 'apollo-server-express';
import cors from 'cors';
import {resolvers} from './resolvers/resolvers';
import {queries} from './queries/queries';
import {mutations} from './mutations/mutations';

const graphqlFiles = glob.sync('./graphql/**/*.graphql');
let schema = '';

graphqlFiles.forEach(element => {
  try {
    const file = fs.readFileSync(element, 'utf8');
    schema += file;
  } catch (error) {
    console.error(error);
  }
});

async function startApolloServer(typeDefs: string, resolvers: any) {
  const app = express();
  const corsOptions = {
    origin: '*',
    credentials: true,
  };

  app.use(cors(corsOptions));
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      ...resolvers,
      ...queries,
      ...mutations,
    },
  });
  await server.start();
  server.applyMiddleware({app});
  await new Promise(resolve => app.listen({port: 4000}, resolve as () => void));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema, resolvers);
