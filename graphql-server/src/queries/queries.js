const { feedQuery } = require('./feed/feed-query');
const { editNameQuery } = require('./edit-name-query');
const { hackerNewsTopStoriesQuery } = require('./hacker-news-top-stories');
const { kitchenSinkQuery } = require('./kitcken-sink-query');

const queries = {
  Query: {
    ...feedQuery,
    ...editNameQuery,
    ...hackerNewsTopStoriesQuery,
    ...kitchenSinkQuery
  }
};

module.exports = {
  queries
}
