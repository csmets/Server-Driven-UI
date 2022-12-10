import * as React from 'react';
import { Typography } from '@mui/material';
import { FetchFeed, FetchFeedResponse, FeedItem } from './types';
import { FeedCard } from './feed-card';

const useFetchFeed = (): FetchFeed => {
  const [loading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<FetchFeedResponse | undefined>(undefined);

  React.useEffect(() => {
    fetch('http://localhost:9090/traditional-api')
    .then(response => response.json())
    .then(data => {
      const response: FetchFeedResponse = data;
      setData(response);
      setIsLoading(false);
    });
  }, []);

  return {
    loading,
    data
  }
}

export const TraditionalFeedView = () => {
  const { loading, data } = useFetchFeed();

  return (
    <>
    <Typography
      variant='h1'
      display='block'
      color='text.primary'
      >
        Example list of feed items
      </Typography>
    <Typography
      variant='subtitle1'
      display='block'
      color='text.secondary'
      >
        This is a description
      </Typography>

      {loading && <p>Loading...</p>}

      { !loading && data && data.feed.map((feed, index) => <FeedCard key={`feed-card-${index}`} data={feed} />)}
    </>
  )
}