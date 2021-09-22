import * as React from 'react';
import { ColumnLayoutFragment } from '@csmets/generated-types/generated/types';
import { FeedFavourite } from './feed-favourite';
import { FeedFavouriteCount } from './feed-favourite-count';

const FeedColumnLayout = (props: { data: ColumnLayoutFragment }): JSX.Element => {
  const { data } = props;

  if (!data || !data.columns) {
    return <></>;
  }

  const columns = data.columns?.map((column, index) => {
    switch (column?.__typename) {
      case 'FeedFavourite':
        return <FeedFavourite key={`feedFavourite-${index}`} data={column} />
      case 'FeedFavouriteCount':
        return <FeedFavouriteCount key={`feedFavouriteCount-${index}`} data={column} />
      default:
        return <></>
    }
  })

  return <div>{columns}</div>
}

export {
    FeedColumnLayout
}