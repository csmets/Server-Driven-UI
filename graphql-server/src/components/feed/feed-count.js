const feedCount = (feedId) => {
  const feedList = data.filter(({id, count}) => {
    if (id === feedId) {
      return count;
    }
  });

  if (feedList && feedList.length) {
    return feedList[0].count;
  }

  return null;
};

module.exports = {
  feedCount
}