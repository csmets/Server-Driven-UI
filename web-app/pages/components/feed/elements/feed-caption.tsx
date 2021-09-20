import * as React from 'react';
import { FeedCaption as FeedCaptionType } from '@csmets/generated-types/generated/types';

const FeedCaption = (props: { data: FeedCaptionType }): JSX.Element => {
  const { data } = props;

  if (!data) {
    return <></>;
  }

  return <p>{data.text}</p>
}

export {
    FeedCaption
}