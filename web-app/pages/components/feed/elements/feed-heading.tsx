import * as React from 'react';
import { FeedHeadingFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';

const FeedHeading = (props: { data: FeedHeadingFragment }): JSX.Element => {
  const { signal, primary } = props.data;
  const signalContext = React.useContext(SignalContext);
  const { registerSignal } = signalContext;

  const { subscribe } = registerSignal(signal)

  const [headingText, setHeadingText] = React.useState(primary || "");

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      setHeadingText(subscribe.result.value.text);
    }
  }, [subscribe]);

  return (
    <h1>{headingText}</h1>
  );
}

export {
  FeedHeading
}