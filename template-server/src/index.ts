import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { GraphQLClient, gql } from 'graphql-request';
import { feedQuery } from './queries/feed';
import cors from 'cors';
import { editNameQuery } from './queries/edit-name';


const app = express();
app.use(cors());
const port = 9090;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/feed' });

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

wss.on('connection', async function connection(ws) {
  const response = [];
  ws.send(JSON.stringify(response));

  const client = new GraphQLClient(endpoint, { headers: {} });
  const feedResp = await client.request(feedQuery, {});
  response.push({
      "section": "feed",
      "data": feedResp.feed
  });
  ws.send(JSON.stringify(response))

  const formResp  = await client.request(editNameQuery, {});
  response.push(
    {
      "section": "editName",
      "data": formResp.editName
    }
  );
  ws.send(JSON.stringify(response))
  ws.close()
});

server.listen(port, () => console.log(`Template server listening on port ${port}!`));