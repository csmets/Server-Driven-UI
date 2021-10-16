const { signalEnum } = require('./signal');
const mockResponseData = require('./mock/mockRemoteDataResponse.json');

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
  return {
    align: 'LEFT',
    icon: heart_empty,
    saveAction: {
      feedId,
      emitSignal: {
        signal: signalEnum.FAVOURITE,
        value: {
          text: heart_full
        }
      }
    },
    unsaveAction: {
      feedId,
      emitSignal: {
        signal: signalEnum.FAVOURITE,
        value: {
          text: heart_empty
        }
      }
    }
  }
};

const feedFavouriteCount = (count, feedId) => {
  return {
    align: 'RIGHT',
    count,
    signal: signalEnum.FAVOURITE
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