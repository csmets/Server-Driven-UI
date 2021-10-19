import * as React from 'react';
import { FeedFavouriteCountFragment, SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import { Signal, SignalContext } from '../../../provider/signal';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const { signal } = data;
  const signalContext = React.useContext(SignalContext);
  const { registerSignal } = signalContext;
  const [count, setCount] = React.useState(data.count);
  const signalRef: Signal = {
    type: signal?.type || SignalType.Error,
    reference: signal?.reference || ''
  }

  const { subscribe } = registerSignal(signalRef)

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      console.log(subscribe.result)
      if (subscribe.result.reference === signal?.reference) {
        setCount(subscribe.result.value.text)
      }
    }
  }, [subscribe]);


  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}