const { signalEnum } = require('../../../components/signal');

const heading = {
  id: 'heading',
  primary: 'Example list of feed items',
  signal: {
    type: signalEnum.TITLE,
    reference: null
  }
};

module.exports = {
  heading
}