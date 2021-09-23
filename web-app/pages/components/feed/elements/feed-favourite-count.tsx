import * as React from 'react';
import { FeedFavouriteCountFragment } from '@csmets/generated-types/generated/types';
import { SignalContext } from '../../../provider/signal';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const signalContext = React.useContext(SignalContext);
  const { registerSignal } = signalContext;
  const [count, setCount] = React.useState(data.count);
  const signalId = data.signal?.signalId || "";

  const { ok, error } = (() => {
    let ok = "";
    let error = "";
    data.signal?.states?.forEach(element => {
      if (element.key === 'OK') {
        ok = element.value || "";
      }
      if (element.key === 'ERROR') {
        error = element.value || "";
      }

    });
    return {
      ok,
      error
    };
  })();

  const { subscribe } = registerSignal({ signalId });

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      if (subscribe.result?.signalId === signalId) {
        switch (subscribe.result.key) {
          case 'OK':
            setCount(ok);
            break;
          case 'ERROR':
            setCount(error)
            break;
          default:
            break;
        }
      }
    }
  }, [subscribe]);


  return <div><p>{count}</p></div>
}

export {
  FeedFavouriteCount
}