import * as React from 'react';
import {
  FeedImage as FeedImageType,
  FeedItem as FeedItemType,
  FeedCaption as FeedCaptionType,
  FeedFavourite as FeedFavouriteType
} from '@csmets/generated-types/generated/types';
import { FeedImage } from './feed-image';
import { FeedCaption } from './feed-caption';
import styles from '../../../../styles/feed/FeedItem.module.css';
import { FeedFavourite } from './feed-favourite';

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
    if ((item as FeedFavouriteType).__typename == 'FeedFavourite') {
      return <FeedFavourite key={`feedFavourite-${index}`} data={item as FeedFavouriteType} />
    }
  });

  return <div className={styles.container}>{feed}</div>;
}

export {
    FeedItem
}