const actionResolver = {
  Action: {
    __resolveType(obj) {
      if (obj.inputIds) {
        return 'EditNameSubmitAction'
      }
    }
  }
};

module.exports = {
  actionResolver
}