import * as React from 'react';
import { SignalContext } from '../../provider/signal';
import { signalPairKeyValue } from '../../helper/signal-pair-key-value';
import { FeedFavouriteCountData } from '../../models/feed-item-vm';
import { SignalValuePairKey } from '../../models/signal-vm';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountData }): JSX.Element => {
  const { data } = props;
  const { signal } = data;
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [count, setCount] = React.useState(data.count);

  const signalCallback = ({ result, cache }: any) => {
    const value = signalPairKeyValue(SignalValuePairKey.Count, result.values)

    if (value) {
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
    }
  };

  useSignalEvent(signal, signalCallback);

  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}
