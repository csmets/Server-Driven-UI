import { GraphQLClient, gql } from 'graphql-request';
import { feedQuery } from './queries/feed';
import express from 'express';

const app = express();
const port = 9090;

const endpoint = "http://localhost:4000/graphql";

app.get('/getFeed', async(req, res) => {
  const client = new GraphQLClient(endpoint, { headers: {} });
  const data = await client.request(feedQuery, {});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

app.listen(port, () => console.log(`Template server listening on port ${port}!`));