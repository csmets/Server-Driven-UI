import * as React from 'react';
import { FeedFavouriteCountFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const { signal } = data;
  const signalContext = React.useContext(SignalContext);
  const { registerSignal } = signalContext;
  const [count, setCount] = React.useState(data.count);

  const { subscribe } = registerSignal(signal || "")

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      if (subscribe.result.signal === signal) {
        setCount(subscribe.result.value.text)
      }
    }
  }, [subscribe]);


  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}