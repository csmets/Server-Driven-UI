import * as React from 'react';
import { FeedColumnLayoutData, FeedFavouriteVM, FeedFavouriteCountVM } from '../models/feed-item-vm';
import { FeedFavourite } from './feed-favourite';
import { FeedFavouriteCount } from './feed-favourite-count';

const FeedColumnLayout = (props: { data: FeedColumnLayoutData }): JSX.Element => {
  const { data } = props;

  if (!data || !data.columns) {
    return <></>;
  }

  const columns = data.columns?.map((column, index) => {
    if (column instanceof FeedFavouriteVM) {
        return <FeedFavourite key={`feedFavourite-${index}`} data={column} />
    }
    if (column instanceof FeedFavouriteCountVM) {
        return <FeedFavouriteCount key={`feedFavouriteCount-${index}`} data={column} />
    }
    return <></>
  })

  return <div>{columns}</div>
}

export {
    FeedColumnLayout
}