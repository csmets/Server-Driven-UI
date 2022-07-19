const { actionResolver } = require('./action-resolver');
const { columnResolver } = require('./column-resolver');
const { feedElementResolver } = require('./feed-element-resolver');
const { feedViewElementResolver } = require('./feed-view-element-resolver');
const { formElementResolver } = require('./form-element-resolver');
const { containerResolver } = require('./container-resolver');
const { viewElementResolver } = require('./view-element-resolver');

const resolvers = {
  ...actionResolver,
  ...columnResolver,
  ...feedElementResolver,
  ...feedViewElementResolver,
  ...formElementResolver,
  ...viewElementResolver,
  ...containerResolver,
}

module.exports = {
  resolvers
}
