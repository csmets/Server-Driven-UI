import {saveMutation} from './save-mutation';
import {updateHeadingMutation} from './update-heading-mutation';

export const mutations = {
  Mutation: {
    ...saveMutation,
    ...updateHeadingMutation,
  },
};
