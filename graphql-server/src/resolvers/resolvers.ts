import { actionResolver } from './action-resolver';
import { formElementResolver } from './form-element-resolver';
import { containerResolver } from './container-resolver';
import { viewElementResolver } from './view-element-resolver';

export const resolvers = {
  ...actionResolver,
  ...formElementResolver,
  ...viewElementResolver,
  ...containerResolver,
}
