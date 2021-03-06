import * as React from 'react';
import { SignalContext } from '../../provider/signal';
import { signalPairKeyValue } from '../../helper/signal-pair-key-value';
import { FeedHeadingData } from '../../models/feed-heading-vm';
import { SignalValuePairKey } from '../../models/signal-vm';

const FeedHeading = (props: { data: FeedHeadingData }): JSX.Element => {
  const { signal, primary } = props.data;
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [headingText, setHeadingText] = React.useState(primary || "");

  const signalCallback = ({ result, cache }: any) => {
    const value = signalPairKeyValue(SignalValuePairKey.Primary, result.values)
    if (value) {
      if (cache) {
        cache?.modify({
          id: cache.identify(props.data),
          fields: {
            primary() {
              return value;
            }
          }
        });
      } else {
        setHeadingText(value);
      }

    }
  };

  useSignalEvent(signal, signalCallback)

  return (
    <h1>{headingText}</h1>
  );
}

export {
  FeedHeading
}
