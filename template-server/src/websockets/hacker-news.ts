import * as stream from 'node:stream';

import { IncomingMessage } from "http";
import { WebSocketServer } from 'ws';
import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_SERVER } from '../globals';
import {hackerNewsTopStoriesQuery} from '../queries/hacker-news-top-stories';

export const hackerNewsWS = (
  wss: WebSocketServer,
  request: IncomingMessage,
  socket: stream.Duplex, head: Buffer
) => {
  wss.handleUpgrade(request, socket, head, async function done(ws) {
    wss.emit('connection', ws, request);

    const response = [];
    ws.send(JSON.stringify(response));

    const client = new GraphQLClient(GRAPHQL_SERVER, { headers: {} });

    /*
     * Fetch hacker news top stories  SDUI view response first
     */
    const hnResp = await client.request(hackerNewsTopStoriesQuery, {});
    response.push({
      "section": "hackerNews",
      "data": hnResp
    });
    ws.send(JSON.stringify(response))

    // Connection should close once all jobs are done to end the session.
    ws.close()
  });
};
