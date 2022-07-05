const containerResolver = {
  ContainerElement: {
    __resolveType(obj) {
      if (obj.primary) {
        return 'Card';
      }

      if (obj.type && obj.value) {
        return 'Heading';
      }

      if (obj.value) {
        return 'Paragraph';
      }

      return null;
    }
  }
};

module.exports = {
  containerResolver
}
