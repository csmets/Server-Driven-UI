import * as React from 'react';
import { useQuery } from "@apollo/client";
import { GetFeedQuery, GetFeedDocument } from '@csmets/generated-types/generated/types';
import { FeedItem } from './elements/feed-item';

const Feed = (): JSX.Element => {
  const { loading, error, data } = useQuery<GetFeedQuery>(GetFeedDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.feed) {
    return <></>;
  }

  const feedList = data.feed.map((feed, index) => {
    return <FeedItem key={`feedItem-${index}`} data={feed} />
  });

  return (
    <>{feedList}</>
  )
}

export {
    Feed
}