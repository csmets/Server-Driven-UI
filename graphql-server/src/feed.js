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

const feedFavourite = (count, feedId) => {
  const heart_full = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";
  const heart_empty = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";
  return {
    align: 'LEFT',
    icon: heart_empty,
    signal: {
      type: signalEnum.FAVOURITE,
      reference: `ref-${feedId}`,
      fallback: {
        text: heart_empty
      }
    },
    saveAction: {
      feedId,
      emitSignals: [
        {
          signal: {
            type: signalEnum.FAVOURITE,
            reference: `ref-${feedId}`
          },
          value: {
            text: heart_full
          }
        },
        {
          signal: {
            type: signalEnum.FAVOURITE_COUNT,
            reference: `ref-${feedId}-count`
          },
          value: {
            text: count + 1
          }
        }
      ]
    },
    unsaveAction: {
      feedId,
      emitSignals: [
        {
          signal: {
            type: signalEnum.FAVOURITE,
            reference: `ref-${feedId}`
          },
          value: {
            text: heart_empty
          }
        },
        {
          signal: {
            type: signalEnum.FAVOURITE_COUNT,
            reference: `ref-${feedId}-count`
          },
          value: {
            text: count
          }
        }
      ]
    }
  }
};

const feedFavouriteCount = (count, feedId) => {
  return {
    align: 'RIGHT',
    count,
    signal: {
      type: signalEnum.FAVOURITE_COUNT,
      reference: `ref-${feedId}-count`,
      fallback: {
        text: count
      }
    }
  };
};

const feedColumn = (count, feedId) => {
  return {
    columns: [
      feedFavourite(count, feedId),
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

const feedCount = (feedId) => {
  const data = mockResponseData

  const feedList = data.filter(({id, count}) => {
    if (id === feedId) {
      return count;
    }
  });

  if (feedList && feedList.length) {
    return feedList[0].count;
  }

  return null;
}

module.exports = {
  fetchFeed,
  feedCount
};