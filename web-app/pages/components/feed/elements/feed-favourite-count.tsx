import * as React from 'react';
import { FeedFavouriteCountFragment, SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const { signal } = data;
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [count, setCount] = React.useState(data.count);

  useSignalEvent(signal, (result) => {
    setCount(result.value.text)
  });

  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}