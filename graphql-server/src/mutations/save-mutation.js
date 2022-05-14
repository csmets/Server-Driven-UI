const { sleep } = require('../utils');

const saveMutation = {
    save: async (_, { feedId }) => {
      await sleep(2000)

      return {
        success: true
      };
    }
};

module.exports = {
  saveMutation
}