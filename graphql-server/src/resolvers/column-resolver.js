const columnResolver = {
  Column: {
    __resolveType(obj) {
      if (obj.count) {
        return 'FeedFavouriteCount';
      }
      if (obj.icon) {
        return 'FeedFavourite';
      }
    }
  }
};

module.exports = {
  columnResolver
}