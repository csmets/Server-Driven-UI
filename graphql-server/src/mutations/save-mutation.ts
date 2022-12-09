import {sleep} from '../utils';

export const saveMutation = {
  save: async () => {
    await sleep(2000);

    return {
      success: true,
    };
  },
};
