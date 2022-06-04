const { signalEnum } = require('../components/signal')
const { sleep } = require('../utils');

const editNameQuery = {
  editName: async () => {
    await sleep(5000)

    return {
      elements: [
        {
          formId: 'headingInput',
          placeholder: 'Updating heading title'
        },
        {
          label: 'Edit title',
          action: {
            inputIds: ['headingInput'],
            emitSignal: {
              signal: {
                type: signalEnum.TITLE,
                reference: null
              },
              values: []
            }
          }
        }
      ]
    }
  }
};

module.exports = {
  editNameQuery
}