const feedElementResolver = {
  FeedElement: {
    __resolveType(obj) {
      if (obj.src) {
        return 'FeedImage';
      }
      if (obj.text) {
        return 'FeedCaption';
      }
      if (obj.columns) {
        return 'ColumnLayout';
      }

      return null;
    }
  }
};

module.exports = {
  feedElementResolver
}