const { sleep } = require('../utils');

const updateHeadingMutation = {
    updateHeading: async (_, { formInputs }) => {
      await sleep(2000)

      return {
        success: true
      }
    }
};

module.exports = {
  updateHeadingMutation
}