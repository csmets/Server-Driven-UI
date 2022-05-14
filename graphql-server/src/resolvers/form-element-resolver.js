const formElementResolver = {
  FormElement: {
    __resolveType(obj) {
      if (obj.label) {
        return 'Button'
      }
      if (obj.formId) {
        return 'TextInput'
      }
    }
  }
};

module.exports = {
  formElementResolver
}