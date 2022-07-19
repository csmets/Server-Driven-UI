const viewElementResolver = {
  ViewElement: {
    __resolveType(obj) {
      if (obj.elements) {
        return 'Container';
      }

      return null;
    }
  }
};

module.exports = {
  viewElementResolver
}
