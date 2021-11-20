import * as React from 'react';
import { FeedFavouriteCountFragment, SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const { signal } = data;
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [count, setCount] = React.useState(data.count);

  const signalCallback = ({ result }: any) => {
    setCount(result.value.text)
  };

  const cacheCallback = ({ result, cache }: any) => {
    cache?.modify({
      id: cache.identify(props.data),
      fields: {
        count() {
          return result.value.text
        }
      },
    })
  };

  useSignalEvent(signal, signalCallback, cacheCallback);

  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}
