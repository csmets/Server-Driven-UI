import { feedQuery } from './feed/feed-query';
import { editNameQuery } from './edit-name-query';
import { hackerNewsTopStoriesQuery } from './hacker-news-top-stories';
import { kitchenSinkQuery } from './kitchen-sink-query';

export const queries = {
  Query: {
    ...feedQuery,
    ...editNameQuery,
    ...hackerNewsTopStoriesQuery,
    ...kitchenSinkQuery
  }
};
