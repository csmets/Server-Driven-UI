export const viewElementResolver = {
  ViewElement: {
    __resolveType(obj: any) {
      if (obj.elements && obj.containerType) {
        return 'Container';
      }

      return null;
    },
  },
};
