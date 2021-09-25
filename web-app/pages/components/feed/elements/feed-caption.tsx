import * as React from 'react';
import { FeedCaptionFragment } from '@csmets/typescript-apollo-sdui-types/types';

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