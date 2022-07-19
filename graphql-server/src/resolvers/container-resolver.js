const containerResolver = {
  ContainerElement: {
    __resolveType(obj) {
      if (obj.primary) {
        return 'Card';
      }

      if (obj.typographyVariant && obj.value) {
        return 'Typography';
      }

      if (obj.width || obj.height) {
        return 'Box';
      }

      if (obj.buttonVariant && obj.label) {
        return 'Button';
      }

      return null;
    }
  }
};

module.exports = {
  containerResolver
}
