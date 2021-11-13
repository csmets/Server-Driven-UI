import * as React from 'react';
import { FeedHeadingFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../../../provider/signal';

const FeedHeading = (props: { data: FeedHeadingFragment }): JSX.Element => {
  const { signal, primary } = props.data;
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [headingText, setHeadingText] = React.useState(primary || "");

  useSignalEvent(signal, (result) => {
    setHeadingText(result.value.text);
  })

  return (
    <h1>{headingText}</h1>
  );
}

export {
  FeedHeading
}