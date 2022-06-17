const { feedQuery } = require('./feed/feed-query');
const { editNameQuery } = require('./edit-name-query');
const { hackerNewsTopStoriesQuery } = require('./hacker-news-top-stories');

const queries = {
  Query: {
    ...feedQuery,
    ...editNameQuery,
    ...hackerNewsTopStoriesQuery
  }
};

module.exports = {
  queries
}
