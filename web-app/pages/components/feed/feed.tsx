import * as React from 'react';
import { useQuery } from "@apollo/client";
import { GetFeedQuery, GetFeedDocument } from '@csmets/typescript-apollo-sdui-types/types';
import { FeedView } from './elements/feed-view';

const Feed = (): JSX.Element => {
  const { loading, error, data } = useQuery<GetFeedQuery>(GetFeedDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.feed) {
    return <></>;
  }

  return <FeedView data={data.feed} />
}

export {
    Feed
}