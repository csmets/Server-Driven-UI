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
          // button
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
          },
          variant: "CONTAINED",
          disabled: false,
          disableElevation: false,
          theme: "PRIMARY",
          size: "MEDIUM"
        }
      ]
    }
  }
};

module.exports = {
  editNameQuery
}
