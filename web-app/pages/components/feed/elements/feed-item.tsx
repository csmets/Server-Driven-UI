import * as React from 'react';
import { FeedItemFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { FeedImage } from './feed-image';
import { FeedCaption } from './feed-caption';
import styles from '../../../../styles/feed/FeedItem.module.css';
import { FeedColumnLayout } from './feed-column-layout';

const FeedItem = (props: { data: FeedItemFragment }): JSX.Element => {
  const { data } = props;

  const items = data.items;

  const feed = items?.map((item ,index) => {
    switch (item?.__typename) {
      case 'FeedImage':
        return <FeedImage key={`feedImage-${index}`} data={item} />;
      case 'FeedCaption':
        return <FeedCaption key={`feedCaption-${index}`} data={item} />
      case 'ColumnLayout':
        return <FeedColumnLayout key={`feedColumns-${index}`} data={item} />
      default:
        return <></>
    }
  });

  return <div className={styles.container}>{feed}</div>;
}

export {
    FeedItem
}