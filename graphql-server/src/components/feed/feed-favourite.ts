import { Button, ButtonSize, ButtonTheme, ButtonVariant, SignalType, SignalValuePairKey } from '../../types';

export const feedFavouriteButton = (count, feedId, saved = false): Button => {
  const heart_full = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";
  const heart_empty = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";
  const originalImage = saved ? heart_full : heart_empty;
  const nextImage = saved ? heart_empty : heart_full;
  const nextCount = saved ? count : count + 1;
  return {
    __typename: 'Button',
    icon: originalImage,
    buttonSize: ButtonSize.Small,
    buttonTheme: ButtonTheme.Secondary,
    buttonVariant: ButtonVariant.Text,
    disableElevation: false,
    disabled: false,
    label: null,
    signal: {
      type: SignalType.Toggle,
      reference: `ref-${feedId}`
    },
    action: {
      __typename: 'FavouriteAction',
      feedId,
      save: [
        {
          signal: {
            type: SignalType.Toggle,
            reference: `ref-${feedId}`
          },
          values: [
            {
              key: SignalValuePairKey.Icon,
              value: nextImage
            }
          ]
        },
        {
          signal: {
            type: SignalType.FavouriteCount,
            reference: `ref-${feedId}-count`
          },
          values: [
            {
              key: SignalValuePairKey.Count,
              value: nextCount
            }
          ]
        }
      ],
      unsave: [
        {
          signal: {
            type: SignalType.Toggle,
            reference: `ref-${feedId}`
          },
          values: [
            {
              key: SignalValuePairKey.Icon,
              value: originalImage
            }
          ]
        },
        {
          signal: {
            type: SignalType.FavouriteCount,
            reference: `ref-${feedId}-count`
          },
          values: [
            {
              key: SignalValuePairKey.Count,
              value: count
            }
          ]
        }
      ]
    },
  }
};