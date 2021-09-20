import * as React from 'react';
import { FeedImage as FeedImageType, FeedItem as FeedItemType, FeedCaption as FeedCaptionType } from '@csmets/generated-types/generated/types';
import { FeedImage } from './feed-image';
import { FeedCaption } from './feed-caption';

const FeedItem = (props: { data: FeedItemType }): JSX.Element => {
  const { data } = props;

  const items = data.items;

  const feed = items?.map((item ,index) => {
    if ((item as FeedImageType).__typename == 'FeedImage') {
      return <FeedImage key={`feedImage-${index}`} data={item as FeedImageType} />
    }
    if ((item as FeedCaptionType).__typename == 'FeedCaption') {
      return <FeedCaption key={`feedCaption-${index}`} data={item as FeedCaptionType} />
    }
  });

  return <>{feed}</>;
}

export {
    FeedItem
}