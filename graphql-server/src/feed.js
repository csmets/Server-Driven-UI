const { signal } = require('./signal');
const mockResponseData = require('./mock/mockRemoteDataResponse.json');

const favouriteAction = (feedId, signal) => {
  return {
    feedId,
    signal
  };
};

const feedImage = (src, alt) => {
  return {
    src,
    alt
  };
};

const feedCaption = (text) => {
  return {
    text
  }
};

const feedFavourite = (feedId) => {
  const ok = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";
  const error = "Failed! Something went wrong";
  return {
    align: 'LEFT',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
    action: favouriteAction(feedId, signal(`signal-${feedId}`, ok, error))
  }
};

const feedFavouriteCount = (count, feedId) => {
  return {
    align: 'RIGHT',
    count,
    signal: signal(`signal-${feedId}`, count + 1, count)
  };
};

const feedColumn = (count, feedId) => {
  return {
    columns: [
      feedFavourite(feedId),
      feedFavouriteCount(count, feedId)
    ]
  }
}

const feedItemFactory = (id, caption, image, alt, count) => {
  return {
    items: [
      feedImage(image, alt),
      feedColumn(count, id),
      feedCaption(caption)
    ]
  }
};

const fetchFeed = () => {
  const data = mockResponseData

  const feedList = data.map(({id, caption, image, alt, count}) => feedItemFactory(id, caption, image, alt, count));

  return feedList
};

module.exports = {
  fetchFeed
};