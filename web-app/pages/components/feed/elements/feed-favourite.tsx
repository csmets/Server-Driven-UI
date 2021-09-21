import * as React from 'react';
import Image from 'next/image';
import { EmitSignal, FeedFavourite as FeedFavouriteType, SaveItemDocument, State, StateKey } from '@csmets/generated-types/generated/types';
import { useMutation } from '@apollo/client';
import { SignalContext, useEmitSignal, useSignal } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteType }): JSX.Element => {
  const { icon, action } = props.data;
  const [saveItemMutation, { data, loading, error }] = useMutation(SaveItemDocument);
  const signalContext = React.useContext(SignalContext);
  const { subscribeSignal } = signalContext;
  const [svg, setSvg] = React.useState(icon);
  useEmitSignal(data);
  const cb = (signal: EmitSignal) => {
    switch (signal.key) {
      case StateKey.Ok:
        break;
      case StateKey.Error:
        setSvg(icon);
        break;
      default:
        break;
    }
  }
  useSignal(cb);

  const onClick = () => {
    const id = action?.id || "";
    saveItemMutation({
      variables: {
        id
      }
    });

    action?.signal?.states?.map((state) => {
      if (state.key == StateKey.Ok) {
        setSvg(state.value);
        subscribeSignal({
          id
        });
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