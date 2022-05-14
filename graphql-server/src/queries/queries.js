const { feedQuery } = require('./feed-query');
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