import * as React from 'react';
import Image from 'next/image';
import { FeedFavourite as FeedFavouriteType, SaveItemDocument } from '@csmets/generated-types/generated/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteType }): JSX.Element => {
  const { icon, action } = props.data;
  const [saveItemMutation, { data, loading, error }] = useMutation(SaveItemDocument);
  const signalContext = React.useContext(SignalContext);
  const { signal, subscribeSignal, emitSignal } = signalContext;
  const [svg, setSvg] = React.useState(icon)

  React.useEffect(() => {
    if (data) {
      const { save } = data;
      const { signals } = save;
      emitSignal({
        id: signals[0].id,
        key: signals[0].key
      });
    }
  },[data])

  React.useEffect(() => {
    if (signal) {
      if (signal.key == 'OK') {
        console.log('success');
      }
      if (signal.key == 'ERROR') {
        console.log('error occured');
        setSvg(icon);
      }
    }
  },[signal])

  const onClick = () => {
    const id = action?.id || "";
    saveItemMutation({
      variables: {
        id
      }
    });

    action?.signal?.states?.map((state) => {
      if (state.key == 'OK') {
        setSvg(state.value);
        subscribeSignal({
          id
        });
      }
    });
  }

  action?.signal?.states?.map((state) => {
  });

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