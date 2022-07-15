const containerResolver = {
  ContainerElement: {
    __resolveType(obj) {
      if (obj.primary) {
        return 'Card';
      }

      if (obj.variant && obj.value) {
        return 'Typography';
      }

      return null;
    }
  }
};

module.exports = {
  containerResolver
}
