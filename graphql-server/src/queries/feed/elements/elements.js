const { heading } = require('./heading');
const { typography } = require('./typography');
const { fetchFeed } = require('../../../components/feed/feed');

const elements = {
  "heading": heading,
  "typography": typography,
  "feed": [ ...fetchFeed() ]
}

module.exports = {
  elements
}