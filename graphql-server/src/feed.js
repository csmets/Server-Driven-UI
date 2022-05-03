const { signalEnum, signalPairValueKey } = require('./signal');
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

const feedFavourite = (count, feedId, cacheId, saved = false) => {
  const heart_full = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";
  const heart_empty = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";
  const originalImage = saved ? heart_full : heart_empty;
  const nextImage = saved ? heart_empty : heart_full;
  const nextCount = saved ? count : count + 1;
  return {
    id: cacheId,
    align: 'LEFT',
    icon: originalImage,
    signal: {
      type: signalEnum.TOGGLE,
      reference: `ref-${feedId}`
    },
    action: {
      feedId,
      save: [
        {
          signal: {
            type: signalEnum.TOGGLE,
            reference: `ref-${feedId}`
          },
          values: [
            {
              "key": signalPairValueKey.ICON,
              "value": nextImage
            }
          ]
        },
        {
          signal: {
            type: signalEnum.TOGGLE,
            reference: `ref-${feedId}-count`
          },
          values: [
            {
              "key": signalPairValueKey.COUNT,
              "value": nextCount
            }
          ]
        }
      ],
      unsave: [
        {
          signal: {
            type: signalEnum.TOGGLE,
            reference: `ref-${feedId}`
          },
          values: [
            {
              "key": signalPairValueKey.ICON,
              "value": originalImage
            }
          ]
        },
        {
          signal: {
            type: signalEnum.TOGGLE,
            reference: `ref-${feedId}-count`
          },
          values: [
            {
              "key": signalPairValueKey.COUNT,
              "value": count
            }
          ]
        }
      ]
    },
  }
};

const feedFavouriteCount = (count, feedId, cacheId, saved = false) => {
  const countValue = saved ? count + 1 : count;
  return {
    id: cacheId,
    align: 'RIGHT',
    count: countValue,
    signal: {
      type: signalEnum.TOGGLE,
      reference: `ref-${feedId}-count`
    }
  };
};

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
  feedCount,
  feedFavourite,
  feedFavouriteCount
};
