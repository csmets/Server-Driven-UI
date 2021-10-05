import * as React from 'react';
import { FeedFavouriteCountFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;
  const signalContext = React.useContext(SignalContext);
  const { registerSignal } = signalContext;
  const [count, setCount] = React.useState(data.count);
  const signalId = data.signal?.signalId || "";

  const { saved, unsaved, error } = (() => {
    let saved = "";
    let unsaved = "";
    let error = "";
    data.signal?.states?.forEach(element => {
      if (element.key === 'SAVED') {
        saved = element.value || "";
      }
      if (element.key === 'UNSAVED') {
        unsaved = element.value || "";
      }
      if (element.key === 'ERROR') {
        error = element.value || "";
      }

    });
    return {
      saved,
      unsaved,
      error
    };
  })();

  const { subscribe } = registerSignal({ signalId });

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      if (subscribe.result?.signalId === signalId) {
        switch (subscribe.result.key) {
          case 'SAVED':
            console.log('saved!');
            setCount(saved);
            break;
          case 'UNSAVED':
            console.log('unsaved!');
            setCount(unsaved);
            break;
          case 'ERROR':
            console.log('error!');
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