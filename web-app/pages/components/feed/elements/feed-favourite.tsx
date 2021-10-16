import * as React from 'react';
import Image from 'next/image';
import {
  FeedFavouriteFragment,
  SaveItemDocument,
  UnsaveItemDocument
} from '@csmets/typescript-apollo-sdui-types/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteFragment }): JSX.Element => {
  const { icon, saveAction, unsaveAction, signal } = props.data;

  /*
    Mutations here are to save or unsave a feed item. These mutations will always
    only return a list of signals to emit. These mutations will only return a key
    and will contain no values. All values are given up-front from the server
    intially.
  */
  const [saveItemMutation, saveResponse] = useMutation(SaveItemDocument);
  const [unsaveItemMutation, unsaveResponse] = useMutation(UnsaveItemDocument);

  const signalContext = React.useContext(SignalContext);
  const { registerSignal, useResponseSignals, emitSignal } = signalContext;

  /*
    To be able to use values that get emited, a signal must be registered. When
    registring a signal, a subscriber is returned. The subscribe is a listener
    that will return values that get emited.
  */
  const { subscribe } = registerSignal(signal || "");

  /*
    Supply the mutation's response to these handlers which will look through the
    signal response and emit them.
  */
  useResponseSignals(saveResponse?.data?.save);
  useResponseSignals(unsaveResponse?.data?.unsave);

  // This is to set the feed favourite icon.
  const [svg, setSvg] = React.useState(icon);

  // Used to determine the state whether or not action should be save or unsave.
  const [save, setSave] = React.useState(true)

  React.useEffect(() => {
    /*
      When an event has been emitted to a signal you've subscribed to a result
      will be returned.
    */
    if (subscribe && subscribe.result) {
      if (subscribe.result.signal === signal) {
        setSvg(subscribe.result.value.text);
      }
    }
  }, [subscribe]);

  const onClick = () => {
    const feedId = saveAction?.feedId || "";
    if (save) {
      saveItemMutation({
        variables: {
          feedId
        }
      });

      const { signal, value } = saveAction.emitSignal || {}

      if (signal && value) {
        emitSignal({ signal, value : value })
      }

      setSave(false);
    } else {
      unsaveItemMutation({
        variables: {
          feedId
        }
      });

      const { signal, value } = unsaveAction.emitSignal || {}

      if (signal && value) {
        emitSignal({ signal, value : value })
      }

      setSave(true);
    }
  }

  if (saveResponse.error || unsaveResponse.error) {
    console.error(saveResponse.error || unsaveResponse.error);
  }

  if (saveResponse.loading || unsaveResponse.loading) {
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