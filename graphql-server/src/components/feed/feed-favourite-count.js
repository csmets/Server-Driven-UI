const { signalEnum } = require('../signal');

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

module.exports = {
  feedFavouriteCount
}