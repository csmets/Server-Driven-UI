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
          disabled: false,
          disableElevation: false,
          buttonVariant: "CONTAINED",
          buttonTheme: "PRIMARY",
          buttonSize: "MEDIUM"
        }
      ]
    }
  }
};

module.exports = {
  editNameQuery
}
