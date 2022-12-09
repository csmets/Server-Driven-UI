export const formElementResolver = {
  FormElement: {
    __resolveType(obj: any) {
      if (obj.label) {
        return 'Button';
      }
      if (obj.formId) {
        return 'TextInput';
      }
      return null;
    },
  },
};
