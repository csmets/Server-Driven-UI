import * as React from 'react';
import { FeedFavouriteCountFragment } from '@csmets/generated-types/generated/types';

const FeedFavouriteCount = (props: { data: FeedFavouriteCountFragment }): JSX.Element => {
  const { data } = props;

  if (!data) {
    return <></>;
  }

  return <div><p>{data.count}</p></div>
}

export {
  FeedFavouriteCount
}