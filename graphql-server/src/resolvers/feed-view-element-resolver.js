const feedViewElementResolver = {
  FeedViewElement: {
    __resolveType(obj) {
      if (obj.paragraph) {
        return 'TypographyContent';
      }
      if (obj.items) {
        return 'FeedItem';
      }
      if (obj.primary) {
        return 'FeedHeading';
      }

      return null;
    }
  }
};

module.exports = {
  feedViewElementResolver
}