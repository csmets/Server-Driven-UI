const { signalEnum } = require('../components/signal')
const { fetchFeed } = require('../components/feed/feed')

const feedQuery = {
  feed: () => {
    return {
      elements: [
        {
          id: 'heading',
          primary: 'Example list of feed items',
          signal: {
            type: signalEnum.TITLE,
            reference: null
          }
        },
        {
          paragraph: [{
            value: "This is a description"
          }]
        },
        ...fetchFeed()
      ]
    }
  }
};

module.exports = {
  feedQuery
}