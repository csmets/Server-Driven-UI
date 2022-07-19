import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import cors from 'cors';
import { parse } from 'url';
import { feedWS } from './websockets/feed';
import { hackerNewsWS } from './websockets/hacker-news';
import { GRAPHQL_SERVER, PORT } from './globals';
import { GraphQLClient } from 'graphql-request';
import { kitchenSinkQuery } from './queries/kitchen-sink';


const app = express();
app.use(cors());

const server = http.createServer(app);
const feedServer = new WebSocket.Server({ noServer: true });
const hackerNewsServer = new WebSocket.Server({ noServer: true });

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

app.get('/kitchen-sink', async (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  const client = new GraphQLClient(GRAPHQL_SERVER, { headers: {} });
  let response = [];

  /*
   * Fetch kitchen sink view response
   */
  const kitchenSinkResp = await client.request(kitchenSinkQuery, {});
  response.push({
      "section": "feed",
      "data": kitchenSinkResp.kitchenSink
      });
  res.end(JSON.stringify(response))
});

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === '/feed') {
    feedWS(feedServer, request, socket, head);
  } else if (pathname === '/hacker-news') {
    hackerNewsWS(hackerNewsServer, request, socket, head);
  } else {
    socket.destroy();
  }
})

server.listen(
  PORT,
  () => console.log(`Template server listening on port ${PORT}!`)
);
