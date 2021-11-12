import * as React from 'react';
import Image from 'next/image';
import {
  FeedFavouriteFragment,
  SaveItemDocument
} from '@csmets/typescript-apollo-sdui-types/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteFragment }): JSX.Element => {
  const { icon, action, signal} = props.data;

  /*
    Mutations here are to save or unsave a feed item. These mutations will always
    only return a list of signals to emit. These mutations will only return a key
    and will contain no values. All values are given up-front from the server
    intially.
  */
  const [saveItemMutation, saveResponse] = useMutation(SaveItemDocument);

  const signalContext = React.useContext(SignalContext);
  const { registerSignal, emitSignals } = signalContext;

  /*
    To be able to use values that get emitted, a signal must be registered. When
    registering a signal, a subscriber is returned. The subscribe is a listener
    that will return values that get emitted.
  */
  const { subscribe } = registerSignal(signal);

  // This is to set the feed favourite icon.
  const [svg, setSvg] = React.useState(icon);

  React.useEffect(() => {
    /*
      When an event has been emitted to a signal you've subscribed to a result
      will be returned.
    */
    if (subscribe && subscribe.result) {
      setSvg(subscribe.result.value.text);
    }
  }, [subscribe]);

  const onClick = () => {
    const feedId = action?.feedId || "";
    const cacheIds = action?.cacheIds || [];
    const cacheInputIds = cacheIds.map((cache) => {
      return {
        "key": cache.key,
        "value": cache.value
      }
    })
    saveItemMutation({
      variables: {
        feedId,
        cacheIds: cacheInputIds
      }
    });

    emitSignals(action?.emitSignals)
  }

  if (saveResponse.error) {
    console.error(saveResponse.error);
  }

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