import * as React from 'react';
import { FeedCaptionFragment } from '@csmets/generated-types/generated/types';

const FeedCaption = (props: { data: FeedCaptionFragment }): JSX.Element => {
  const { data } = props;

  if (!data) {
    return <></>;
  }

  return <p>{data.text}</p>
}

export {
    FeedCaption
}