import { sleep } from '../utils';

export const saveMutation = {
    save: async (_, { feedId }) => {
      await sleep(2000)

      return {
        success: true
      };
    }
};