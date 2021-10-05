const { signal, state, stateKeyEnum } = require('./signal');
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
  const heart_full = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";
  const heart_empty = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";
  const error = "Failed! Something went wrong";
  return {
    align: 'LEFT',
    icon: heart_empty,
    saveAction: favouriteAction(feedId, signal(`signal-${feedId}`, heart_full, error)),
    unsaveAction: {
      feedId,
      signal: {
        signalId: `signal-${feedId}`,
        states: [
          state(stateKeyEnum.UNSAVED, heart_empty),
          state(stateKeyEnum.ERROR, heart_full)
        ]
      },
    }
  }
};

const feedFavouriteCount = (count, feedId) => {
  return {
    align: 'RIGHT',
    count,
    signal: {
      signalId: `signal-${feedId}`,
      states: [
        state(stateKeyEnum.SAVED, count + 1),
        state(stateKeyEnum.UNSAVED, count),
        state(stateKeyEnum.ERROR, count)
      ]
    }
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