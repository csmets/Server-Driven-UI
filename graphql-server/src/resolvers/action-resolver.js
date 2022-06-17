const actionResolver = {
  Action: {
    __resolveType(obj) {
      if (obj.inputIds) {
        return 'EditNameSubmitAction';
      }
      if (obj.url) {
        return 'URLAction';
      }

      return null;
    }
  }
};

module.exports = {
  actionResolver
}
