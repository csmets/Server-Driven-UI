const { feedQuery } = require('./feed/feed-query');
const { editNameQuery } = require('./edit-name-query');

const queries = {
  Query: {
    ...feedQuery,
    ...editNameQuery
  }
};

module.exports = {
  queries
}