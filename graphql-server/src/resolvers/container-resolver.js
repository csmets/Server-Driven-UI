const containerResolver = {
  ContainerElement: {
    __resolveType(obj) {
      if (obj.primary) {
        return 'Card';
      }

      if (obj.variant && obj.value) {
        return 'Typography';
      }

      if (obj.width || obj.height) {
        return 'Box';
      }

      return null;
    }
  }
};

module.exports = {
  containerResolver
}
