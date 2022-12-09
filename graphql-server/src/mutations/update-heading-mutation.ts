import {sleep} from '../utils';

export const updateHeadingMutation = {
  updateHeading: async () => {
    await sleep(2000);

    return {
      success: true,
    };
  },
};
