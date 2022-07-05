import * as React from 'react';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { SignalContext } from '../../provider/signal';
import { signalPairKeyValue } from '../../helper/signal-pair-key-value';
import { FeedFavouriteData } from '../../models/feed-item-vm';
import { SignalValuePairKey } from '../../models/signal-vm';

const saveItemMutationQuery = gql`
  mutation saveItem($feedId: String!) {
      save(feedId: $feedId) {
        success
        error {
          message
        }
      }
  }
`;

const FeedFavourite = (props: { data: FeedFavouriteData }): JSX.Element => {
  const { icon, action, signal } = props.data;

  /*
    Mutations here are to save or unsave a feed item. These mutations will always
    only return a list of signals to emit. These mutations will only return a key
    and will contain no values. All values are given up-front from the server
    initially.
  */
  const [saveItemMutation, saveResponse] = useMutation(saveItemMutationQuery);

  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent, emitSignals } = signalContext;

  // This is to set the feed favourite icon.
  const [svg, setSvg] = React.useState(icon);

  const [isFav, setIsFav] = React.useState(false);

  /*
    To be able to use values that get emitted, a signal must be registered. When
    registering a signal, a subscriber is returned. The subscribe is a listener
    that will return values that get emitted.
  */
  const signalCallback = ({ result, cache }: any): void => {
    const value = signalPairKeyValue(SignalValuePairKey.Icon, result.values)
    if (value) {
      if (cache) {
        cache?.modify({
          id: cache.identify(props.data),
          fields: {
            icon() {
              return value;
            }
          },
        })
      } else {
        setSvg(value);
      }
    }
  };
  useSignalEvent(signal, signalCallback);

  const onClick = () => {
    const feedId = action?.feedId || "";
    saveItemMutation({
      variables: { feedId },
      update(cache, _) {
        if (isFav) {
          action?.unsave && emitSignals(action.unsave, cache)
        } else {
          action?.save && emitSignals(action?.save, cache)
        }
      }
    });

    if (isFav) {
      action?.unsave && emitSignals(action.unsave)
    } else {
      action?.save && emitSignals(action?.save)
    }

    setIsFav(!isFav);
  }

  React.useEffect(() => {
    // Fallback to original value when error has occurred
    if (saveResponse.error) {
      console.error(saveResponse.error);
      if (signal) {
        emitSignals([{
          signal,
          values: [{
            key: SignalValuePairKey.Icon,
            value: icon
          }]
        }])
      }
    }
  }, [saveResponse])


  if (saveResponse.loading) {
    console.log('waiting on mutation response');
  }

  return (
    <div>
      <a onClick={onClick}>
        <Image src={svg || ""} alt="Favourite picture" width="20px" height="20px" />
      </a>
    </div>
  );
}

export {
  FeedFavourite
}
