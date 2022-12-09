import {
  ButtonSize,
  FavouriteButton,
  SignalType,
  SignalValuePairKey,
} from '../../types';
import {favouriteButton} from '../button/favourite-button';

export const feedFavouriteButton = (
  count: number,
  feedId: string,
  saved = false
): FavouriteButton => {
  const heart_full = 'https://cdn-icons-png.flaticon.com/512/1076/1076984.png';
  const heart_empty = 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png';
  const originalImage = saved ? heart_full : heart_empty;
  const nextImage = saved ? heart_empty : heart_full;
  const nextCount = saved ? `${count} likes` : `${count + 1} likes`;

  return favouriteButton({
    icon: originalImage,
    label: undefined,
    buttonSize: ButtonSize.Small,
    disabled: false,
    signal: {
      type: SignalType.Toggle,
      reference: `ref-${feedId}`,
    },
    action: {
      __typename: 'FavouriteAction',
      feedId,
      save: [
        {
          signal: {
            type: SignalType.Toggle,
            reference: `ref-${feedId}`,
          },
          values: [
            {
              key: SignalValuePairKey.Icon,
              value: {
                __typename: 'SignalStringValue',
                text: nextImage,
              },
            },
          ],
        },
        {
          signal: {
            type: SignalType.Update,
            reference: `ref-${feedId}-count`,
          },
          values: [
            {
              key: SignalValuePairKey.Content,
              value: {
                __typename: 'SignalArrayValue',
                suffix: [],
                prefix: [],
                array: [nextCount],
              },
            },
          ],
        },
      ],
      unsave: [
        {
          signal: {
            type: SignalType.Toggle,
            reference: `ref-${feedId}`,
          },
          values: [
            {
              key: SignalValuePairKey.Icon,
              value: {
                __typename: 'SignalStringValue',
                text: originalImage,
              },
            },
          ],
        },
        {
          signal: {
            type: SignalType.Update,
            reference: `ref-${feedId}-count`,
          },
          values: [
            {
              key: SignalValuePairKey.Content,
              value: {
                __typename: 'SignalArrayValue',
                suffix: [],
                prefix: [],
                array: [`${count} likes`],
              },
            },
          ],
        },
      ],
    },
  });
};
