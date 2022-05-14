const { signalEnum, signalPairValueKey } = require('../signal');

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

module.exports = {
  feedFavourite
}