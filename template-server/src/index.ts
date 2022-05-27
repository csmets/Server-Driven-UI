import { GraphQLClient, gql } from 'graphql-request';
import { feedQuery } from './queries/feed';
import express from 'express';
import cors from 'cors';
import { editNameQuery } from './queries/edit-name';

const app = express();
app.use(cors());
const port = 9090;

const endpoint = "http://localhost:4000/graphql";

app.get('/component/feed', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    "elements": [
      {
        "type": "heading"
      },
      {
        "type": "typography"
      },
      {
        "type": "feed"
      }
    ]
  }));
});

app.get('/feed', async(req, res) => {
  const client = new GraphQLClient(endpoint, { headers: {} });
  const feedResp = await client.request(feedQuery, {});
  const formResp  = await client.request(editNameQuery, {});
  const data = [
    {
      "section": "feed",
      "data": feedResp.feed
    },
    {
      "section": "editName",
      "data": formResp.editName
    }
  ]
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

app.listen(port, () => console.log(`Template server listening on port ${port}!`));