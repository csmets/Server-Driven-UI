import * as React from 'react';
import { FeedFavouriteCountFragment, SignalType, SignalValuePairKey } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';
import { signalPairKeyValue } from '../../../helper/signal-pair-key-value';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const { signal } = data;
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [count, setCount] = React.useState(data.count);

  const signalCallback = ({ result, cache }: any) => {
    const value = signalPairKeyValue(SignalValuePairKey.Count, result.values)

    if (cache) {
      cache?.modify({
        id: cache.identify(props.data),
        fields: {
          count() {
              return value
          }
        },
      })
    } else {
      setCount(value)
    }
  };

  useSignalEvent(signal, signalCallback);

  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}
