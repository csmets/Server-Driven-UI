const { saveMutation } = require("./save-mutation");
const { updateHeadingMutation } = require("./update-heading-mutation");

const mutations = {
  Mutation: {
    ...saveMutation,
    ...updateHeadingMutation
  }
}

module.exports = {
  mutations
}