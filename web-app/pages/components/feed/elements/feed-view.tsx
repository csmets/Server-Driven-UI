import * as React from 'react';
import { FeedViewFragment, SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import { FeedItem } from './feed-item';
import { TypographyContent } from '../../typography/typography-content';
import { Signal, SignalContext } from '../../../provider/signal';

const FeedView = (props: { data: FeedViewFragment }): JSX.Element => {
  const { data } = props;
  const { elements, heading } = data;

  const signalContext = React.useContext(SignalContext);
  const { registerSignal } = signalContext;

  const signal = heading?.signal
  const signalRef: Signal = {
    signal: signal?.type || SignalType.Error,
    reference: signal?.reference || ''
  }
  const { subscribe } = registerSignal(signalRef)

  const [headingText, setHeadingText] = React.useState(heading?.text || "");

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      if (subscribe.result?.reference === signal?.reference) {
        setHeadingText(subscribe.result.value.text);
      }
    }
  }, [subscribe]);


  if (!data || !data.elements) {
    return <></>;
  }

  const feedViewList = elements?.map((element, index) => {
    switch (element?.__typename) {
      case 'FeedItem':
        return <FeedItem key={`feedItem-${index}`} data={element} />
      case 'TypographyContent':
        return <TypographyContent key={`feedTypograph-${index}`} data={element} />
      default:
        return <></>
    }
  });

  return (
    <div>
      <h1>{headingText}</h1>
      {feedViewList}
    </div>
  );
}

export {
    FeedView
}