import { sleep } from '../utils';

export const updateHeadingMutation = {
    updateHeading: async (_, { formInputs }) => {
      await sleep(2000)

      return {
        success: true
      }
    }
};