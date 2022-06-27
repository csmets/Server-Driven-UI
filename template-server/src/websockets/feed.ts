import * as stream from 'node:stream';

import { IncomingMessage } from "http";
import { WebSocketServer } from 'ws';
import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_SERVER } from '../globals';
import { feedQuery } from '../queries/feed';
import { editNameQuery } from '../queries/edit-name';

export const feedWS = (
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
     * Fetch feed SDUI view response first
     */
    const feedResp = await client.request(feedQuery, {});
    response.push({
      "section": "feed",
      "data": feedResp.feed
    });
    ws.send(JSON.stringify(response))

    /*
     * Fetch form SDUI view response
     */
    const formResp  = await client.request(editNameQuery, {});
    response.push(
      {
        "section": "editName",
        "data": formResp.editName
      }
    );
    ws.send(JSON.stringify(response))

    // Connection should close once all jobs are done to end the session.
    ws.close()
  });
};
