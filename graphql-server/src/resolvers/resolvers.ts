import { actionResolver } from './action-resolver';
import { columnResolver } from './column-resolver';
import { feedElementResolver } from './feed-element-resolver';
import { feedViewElementResolver } from './feed-view-element-resolver';
import { formElementResolver } from './form-element-resolver';
import { containerResolver } from './container-resolver';
import { viewElementResolver } from './view-element-resolver';

export const resolvers = {
  ...actionResolver,
  ...columnResolver,
  ...feedElementResolver,
  ...feedViewElementResolver,
  ...formElementResolver,
  ...viewElementResolver,
  ...containerResolver,
}
