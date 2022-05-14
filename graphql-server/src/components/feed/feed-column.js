const { feedFavourite } = require('./feed-favourite');
const { feedFavouriteCount } = require('./feed-favourite-count');

const feedColumn = (count, feedId) => {
  const feedFavouriteCache = `feedFavourite-${feedId}`;
  const feedFavouriteCountCache = `feedFavouriteCount-${feedId}`;
  return {
    columns: [
      feedFavourite(count, feedId, feedFavouriteCache),
      feedFavouriteCount(count, feedId, feedFavouriteCountCache)
    ]
  }
}

module.exports = {
  feedColumn
}