const hackerNewsResolver = {
  HackerNewsViewElements: {
    __resolveType(obj) {
      if (obj.elements) {
        return 'Container';
      }

      return null;
    }
  }
};

module.exports = {
  hackerNewsResolver
}
