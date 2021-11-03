import * as React from 'react';
import { useQuery } from "@apollo/client";
import { GetFeedQuery, GetFeedDocument } from '@csmets/typescript-apollo-sdui-types/types';
import { FeedContainer } from './elements/feed-container';

const Feed = (): JSX.Element => {
  const { loading, error, data } = useQuery<GetFeedQuery>(GetFeedDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.feed) {
    return <></>;
  }

  return <FeedContainer data={data.feed} />
}

export {
    Feed
}