import * as React from 'react';
import Image from 'next/image';
import { FeedFavouriteFragment, SaveItemDocument, StateKey } from '@csmets/generated-types/generated/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteFragment }): JSX.Element => {
  const { icon, action } = props.data;
  const [saveItemMutation, { data, loading, error }] = useMutation(SaveItemDocument);
  const signalContext = React.useContext(SignalContext);
  const { subscribeSignal, emitSignal } = signalContext;
  let [svg, setSvg] = React.useState(icon);

  if (data && data.save) {
    const { signals } = data.save;
    emitSignal({
      id: signals[0].id,
      key: signals[0].key,
      cb: (signal: any) => {
        switch (signal.key) {
          case StateKey.Ok:
            break;
          case StateKey.Error:
            svg = icon;
            break;
          default:
            break;
        }
      }
    });
  }

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