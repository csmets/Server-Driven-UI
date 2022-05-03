import * as React from 'react';
import Image from 'next/image';
import {
  FeedFavouriteFragment,
  SaveItemDocument,
  SignalValuePairKey
} from '@csmets/typescript-apollo-sdui-types/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteFragment }): JSX.Element => {
  const { icon, action, signal} = props.data;

  /*
    Mutations here are to save or unsave a feed item. These mutations will always
    only return a list of signals to emit. These mutations will only return a key
    and will contain no values. All values are given up-front from the server
    initially.
  */
  const [saveItemMutation, saveResponse] = useMutation(SaveItemDocument);

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
    if (cache) {
      cache?.modify({
        id: cache.identify(props.data),
        fields: {
          icon() {
            return result.values[0].value;
          }
        },
      })
    } else {
      setSvg(result.values[0].value);
    }
  };
  useSignalEvent(signal, signalCallback);

  const onClick = () => {
    const feedId = action?.feedId || "";
    saveItemMutation({
      variables: { feedId },
      update(cache, _ ) {
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
      emitSignals([{
        signal,
        values: [{
          key: SignalValuePairKey.Icon,
          value: icon
        }]
      }])
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
