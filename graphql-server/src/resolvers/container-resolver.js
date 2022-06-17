const containerResolver = {
  ContainerElement: {
    __resolveType(obj) {
      if (obj.primary) {
        return 'Card';
      }

      return null;
    }
  }
};

module.exports = {
  containerResolver
}
