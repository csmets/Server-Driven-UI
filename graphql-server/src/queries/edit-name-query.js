const { signalEnum } = require('../components/signal')

const editNameQuery = {
  editName: () => {
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