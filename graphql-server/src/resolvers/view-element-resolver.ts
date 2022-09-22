export const viewElementResolver = {
  ViewElement: {
    __resolveType(obj) {
      if (obj.elements && obj.containerType) {
        return 'Container';
      }

      return null;
    }
  }
};
