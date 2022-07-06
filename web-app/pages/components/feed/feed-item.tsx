import * as React from 'react';
import { FeedImage } from './feed-image';
import { FeedCaption } from './feed-caption';
import styles from '../../../styles/feed/FeedItem.module.css';
import { FeedColumnLayout } from './feed-column-layout';
import { FeedCaptionVM, FeedImageVM, FeedItemData, FeedColumnLayoutVM } from '../../models/feed-item-vm';

const FeedItem = (props: { data: FeedItemData }): JSX.Element => {
  const { data } = props;

  const items = data.items;

  const feed = items?.map((item ,index) => {
    if (item instanceof FeedImageVM) {
        return <FeedImage key={`feedImage-${index}`} data={item} />;
    }
    if (item instanceof FeedCaptionVM) {
        return <FeedCaption key={`feedCaption-${index}`} data={item} />
    }
    if (item instanceof FeedColumnLayoutVM) {
        return <FeedColumnLayout key={`feedColumns-${index}`} data={item} />
    }
    return <></>
  });

  return <div className={styles.container}>{feed}</div>;
}

export {
    FeedItem
}
