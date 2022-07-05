import * as React from 'react';
import { FeedCaptionData } from '../../models/feed-item-vm';

const FeedCaption = (props: { data: FeedCaptionData }): JSX.Element => {
  const { data } = props;

  if (!data) {
    return <></>;
  }

  return <p>{data.text}</p>
}

export {
    FeedCaption
}