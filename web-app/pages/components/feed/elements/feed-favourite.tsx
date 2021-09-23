import * as React from 'react';
import Image from 'next/image';
import { FeedFavouriteFragment, SaveItemDocument, StateKey } from '@csmets/generated-types/generated/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';
import { resultKeyNameFromField } from '@apollo/client/utilities';

const FeedFavourite = (props: { data: FeedFavouriteFragment }): JSX.Element => {
  const { icon, action } = props.data;
  const [saveItemMutation, { data, loading, error }] = useMutation(SaveItemDocument);
  const signalContext = React.useContext(SignalContext);
  const { registerSignal, emitSignal } = signalContext;
  let [svg, setSvg] = React.useState(icon);
  const signalId = action?.signal?.signalId || "";
  const { subscribe } = registerSignal({ signalId });

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      switch (subscribe.result?.key) {
        case StateKey.Error:
          setSvg(icon);
        default:
          break;
      }
    }
  }, [subscribe]);

  React.useEffect(() => {
    if (data && data.save) {
      const { signals } = data.save;
      emitSignal({
        signalId: signals[0].signalId,
        key: signals[0].key
      });
    }
  }, [data]);

  const onClick = () => {
    const feedId = action?.feedId || "";
    saveItemMutation({
      variables: {
        feedId
      }
    });

    action?.signal?.states?.map((state) => {
      if (state.key == StateKey.Ok) {
        setSvg(state.value);
      }
    });
  }

  if (error) {
    console.error(error);
  }

  if (loading) {
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